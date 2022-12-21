const supertest = require('supertest');

const { sequelize } = require('../../db/models/index');
const app = require('../../app');

const { createTestUser } = require('../utils');
const errors = require('../../config/error.json');

describe('Update Org Details', () => {
    beforeEach(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: 'true' });
    });

    test('[200] Successfully changed org name', async () => {
        const user = await createTestUser('Test', 'User', 'password');
        const token = await user.createToken();
        const org = await user.createOwnedOrg({
            name: 'Org',
        });

        await supertest(app)
            .patch(`/api/org/${org.id}`)
            .set('Authorization', `bearer ${token.id}`)
            .send({
                name: 'New Name',
            })
            .expect('Content-Type', /text/)
            .expect(200, 'OK');
    });

    test('[400] Form missing information', async () => {
        const user = await createTestUser('Test', 'User', 'password');
        const token = await user.createToken();

        await supertest(app)
            .patch('/api/org/update')
            .set('Authorization', `bearer ${token.id}`)
            .send()
            .expect('Content-Type', /json/)
            .expect(400, errors.Incomplete);
    });

    test('[404] No organization exists with that id', async () => {
        const user = await createTestUser('Test', 'User', 'password');
        const token = await user.createToken();

        await supertest(app)
            .patch('/api/org/randomString')
            .set('Authorization', `bearer ${token.id}`)
            .send({
                name: 'New Name',
            })
            .expect('Content-Type', /json/)
            .expect(404, errors.NotFound);
    });

    test('[409] Pre-existing organization with that name', async () => {
        const user = await createTestUser('Test', 'User', 'password');
        const token = await user.createToken();
        await user.createOwnedOrg({ name: 'Org' });
        const org = await user.createOwnedOrg({
            name: 'Other',
        });

        await supertest(app)
            .patch(`/api/org/${org.id}`)
            .set('Authorization', `bearer ${token.id}`)
            .send({ name: 'Org' })
            .expect('Content-Type', /json/)
            .expect(409, errors.DuplicateName);
    });

    test('[400] Request does not include token', async () => {
        await supertest(app)
            .patch('/api/org/randomString')
            .send()
            .expect('Content-Type', /json/)
            .expect(400, errors.Incomplete);
    });

    test('[401] Token was not found', async () => {
        await supertest(app)
            .patch('/api/org/randomString')
            .set('Authorization', 'bearer randomString')
            .send()
            .expect('Content-Type', /json/)
            .expect(401, errors.Unauthenticated);
    });
});
