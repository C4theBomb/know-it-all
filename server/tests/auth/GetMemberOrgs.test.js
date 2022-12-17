const supertest = require('supertest');

const { sequelize } = require('../../db/models/index');
const app = require('../../app');

const { createTestOrg, createTestUser } = require('../utils');
const errors = require('../../config/error.json');

describe('Get Member Orgs', function () {
    beforeEach(async () => {
        try {
            await sequelize.authenticate();
            await sequelize.sync({ force: 'true' });
        } catch (error) {
            console.log('[ERROR]: Database connection failed');
        }
    });

    test('[200] Retrieved joined orgs', async () => {
        var org = await createTestOrg('Test Org', {
            firstName: 'Test',
            lastName: 'User',
            password: 'password',
        });
        const user = await createTestUser('New', 'User', 'password');
        const token = await user.createToken({ expires: true });
        await user.addMemberOrg(org.id);

        await supertest(app)
            .get('/api/auth/orgs/member')
            .set('Authorization', `bearer ${token.id}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(200)
            .then((response) => {
                const data = {
                    id: org.id,
                    ownerID: org.ownerID,
                    name: org.name,
                };

                expect(response.body.orgs).toEqual(
                    expect.arrayContaining([expect.objectContaining(data)])
                );
            });
    });

    test('[400] Request does not include token', async () => {
        await supertest(app)
            .get('/api/auth/orgs/member')
            .send()
            .expect('Content-Type', /json/)
            .expect(400, errors.errorIncomplete);
    });

    test('[401] Token was not found', async () => {
        await supertest(app)
            .get('/api/auth/orgs/member')
            .set('Authorization', 'bearer randomString')
            .send()
            .expect('Content-Type', /json/)
            .expect(401, errors.errorUnauthed);
    });
});
