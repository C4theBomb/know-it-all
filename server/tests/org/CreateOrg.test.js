const supertest = require('supertest');

var { sequelize } = require('../../db/models/index');
const app = require('../../app');

const { createTestUser } = require('../utils');
const errors = require('../../config/error.json');

describe('Create Org', function () {
    beforeEach(async () => {
        try {
            await sequelize.authenticate();
            await sequelize.sync({ force: 'true' });
        } catch (error) {
            console.log('[ERROR]: Database connection failed');
        }
    });

    test('[200] Organization created', async () => {
        var user = await createTestUser('Test', 'User', 'password');
        const token = await user.createToken();

        await supertest(app)
            .post('/api/org')
            .set('Authorization', `bearer ${token.id}`)
            .send({ orgName: 'Org' })
            .expect('Content-Type', /text/)
            .expect(200, 'OK');
    });

    test('[400] Form missing orgName', async () => {
        var user = await createTestUser('Test', 'User', 'password');
        const token = await user.createToken();

        await supertest(app)
            .post('/api/org')
            .set('Authorization', `bearer ${token.id}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(400, errors.errorIncomplete);
    });

    test('[409] Pre-existing organization with that name', async () => {
        var user = await createTestUser('Test', 'User', 'password');
        const token = await user.createToken();
        await user.createOwnedOrg({
            name: 'Org',
        });

        await supertest(app)
            .post('/api/org')
            .set('Authorization', `bearer ${token.id}`)
            .send({ orgName: 'Org' })
            .expect('Content-Type', /json/)
            .expect(409, errors.errorDuplicateName);
    });

    test('[400] Request does not include token', async () => {
        await supertest(app)
            .post('/api/org')
            .send()
            .expect('Content-Type', /json/)
            .expect(400, errors.errorIncomplete);
    });

    test('[401] Token was not found', async () => {
        await supertest(app)
            .post('/api/org')
            .set('Authorization', 'bearer randomString')
            .send()
            .expect('Content-Type', /json/)
            .expect(401, errors.errorUnauthed);
    });
});
