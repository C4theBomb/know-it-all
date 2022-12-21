const supertest = require('supertest');

const { sequelize } = require('../../db/models/index');
const app = require('../../app');

const { createTestUser, createTestOrg } = require('../utils');
const errors = require('../../config/error.json');

describe('Register', () => {
    beforeEach(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: 'true' });
    });

    test('[200] User successfully created', async () => {
        const user = {
            firstName: 'Test',
            lastName: 'User',
            email: 'test.user@test.com',
            pronouns: 'they/them',
        };
        const password = 'password';

        await supertest(app)
            .post('/api/auth/register')
            .send({ ...user, password })
            .expect('Content-Type', /text/)
            .expect(200, 'OK');
    });

    test('[200] Created with organization', async () => {
        const orgOwner = {
            firstName: 'Org',
            lastName: 'Owner',
            password: 'password',
        };
        const org = await createTestOrg('Test Org', orgOwner);

        const user = {
            firstName: 'Test',
            lastName: 'User',
            email: 'test.user@test.com',
            pronouns: 'they/them',
        };
        const password = 'password';

        await supertest(app)
            .post('/api/auth/register')
            .send({ ...user, password, orgID: org.id })
            .expect('Content-Type', /text/)
            .expect(200, 'OK');
    });

    test('[200] Nonexistent orgID does not error', async () => {
        const orgOwner = {
            firstName: 'Org',
            lastName: 'Owner',
            password: 'password',
        };
        await createTestOrg('Test Org', orgOwner);

        const user = {
            firstName: 'Test',
            lastName: 'User',
            email: 'test.user@test.com',
            pronouns: 'they/them',
        };
        const password = 'password';

        await supertest(app)
            .post('/api/auth/register')
            .send({ ...user, password, orgID: 'randomString' })
            .expect('Content-Type', /text/)
            .expect(200, 'OK');
    });

    test('[400] Request missing fields', async () => {
        await supertest(app)
            .post('/api/auth/register')
            .send()
            .expect('Content-Type', /json/)
            .expect(400, errors.Incomplete);
    });

    test('[409] User already exists', async () => {
        await createTestUser('Test', 'User', 'password');
        const userInfo = {
            firstName: 'Test',
            lastName: 'User',
            email: 'test.user@test.com',
            pronouns: 'they/them',
            password: 'password',
        };

        await supertest(app)
            .post('/api/auth/register')
            .send(userInfo)
            .expect('Content-Type', /json/)
            .expect(409, errors.DuplicateName);
    });
});
