require('dotenv').config();
const supertest = require('supertest');

var { sequelize } = require('../../db/models/index');
const app = require('../../app');
const { createTestUser, createTestOrg } = require('../utils');

describe('GetOwnedOrgs', function () {
    beforeEach(async () => {
        try {
            await sequelize.authenticate();
            await sequelize.sync({ force: 'true' });
        } catch (error) {
            console.log('[ERROR]: Database connection failed');
        }
    });

    test('[200] User removed from organization', async () => {
        const user = await createTestUser('Test', 'User', 'password');
        const token = await user.createToken();
        const org = await user.createOwnedOrg({
            orgName: 'Org',
        });

        const newUser = await createTestUser('New', 'User', 'password');
        await org.addOrgMember(newUser.userID);

        await supertest(app)
            .post(`/api/org/${org.orgID}/delete`)
            .send({
                token: token.tokenID,
                doomedUsers: [newUser.userID],
            })
            .expect(200, 'User(s) removed from organization.')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/)
            .then(async () => {
                const data = await org.getOrgMember();

                expect(data).toEqual(
                    expect.not.arrayContaining([
                        expect.objectContaining(user.dataValues),
                    ])
                );
            });
    });

    test('[500] Organization does not exist', async () => {
        const user = await createTestUser('Test', 'User', 'password');
        const token = await user.createToken();
        const org = await user.createOwnedOrg({
            orgName: 'Org',
        });

        const newUser = await createTestUser('New', 'User', 'password');
        await org.addOrgMember(newUser.userID);

        await supertest(app)
            .post(`/api/org/randomString/delete`)
            .send({
                token: token.tokenID,
                doomedUsers: [newUser.userID],
            })
            .expect(500, 'No organization exists with that id.')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });

    test('[403] Insufficient permissions', async () => {
        const org = await createTestOrg('Org', {
            firstName: 'Test',
            lastName: 'User',
            password: 'password',
        });

        const user = await createTestUser('New', 'User', 'password');
        const token = await user.createToken();
        await org.addOrgMember(user.userID);

        await supertest(app)
            .post(`/api/org/${org.orgID}/delete`)
            .send({
                token: token.tokenID,
                doomedUsers: [user.userID],
            })
            .expect(403, 'You do not have permission to do that.')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });

    test('[403] Missing token', async () => {
        const org = await createTestOrg('Org', {
            firstName: 'Test',
            lastName: 'User',
            password: 'password',
        });

        await supertest(app)
            .post(`/api/org/${org.orgID}/delete`)
            .send()
            .expect(403, 'Unauthorized user')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });

    test('[511] Token was not found', async () => {
        const org = await createTestOrg('Org', {
            firstName: 'Test',
            lastName: 'User',
            password: 'password',
        });

        await supertest(app)
            .post(`/api/org/${org.orgID}/delete`)
            .send({
                token: 'randomString',
            })
            .expect(511, 'Session expired')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });
});
