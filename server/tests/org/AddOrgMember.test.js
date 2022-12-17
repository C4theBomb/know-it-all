const supertest = require('supertest');

const { sequelize } = require('../../db/models/index');
const app = require('../../app');

const { createTestOrg, createTestUser, createTestToken } = require('../utils');
const errors = require('../../config/error.json');

describe('Add Org Member', function () {
    beforeEach(async () => {
        try {
            await sequelize.authenticate();
            await sequelize.sync({ force: 'true' });
        } catch (error) {
            console.log('[ERROR]: Database connection failed');
        }
    });

    test('[200] User added to organization', async () => {
        var org = await createTestOrg('Org', {
            firstName: 'New',
            lastName: 'User',
            password: 'password',
        });
        var user = await createTestUser('Test', 'User', 'password');
        const token = await user.createToken();

        await supertest(app)
            .post(`/api/org/${org.id}/add`)
            .set('Authorization', `bearer ${token.id}`)
            .send({ token: token.id })
            .expect('Content-Type', /text/)
            .expect(200, 'OK');
    });

    test('[404] Organization not found', async () => {
        const token = await createTestToken({
            firstName: 'Test',
            lastName: 'User',
            password: 'password',
        });

        await supertest(app)
            .post(`/api/org/randomString/add`)
            .set('Authorization', `bearer ${token.id}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(404, errors.errorNotFound);
    });

    test('[400] Request does not include token', async () => {
        await supertest(app)
            .post('/api/org/randomString/add')
            .send()
            .expect('Content-Type', /json/)
            .expect(400, errors.errorIncomplete);
    });

    test('[401] Token was not found', async () => {
        await supertest(app)
            .post('/api/org/randomString/add')
            .set('Authorization', 'bearer randomString')
            .send()
            .expect('Content-Type', /json/)
            .expect(401, errors.errorUnauthed);
    });
});
