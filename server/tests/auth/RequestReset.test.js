const supertest = require('supertest');
const sinon = require('sinon');
const { CourierClient } = require('@trycourier/courier');

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

    it('[400] Request missing email', async () => {
        await supertest(app)
            .post('/api/auth/reset')
            .send()
            .expect('Content-Type', /json/)
            .expect(400, errors.Incomplete);
    });

    it('[404] No user with email', async () => {
        await createTestUser('Test', 'User', 'password');

        await supertest(app)
            .post('/api/auth/reset')
            .send({ email: 'randomString' })
            .expect('Content-Type', /json/)
            .expect(404, errors.NotFound);
    });
});
