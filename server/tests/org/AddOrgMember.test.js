const supertest = require('supertest');

const { sequelize } = require('../../db/models/index');
const app = require('../../app');

const { createTestOrg, createTestUser, createTestToken } = require('../utils');
const errors = require('../../config/error.json');

describe('Add Org Member', () => {
    beforeEach(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: 'true' });
    });

    test('[200] User added to organization', async () => {
        const org = await createTestOrg('Org', {
            firstName: 'New',
            lastName: 'User',
            password: 'password',
        });
        const user = await createTestUser('Test', 'User', 'password');
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
            .post('/api/org/randomString/add')
            .set('Authorization', `bearer ${token.id}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(404, errors.NotFound);
    });

    test('[400] Request does not include token', async () => {
        await supertest(app)
            .post('/api/org/randomString/add')
            .send()
            .expect('Content-Type', /json/)
            .expect(400, errors.Incomplete);
    });

    test('[401] Token was not found', async () => {
        await supertest(app)
            .post('/api/org/randomString/add')
            .set('Authorization', 'bearer randomString')
            .send()
            .expect('Content-Type', /json/)
            .expect(401, errors.Unauthenticated);
    });
});
