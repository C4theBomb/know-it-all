require('dotenv').config();
const supertest = require('supertest');

var { sequelize, Organization } = require('../../models/index');
const app = require('../../app');
const { createTestUser, createTestOrg } = require('../utils');

describe('Create User', function () {
    beforeEach(async () => {
        try {
            await sequelize.authenticate();
            await sequelize.sync({ force: 'true' });
        } catch (error) {
            console.log('[ERROR]: Database connection failed');
        }
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
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body).toEqual(expect.objectContaining(user));
            });
    });

    test('[500] Request missing fields', async () => {
        await supertest(app)
            .post('/api/auth/register')
            .send()
            .expect(400, 'The request is missing required fields.')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });

    test('[500] User already exists', async () => {
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
            .expect(500, 'A user with that email already exists.')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
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
            .post(`/api/auth/register`)
            .send({ ...user, password, orgID: org.orgID })
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(async (response) => {
                const org = await Organization.findByPk(response.body.orgID, {
                    include: {
                        association: 'orgMember',
                    },
                });

                expect(response.body.user).toEqual(
                    expect.objectContaining(user)
                );
                expect(org.orgMember).toEqual(
                    expect.arrayContaining([expect.objectContaining(user)])
                );
            });
    });

    test('[200] Attemped to create with organization', async () => {
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
            .post(`/api/auth/register`)
            .send({ ...user, password, orgID: 'randomString' })
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then(async (response) => {
                expect(response.body).toEqual(expect.objectContaining(user));
            });
    });
});
