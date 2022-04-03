const supertest = require('supertest');

var { sequelize, Organization } = require('../../db/models/index');
const app = require('../../app');
const { createTestUser, createTestOrg } = require('../utils');

describe('GetOrg', function () {
    beforeEach(async () => {
        try {
            await sequelize.authenticate();
            await sequelize.sync({ force: 'true' });
        } catch (error) {
            console.log('[ERROR]: Database connection failed');
        }
    });

    test('[200] Organization retrieved', async () => {
        const user = await createTestUser('Test', 'User', 'password');
        const org = await user.createOwnedOrg({
            name: 'Org',
        });
        const token = await user.createToken();

        await supertest(app)
            .get(`/api/org/${org.id}`)
            .query({ token: token.id })
            .send()
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then((response) => {
                const orgData = {
                    name: org.name,
                    id: org.id,
                    ownerID: org.ownerID,
                };

                const userData = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                };

                expect(response.body).toEqual(
                    expect.objectContaining({
                        org: expect.objectContaining(orgData),
                        status: true,
                    })
                );
                expect(response.body.org.owner).toEqual(
                    expect.objectContaining(userData)
                );
            });
    });

    test('[500] No organization with that id', async () => {
        const user = await createTestUser('Test', 'User', 'password');
        const token = await user.createToken();

        await supertest(app)
            .get(`/api/org/randomString`)
            .query({ token: token.id })
            .send()
            .expect(500, 'There is no organization with this id.')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });

    test('[500] Unknown organization queried', async () => {
        const org = await createTestOrg('Org', {
            firstName: 'New',
            lastName: 'User',
            password: 'password',
        });
        const user = await createTestUser('Test', 'User', 'password');
        const token = await user.createToken();

        await supertest(app)
            .get(`/api/org/${org.id}`)
            .query({ token: token.id })
            .send()
            .expect(403, 'You do not know any organizations with this id.')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });

    test('[403] Missing token', async () => {
        const user = await createTestUser('Test', 'User', 'password');
        const org = await user.createOwnedOrg({
            name: 'Org',
        });

        await supertest(app)
            .get(`/api/org/${org.id}`)
            .send()
            .expect(403, 'Unauthorized user')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });

    test('[511] Token was not found', async () => {
        const user = await createTestUser('Test', 'User', 'password');
        const org = await user.createOwnedOrg({
            name: 'Org',
        });

        await supertest(app)
            .get(`/api/org/${org.id}`)
            .query({
                token: 'randomString',
            })
            .send()
            .expect(511, 'Session expired')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });
});
