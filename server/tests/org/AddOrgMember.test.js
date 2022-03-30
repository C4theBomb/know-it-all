require('dotenv').config();
const supertest = require('supertest');

var { sequelize } = require('../../db/models/index');
const app = require('../../app');
const { createTestOrg, createTestUser, createTestToken } = require('../utils');

describe('AddOrgMember', function () {
    beforeEach(async () => {
        try {
            await sequelize.authenticate();
            await sequelize.sync({ force: 'true' });
        } catch (error) {
            console.log('[ERROR]: Database connection failed');
        }
    });

    test('[200] User added to organization', async () => {
        var org = await createTestOrg('Org', {
            firstName: 'New',
            lastName: 'User',
            password: 'password',
        });
        var user = await createTestUser('Test', 'User', 'password');
        const token = await user.createToken();

        await supertest(app)
            .post(`/api/org/${org.orgID}/add`)
            .send({ token: token.tokenID })
            .expect(200, 'User added to organization.')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/)
            .then(async () => {
                const members = await org.getOrgMember();

                expect(members).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining(user.dataValues),
                    ])
                );
            });
    });

    test('[404] Organization not found', async () => {
        const token = await createTestToken({
            firstName: 'Test',
            lastName: 'User',
            password: 'password',
        });

        await supertest(app)
            .post(`/api/org/randomString/add`)
            .send({ token: token.tokenID })
            .expect(404, 'No organization exists with that id.')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });

    test('[403] Missing token', async () => {
        await supertest(app)
            .post('/api/auth/logout')
            .send()
            .expect(403, 'Unauthorized user')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });

    test('[511] Token was not found', async () => {
        await supertest(app)
            .post('/api/auth/logout')
            .send({ token: 'randomString' })
            .expect(511, 'Session expired')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });
});
