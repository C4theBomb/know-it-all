require('dotenv').config();
const supertest = require('supertest');

var { sequelize } = require('../../models/index');
const app = require('../../app');
const { createTestResetRequest } = require('../utils');

describe('Logout', function () {
    beforeEach(async () => {
        try {
            await sequelize.authenticate();
            await sequelize.sync({ force: 'true' });
        } catch (error) {
            console.log('[ERROR]: Database connection failed');
        }
    });

    test('[200] Successful reset password', async () => {
        const resetRequest = await createTestResetRequest({
            firstName: 'Test',
            lastName: 'User',
            password: 'password',
        });

        await supertest(app)
            .patch(`/api/auth/reset-password/${resetRequest.reqID}`)
            .send({
                password: 'newPassword',
            })
            .expect(200, 'Your password has been changed')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });

    test('[400] Missing password', async () => {
        const resetRequest = await createTestResetRequest({
            firstName: 'Test',
            lastName: 'User',
            password: 'password',
        });

        await supertest(app)
            .patch(`/api/auth/reset-password/${resetRequest.reqID}`)
            .send()
            .expect(400, 'Form missing required information.')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });

    test('[500] Reset request does not exist', async () => {
        await supertest(app)
            .patch(`/api/auth/reset-password/randomString`)
            .send({
                password: 'newPassword',
            })
            .expect(500, 'A reset request with this ID does not exist')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });
});
