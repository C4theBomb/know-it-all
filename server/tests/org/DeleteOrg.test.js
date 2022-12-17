const supertest = require('supertest');

const { sequelize, Organization } = require('../../db/models/index');
const app = require('../../app');

const { createTestUser, createTestOrg } = require('../utils');
const errors = require('../../config/error.json');

describe('Delete Org', function () {
    beforeEach(async () => {
        try {
            await sequelize.authenticate();
            await sequelize.sync({ force: 'true' });
        } catch (error) {
            console.log('[ERROR]: Database connection failed');
        }
    });

    test('[200] Organization deleted', async () => {
        const user = await createTestUser('Test', 'User', 'password');
        const org = await user.createOwnedOrg({
            name: 'Org',
        });
        const token = await user.createToken();

        await supertest(app)
            .delete(`/api/org/${org.id}`)
            .set('Authorization', `bearer ${token.id}`)
            .send()
            .expect('Content-Type', /text/)
            .expect(200, 'OK')
            .then(async () => {
                const data = await Organization.findByPk(org.id);
                expect(data).toBeNull();
            });
    });

    test('[200] No organization deleted with that ID', async () => {
        const user = await createTestUser('Test', 'User', 'password');
        const org = await user.createOwnedOrg({
            name: 'Org',
        });
        const token = await user.createToken();

        await supertest(app)
            .delete(`/api/org/randomString`)
            .set('Authorization', `bearer ${token.id}`)
            .send()
            .expect('Content-Type', /text/)
            .expect(200, 'OK')
            .then(async () => {
                const data = await Organization.findByPk(org.id);
                expect(data.dataValues).toEqual(org.dataValues);
            });
    });

    test('[200] Organization not owned by that user', async () => {
        const user = await createTestUser('Test', 'User', 'password');
        const newUser = await createTestUser('New', 'User', 'password');
        const org = await user.createOwnedOrg({
            name: 'Org',
        });
        const token = await newUser.createToken();

        await supertest(app)
            .delete(`/api/org/${org.id}`)
            .set('Authorization', `bearer ${token.id}`)
            .send()
            .expect('Content-Type', /text/)
            .expect(200, 'OK')
            .then(async () => {
                const data = await Organization.findByPk(org.id);
                expect(data).not.toBeNull();
            });
    });

    test('[400] Request does not include token', async () => {
        await supertest(app)
            .delete('/api/org/randomString')
            .send()
            .expect('Content-Type', /json/)
            .expect(400, errors.errorIncomplete);
    });

    test('[401] Token was not found', async () => {
        await supertest(app)
            .delete('/api/org/randomString')
            .set('Authorization', 'bearer randomString')
            .send()
            .expect('Content-Type', /json/)
            .expect(401, errors.errorUnauthed);
    });
});
