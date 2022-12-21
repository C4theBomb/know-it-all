const supertest = require('supertest');

const { sequelize, Organization } = require('../../db/models/index');
const app = require('../../app');

const { createTestUser } = require('../utils');
const errors = require('../../config/error.json');

describe('Delete Org', () => {
    beforeEach(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: 'true' });
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
            .delete('/api/org/randomString')
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
            .expect(400, errors.Incomplete);
    });

    test('[401] Token was not found', async () => {
        await supertest(app)
            .delete('/api/org/randomString')
            .set('Authorization', 'bearer randomString')
            .send()
            .expect('Content-Type', /json/)
            .expect(401, errors.Unauthenticated);
    });
});
