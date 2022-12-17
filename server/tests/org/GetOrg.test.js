const supertest = require('supertest');

const { sequelize } = require('../../db/models/index');
const app = require('../../app');

const { createTestUser, createTestOrg } = require('../utils');
const errors = require('../../config/error.json');

describe('Get Org', function () {
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
            .set('Authorization', `bearer ${token.id}`)
            .send()
            .expect(200)
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
                        owner: true,
                    })
                );
                expect(response.body.org.owner).toEqual(expect.objectContaining(userData));
            });
    });

    test('[404] No organization with that id', async () => {
        const user = await createTestUser('Test', 'User', 'password');
        const token = await user.createToken();

        await supertest(app)
            .get(`/api/org/randomString`)
            .set('Authorization', `bearer ${token.id}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(404, errors.NotFound);
    });

    test('[403] Unknown organization queried', async () => {
        const org = await createTestOrg('Org', {
            firstName: 'New',
            lastName: 'User',
            password: 'password',
        });
        const user = await createTestUser('Test', 'User', 'password');
        const token = await user.createToken();

        await supertest(app)
            .get(`/api/org/${org.id}`)
            .set('Authorization', `bearer ${token.id}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(403, errors.Forbidden);
    });

    test('[400] Request does not include token', async () => {
        await supertest(app)
            .get('/api/org/randomString')
            .send()
            .expect('Content-Type', /json/)
            .expect(400, errors.Incomplete);
    });

    test('[401] Token was not found', async () => {
        await supertest(app)
            .get('/api/org/randomString')
            .set('Authorization', 'bearer randomString')
            .send()
            .expect('Content-Type', /json/)
            .expect(401, errors.Unauthenticated);
    });
});
