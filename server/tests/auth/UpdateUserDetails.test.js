const supertest = require('supertest');

var { sequelize } = require('../../db/models/index');
const app = require('../../app');
const { createTestToken, createTestUser } = require('../utils');

describe('UpdateUserDetails', function () {
    beforeEach(async () => {
        try {
            await sequelize.authenticate();
            await sequelize.sync({ force: 'true' });
        } catch (error) {
            console.log('[ERROR]: Database connection failed');
        }
    });

    test('[200] Successfully changed user details', async () => {
        const token = await createTestToken({
            firstName: 'Test',
            lastName: 'User',
            password: 'password',
        });

        await supertest(app)
            .patch('/api/auth/update')
            .send({
                firstName: 'New',
                lastName: 'User',
                email: 'new.user@test.com',
                token: token.tokenID,
            })
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(async (response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        firstName: 'New',
                        lastName: 'User',
                        email: 'new.user@test.com',
                    })
                );
            });
    });

    test('[500] Pre-existing user with email', async () => {
        const token = await createTestToken({
            firstName: 'Test',
            lastName: 'User',
            password: 'password',
        });
        await createTestUser('New', 'User', 'password');
        await supertest(app)
            .patch('/api/auth/update')
            .send({
                email: 'new.user@test.com',
                token: token.tokenID,
            })
            .expect(500, 'A user with that email already exists.')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });

    test('[403] Missing token', async () => {
        await supertest(app)
            .patch('/api/auth/update')
            .send()
            .expect(403, 'Unauthorized user')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });

    test('[511] Token was not found', async () => {
        await supertest(app)
            .patch('/api/auth/update')
            .send({ token: 'randomString' })
            .expect(511, 'Session expired')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });
});
