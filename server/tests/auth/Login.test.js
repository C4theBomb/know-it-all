const supertest = require('supertest');

var { sequelize, Token } = require('../../db/models/index');
const app = require('../../app');
const { createTestUser } = require('../utils');

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

        await supertest(app)
            .post('/api/auth/login')
            .send({ email: user.email, password })
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(async (response) => {
                const token = await Token.findByPk(response.body.token);

                expect(response.body.token).toEqual(token.id);
                expect(response.body.userID).toEqual(token.ownerID);
            });
    });

    test('[400] Request missing fields', async () => {
        await supertest(app)
            .post('/api/auth/login')
            .send()
            .expect(400, 'Request lacking information')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });

    test('[400] Invalid password', async () => {
        const password = 'password';
        const user = await createTestUser('Test', 'User', password);

        await supertest(app)
            .post('/api/auth/login')
            .send({ email: user.email, password: 'randomString' })
            .expect(400, 'Unauthorized user')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });
});
