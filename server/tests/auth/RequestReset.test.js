const supertest = require('supertest');

const { sequelize } = require('../../db/models/index');
const app = require('../../app');

const { createTestUser } = require('../utils');
const errors = require('../../config/error.json');

describe('Request Reset', function () {
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
            .post('/api/auth/reset')
            .send({ email: user.email })
            .expect('Content-Type', /text/)
            .expect(200, 'OK');
    });

    test('[400] Request missing email', async () => {
        await supertest(app)
            .post('/api/auth/reset')
            .send()
            .expect('Content-Type', /json/)
            .expect(400, errors.Incomplete);
    });

    test('[404] No user with email', async () => {
        await createTestUser('Test', 'User', 'password');

        await supertest(app)
            .post('/api/auth/reset')
            .send({ email: 'randomString' })
            .expect('Content-Type', /json/)
            .expect(404, errors.NotFound);
    });
});
