const supertest = require('supertest');

const { sequelize, Token } = require('../../db/models/index');
const app = require('../../app');

const { createTestUser } = require('../utils');
const errors = require('../../config/error.json');

describe('Login', function () {
    beforeEach(async () => {
        try {
            await sequelize.authenticate();
            await sequelize.sync({ force: 'true' });
        } catch (error) {
            console.log('[ERROR]: Database connection failed');
        }
    });

    test('[200] Successful login', async () => {
        const password = 'password';
        const user = await createTestUser('Test', 'User', password);
        const encoded = Buffer.from(`${user.email}:${password}`).toString('base64');

        await supertest(app)
            .post('/api/auth/login')
            .set('Authorization', `basic ${encoded}`)
            .send()
            .expect(200)
            .expect('Content-Type', /json/)
            .then(async (response) => {
                const token = await Token.findByPk(response.body.token);

                expect(response.body.token).toEqual(token.id);
                expect(response.body.user.id).toEqual(token.ownerID);
            });
    });

    test('[400] Request missing fields', async () => {
        await supertest(app)
            .post('/api/auth/login')
            .send()
            .expect('Content-Type', /json/)
            .expect(400, errors.errorIncomplete);
    });

    test('[403] Invalid password', async () => {
        const password = 'password';
        const user = await createTestUser('Test', 'User', password);
        const encoded = Buffer.from(`${user.email}:randomString`).toString('base64');

        await supertest(app)
            .post('/api/auth/login')
            .set('Authorization', `basic ${encoded}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(403, errors.errorForbidden);
    });
});
