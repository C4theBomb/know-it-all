require('dotenv').config();
const supertest = require('supertest');

var { sequelize, Token } = require('../../models/index');
const app = require('../../app');
const { createTestUser } = require('../utils');

describe('GetOwnedOrgs', function () {
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
            .post('/api/org/create')
            .send({ token: token.tokenID, orgName: 'Org' })
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        ownerID: user.userID,
                        orgName: 'Org',
                    })
                );
            });
    });

    test('[400] Form missing orgName', async () => {
        var user = await createTestUser('Test', 'User', 'password');
        const token = await user.createToken();

        await supertest(app)
            .post('/api/org/create')
            .send({ token: token.tokenID })
            .expect(400, 'Form missing necessary fields')
            .set('Accept', 'text/html')
            .expect('Content-Type', /html/);
    });

    test('[500] Pre-existing organization with that name', async () => {
        var user = await createTestUser('Test', 'User', 'password');
        const token = await user.createToken();
        await user.createOwnedOrg({
            orgName: 'Org',
        });

        await supertest(app)
            .post('/api/org/create')
            .send({ token: token.tokenID, orgName: 'Org' })
            .expect(
                500,
                'This user already has an organization with this name.'
            )
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });

    test('[403] Missing token', async () => {
        await supertest(app)
            .post('/api/org/create')
            .send()
            .expect(403, 'Unauthorized user')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });

    test('[511] Token was not found', async () => {
        await supertest(app)
            .post('/api/org/create')
            .send({
                token: 'randomString',
            })
            .expect(511, 'Session expired')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });
});
