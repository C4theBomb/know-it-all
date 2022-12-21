const supertest = require('supertest');

const { sequelize } = require('../../db/models/index');
const app = require('../../app');

const { createTestToken } = require('../utils');
const errors = require('../../config/error.json');

describe('Logout', () => {
    beforeEach(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: 'true' });
    });

    test('[200] Successful logout', async () => {
        const token = await createTestToken({
            firstName: 'Test',
            lastName: 'User',
            password: 'password',
        });

        await supertest(app)
            .post('/api/auth/logout')
            .set('Authorization', `bearer ${token.id}`)
            .send()
            .expect('Content-Type', /text/)
            .expect(200, 'OK');
    });

    test('[400] Request does not include token', async () => {
        await supertest(app)
            .post('/api/auth/logout')
            .send()
            .expect('Content-Type', /json/)
            .expect(400, errors.Incomplete);
    });

    test('[401] Token was not found', async () => {
        await supertest(app)
            .post('/api/auth/logout')
            .set('Authorization', 'bearer randomString')
            .send()
            .expect('Content-Type', /json/)
            .expect(401, errors.Unauthenticated);
    });
});
