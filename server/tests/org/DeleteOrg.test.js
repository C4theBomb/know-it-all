const supertest = require('supertest');

var { sequelize, Organization } = require('../../db/models/index');
const app = require('../../app');
const { createTestUser, createTestOrg } = require('../utils');

describe('DeleteOrg', function () {
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
            .delete('/api/org/delete')
            .query({
                token: token.id,
                orgID: org.id,
            })
            .send()
            .expect(200, 'Organization deleted')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/)
            .then(async () => {
                const data = await Organization.findByPk(org.id);
                expect(data).toEqual(null);
            });
    });

    test('[200] No organization deleted with that ID', async () => {
        const user = await createTestUser('Test', 'User', 'password');
        const org = await user.createOwnedOrg({
            name: 'Org',
        });
        const token = await user.createToken();

        await supertest(app)
            .delete('/api/org/delete')
            .query({
                token: token.id,
                orgID: 'randomString',
            })
            .send()
            .expect(200, 'Organization deleted')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/)
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
            .delete('/api/org/delete')
            .query({
                token: token.id,
                orgID: 'randomString',
            })
            .send()
            .expect(200, 'Organization deleted')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/)
            .then(async () => {
                const data = await Organization.findByPk(org.id);
                expect(data.dataValues).toEqual(org.dataValues);
            });
    });

    test('[400] No orgID provided', async () => {
        const user = await createTestUser('Test', 'User', 'password');
        const newUser = await createTestUser('New', 'User', 'password');
        const token = await newUser.createToken();

        await supertest(app)
            .delete('/api/org/delete')
            .query({
                token: token.id,
            })
            .send()
            .expect(400, 'Form missing required fields')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });

    test('[403] Missing token', async () => {
        await supertest(app)
            .delete('/api/org/delete')
            .send()
            .expect(403, 'Unauthorized user')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });

    test('[511] Token was not found', async () => {
        await supertest(app)
            .delete('/api/org/delete')
            .query({
                token: 'randomString',
            })
            .send()
            .expect(511, 'Session expired')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });
});
