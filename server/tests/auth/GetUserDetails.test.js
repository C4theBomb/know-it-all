const supertest = require('supertest');

const { sequelize } = require('../../db/models/index');
const app = require('../../app');

const { createTestToken, createTestUser } = require('../utils');
const errors = require('../../config/error.json');

describe('Get User Details', function () {
    beforeEach(async () => {
        try {
            await sequelize.authenticate();
            await sequelize.sync({ force: 'true' });
        } catch (error) {
            console.log('[ERROR]: Database connection failed');
        }
    });

    test('[200] Successfully recieved user details', async () => {
        const token = await createTestToken({
            firstName: 'Test',
            lastName: 'User',
            password: 'password',
        });

        await supertest(app)
            .get(`/api/auth/${token.ownerID}`)
            .set('Authorization', `bearer ${token.id}`)
            .send()
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body.user).toEqual(
                    expect.objectContaining({
                        firstName: 'Test',
                        lastName: 'User',
                        email: 'test.user@test.com',
                    })
                );
            });
    });

    test('[404] User ID does not exist', async () => {
        const token = await createTestToken({
            firstName: 'Test',
            lastName: 'User',
            password: 'password',
        });

        await supertest(app)
            .get(`/api/auth/randomString`)
            .set('Authorization', `bearer ${token.id}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(404, errors.errorNotFound);
    });

    test('[403] No contact with that user', async () => {
        const token = await createTestToken({
            firstName: 'Test',
            lastName: 'User',
            password: 'password',
        });
        const user = await createTestUser('New', 'User', 'password');

        await supertest(app)
            .get(`/api/auth/${user.id}`)
            .set('Authorization', `bearer ${token.id}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(403, errors.errorForbidden);
    });

    test('[400] Request does not include token', async () => {
        await supertest(app)
            .get(`/api/auth/randomString`)
            .send()
            .expect('Content-Type', /json/)
            .expect(400, errors.errorIncomplete);
    });

    test('[401] Token was not found', async () => {
        await supertest(app)
            .get('/api/auth/randomString')
            .set('Authorization', 'bearer randomString')
            .send()
            .expect('Content-Type', /json/)
            .expect(401, errors.errorUnauthed);
    });
});
