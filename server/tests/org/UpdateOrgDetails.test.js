const supertest = require('supertest');

var { sequelize, Organization } = require('../../db/models/index');
const app = require('../../app');
const { createTestUser, createTestOrg, createTestToken } = require('../utils');

describe('GetOwnedOrgs', function () {
    beforeEach(async () => {
        try {
            await sequelize.authenticate();
            await sequelize.sync({ force: 'true' });
        } catch (error) {
            console.log('[ERROR]: Database connection failed');
        }
    });

    test('[200] Successfully changed org name', async () => {
        const user = await createTestUser('Test', 'User', 'password');
        const token = await user.createToken();
        const org = await user.createOwnedOrg({
            orgName: 'Org',
        });

        await supertest(app)
            .patch('/api/org/update')
            .send({
                token: token.tokenID,
                orgID: org.orgID,
                orgName: 'New Name',
            })
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then((response) => {
                const data = {
                    orgName: 'New Name',
                    orgID: org.orgID,
                    ownerID: org.ownerID,
                };

                expect(response.body).toEqual(expect.objectContaining(data));
            });
    });

    test('[400] Form missing information', async () => {
        const user = await createTestUser('Test', 'User', 'password');
        const token = await user.createToken();
        const org = await user.createOwnedOrg({
            orgName: 'Org',
        });

        await supertest(app)
            .patch('/api/org/update')
            .send({
                token: token.tokenID,
            })
            .expect(400, 'Form missing required information.')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });

    test('[500] No organization exists with that id', async () => {
        const user = await createTestUser('Test', 'User', 'password');
        const token = await user.createToken();
        const org = await user.createOwnedOrg({
            orgName: 'Org',
        });

        await supertest(app)
            .patch('/api/org/update')
            .send({
                token: token.tokenID,
                orgID: 'randomString',
                orgName: 'New Name',
            })
            .expect(500, 'You do not own an organization with that id.')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });

    test('[403] Missing token', async () => {
        await supertest(app)
            .patch('/api/org/update')
            .send()
            .expect(403, 'Unauthorized user')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });

    test('[511] Token was not found', async () => {
        await supertest(app)
            .patch('/api/org/update')
            .send({
                token: 'randomString',
            })
            .expect(511, 'Session expired')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });
});
