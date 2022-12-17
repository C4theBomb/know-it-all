const supertest = require('supertest');

const { sequelize } = require('../../db/models/index');
const app = require('../../app');

const { createTestUser } = require('../utils');
const errors = require('../../config/error.json');

describe('Get Owned Orgs', function () {
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
            .get('/api/auth/orgs')
            .set('Authorization', `bearer ${token.id}`)
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

                expect(response.body.orgs).toEqual(
                    expect.arrayContaining([expect.objectContaining(data)])
                );
            });
    });

    test('[400] Request does not include token', async () => {
        await supertest(app)
            .get('/api/auth/orgs')
            .send()
            .expect('Content-Type', /json/)
            .expect(400, errors.Incomplete);
    });

    test('[401] Token was not found', async () => {
        await supertest(app)
            .get('/api/auth/orgs')
            .set('Authorization', 'bearer randomString')
            .send()
            .expect('Content-Type', /json/)
            .expect(401, errors.Unauthenticated);
    });
});
