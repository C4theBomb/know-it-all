const supertest = require('supertest');

var { sequelize, Token } = require('../../db/models/index');
const app = require('../../app');
const { createTestUser } = require('../utils');

describe('GetOwnedOrgs', function () {
    beforeEach(async () => {
        try {
            await sequelize.authenticate();
            await sequelize.sync({ force: 'true' });
        } catch (error) {
            console.log('[ERROR]: Database connection failed');
        }
    });

    test('[200] Retrieved owned orgs', async () => {
        const user = await createTestUser('Test', 'User', 'password');
        const token = await user.createToken({ expires: true });
        const org = await user.createOwnedOrg({ name: 'Org' });

        await supertest(app)
            .get('/api/auth')
            .query({ token: token.id })
            .send()
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then((response) => {
                const data = {
                    id: org.id,
                    ownerID: org.ownerID,
                    name: org.name,
                };

                expect(response.body).toEqual(
                    expect.arrayContaining([expect.objectContaining(data)])
                );
            });
    });

    test('[403] Missing token', async () => {
        await supertest(app)
            .get('/api/auth')
            .send()
            .expect(403, 'Unauthorized user')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });

    test('[511] Token was not found', async () => {
        await supertest(app)
            .get('/api/auth')
            .query({ token: 'randomString' })
            .send()
            .expect(511, 'Session expired')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });
});
