const supertest = require('supertest');

const { sequelize } = require('../../db/models/index');
const app = require('../../app');

const { createTestToken, createTestUser } = require('../utils');
const errors = require('../../config/error.json');

describe('Update User Details', () => {
    beforeEach(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: 'true' });
    });

    test('[200] Successfully changed user details', async () => {
        const token = await createTestToken({
            firstName: 'Test',
            lastName: 'User',
            password: 'password',
        });

        await supertest(app)
            .patch('/api/auth/update')
            .set('Authorization', `bearer ${token.id}`)
            .send({
                firstName: 'New',
                lastName: 'User',
                email: 'new.user@test.com',
            })
            .expect('Content-Type', /text/)
            .expect(200, 'OK');
    });

    test('[409] Pre-existing user with email', async () => {
        const token = await createTestToken({
            firstName: 'Test',
            lastName: 'User',
            password: 'password',
        });
        await createTestUser('New', 'User', 'password');

        await supertest(app)
            .patch('/api/auth/update')
            .set('Authorization', `bearer ${token.id}`)
            .send({
                email: 'new.user@test.com',
            })
            .expect('Content-Type', /json/)
            .expect(409, errors.DuplicateName);
    });

    test('[400] Request does not include token', async () => {
        await supertest(app)
            .patch('/api/auth/update')
            .send()
            .expect('Content-Type', /json/)
            .expect(400, errors.Incomplete);
    });

    test('[401] Token was not found', async () => {
        await supertest(app)
            .patch('/api/auth/update')
            .set('Authorization', 'bearer randomString')
            .send()
            .expect('Content-Type', /json/)
            .expect(401, errors.Unauthenticated);
    });
});
