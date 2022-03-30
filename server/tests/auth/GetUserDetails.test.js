require('dotenv').config();
const supertest = require('supertest');

var { sequelize, Token } = require('../../db/models/index');
const app = require('../../app');
const { createTestToken, createTestUser } = require('../utils');

describe('GetUserDetails', function () {
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
            .get(`/api/auth/${token.userID}`)
            .query({
                token: token.tokenID,
            })
            .send()
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        firstName: 'Test',
                        lastName: 'User',
                        email: 'test.user@test.com',
                    })
                );
            });
    });

    test('[500] User ID does not exist', async () => {
        const token = await createTestToken({
            firstName: 'Test',
            lastName: 'User',
            password: 'password',
        });

        await supertest(app)
            .get(`/api/auth/randomString`)
            .query({ token: token.tokenID })
            .send()
            .expect(500, 'No user with that ID exists.')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });

    test('[403] No contact with that user', async () => {
        const token = await createTestToken({
            firstName: 'Test',
            lastName: 'User',
            password: 'password',
        });
        const user = await createTestUser('New', 'User', 'password');

        await supertest(app)
            .get(`/api/auth/${user.userID}`)
            .query({ token: token.tokenID })
            .send()
            .expect(403, 'You do not have contact with this user.')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });

    test('[403] Missing token', async () => {
        const token = await createTestToken({
            firstName: 'Test',
            lastName: 'User',
            password: 'password',
        });

        await supertest(app)
            .get(`/api/auth/${token.userID}`)
            .query()
            .send()
            .expect(403, 'Unauthorized user')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });

    test('[511] Token was not found', async () => {
        const token = await createTestToken({
            firstName: 'Test',
            lastName: 'User',
            password: 'password',
        });

        await supertest(app)
            .get(`/api/auth/${token.userID}`)
            .query({ token: 'randomString' })
            .send()
            .expect(511, 'Session expired')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });
});
