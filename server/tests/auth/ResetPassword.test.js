const supertest = require('supertest');

const { sequelize } = require('../../db/models/index');
const app = require('../../app');

const { createTestResetRequest } = require('../utils');
const errors = require('../../config/error.json');

describe('Reset Password', () => {
    beforeEach(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: 'true' });
    });

    test('[200] Successful reset password', async () => {
        const resetRequest = await createTestResetRequest({
            firstName: 'Test',
            lastName: 'User',
            password: 'password',
        });

        await supertest(app)
            .patch(`/api/auth/reset/${resetRequest.id}`)
            .send({
                password: 'newPassword',
            })
            .expect('Content-Type', /text/)
            .expect(200, 'OK');
    });

    test('[400] Missing password', async () => {
        const resetRequest = await createTestResetRequest({
            firstName: 'Test',
            lastName: 'User',
            password: 'password',
        });

        await supertest(app)
            .patch(`/api/auth/reset/${resetRequest.reqID}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(400, errors.Incomplete);
    });

    test('[500] Reset request does not exist', async () => {
        await supertest(app)
            .patch('/api/auth/reset/randomString')
            .send({
                password: 'newPassword',
            })
            .expect('Content-Type', /json/)
            .expect(500, errors.Generic);
    });
});
