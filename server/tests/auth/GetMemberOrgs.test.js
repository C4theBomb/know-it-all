require('dotenv').config();
const supertest = require('supertest');

var { sequelize } = require('../../db/models/index');
const app = require('../../app');
const { createTestOrg, createTestUser } = require('../utils');

describe('GetOwnedOrgs', function () {
    beforeEach(async () => {
        try {
            await sequelize.authenticate();
            await sequelize.sync({ force: 'true' });
        } catch (error) {
            console.log('[ERROR]: Database connection failed');
        }
    });

    test('[200] Retrieved joined orgs', async () => {
        var org = await createTestOrg('Test Org', {
            firstName: 'Test',
            lastName: 'User',
            password: 'password',
        });
        const user = await createTestUser('New', 'User', 'password');
        const token = await user.createToken({ expires: true });
        await user.addMemberOrg(org.orgID);

        await supertest(app)
            .get('/api/auth/orgs')
            .query({ token: token.tokenID })
            .send()
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then((response) => {
                const data = {
                    orgID: org.orgID,
                    ownerID: org.ownerID,
                    orgName: org.orgName,
                };

                expect(response.body).toEqual(
                    expect.arrayContaining([expect.objectContaining(data)])
                );
            });
    });

    test('[403] Missing token', async () => {
        await supertest(app)
            .get('/api/auth/orgs')
            .send()
            .expect(403, 'Unauthorized user')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });

    test('[511] Token was not found', async () => {
        await supertest(app)
            .get('/api/auth/orgs')
            .query({ token: 'randomString' })
            .send()
            .expect(511, 'Session expired')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });
});
