require('dotenv').config();
const supertest = require('supertest');

var { sequelize } = require('../../db/models/index');
const app = require('../../app');
const { createTestUser } = require('../utils');

describe('Logout', function () {
    beforeEach(async () => {
        try {
            await sequelize.authenticate();
            await sequelize.sync({ force: 'true' });
        } catch (error) {
            console.log('[ERROR]: Database connection failed');
        }
    });

    test('[200] Successful reset request', async () => {
        const user = await createTestUser('Test', 'User', 'password');

        await supertest(app)
            .get('/api/auth/reset-password')
            .query({ email: user.email })
            .send()
            .expect(
                200,
                'Password reset request sent. If a user exists with this email, an email will be sent with the required information.'
            )
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });

    test('[400] Request missing email', async () => {
        await supertest(app)
            .get('/api/auth/reset-password')
            .send()
            .expect(400, 'Request missing required fields')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });

    test('[500] No user with email', async () => {
        await createTestUser('Test', 'User', 'password');

        await supertest(app)
            .get('/api/auth/reset-password')
            .query({ email: 'randomString' })
            .send()
            .expect(500, 'Whoops something went wrong')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });
});
