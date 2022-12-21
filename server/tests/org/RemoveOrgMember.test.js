const supertest = require('supertest');

const { sequelize } = require('../../db/models/index');
const app = require('../../app');

const { createTestUser, createTestOrg } = require('../utils');
const errors = require('../../config/error.json');

describe('Remove Org Member', () => {
    beforeEach(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: 'true' });
    });

    test('[200] User removed from organization', async () => {
        const user = await createTestUser('Test', 'User', 'password');
        const token = await user.createToken();
        const org = await user.createOwnedOrg({
            name: 'Org',
        });

        const newUser = await createTestUser('New', 'User', 'password');
        await org.addMember(newUser.id);

        await supertest(app)
            .post(`/api/org/${org.id}/remove`)
            .set('Authorization', `bearer ${token.id}`)
            .send({
                doomedUsers: [newUser.id],
            })
            .expect('Content-Type', /text/)
            .expect(200, 'OK')
            .then(async () => {
                const data = await org.getMember();

                expect(data).toEqual(
                    expect.not.arrayContaining([expect.objectContaining(user.dataValues)]),
                );
            });
    });

    test('[404] Organization does not exist', async () => {
        const user = await createTestUser('Test', 'User', 'password');
        const token = await user.createToken();
        const org = await user.createOwnedOrg({
            name: 'Org',
        });

        const newUser = await createTestUser('New', 'User', 'password');
        await org.addMember(newUser.id);

        await supertest(app)
            .post('/api/org/randomString/remove')
            .set('Authorization', `bearer ${token.id}`)
            .send({
                doomedUsers: [newUser.id],
            })
            .expect('Content-Type', /json/)
            .expect(404, errors.NotFound);
    });

    test('[403] Insufficient permissions', async () => {
        const org = await createTestOrg('Org', {
            firstName: 'Test',
            lastName: 'User',
            password: 'password',
        });

        const user = await createTestUser('New', 'User', 'password');
        const token = await user.createToken();
        await org.addMember(user.id);

        await supertest(app)
            .post(`/api/org/${org.id}/remove`)
            .send({
                doomedUsers: [user.id],
            })
            .set('Authorization', `bearer ${token.id}`)
            .expect('Content-Type', /json/)
            .expect(403, errors.Forbidden);
    });

    test('[400] Request does not include token', async () => {
        await supertest(app)
            .post('/api/org/randomString/remove')
            .send()
            .expect('Content-Type', /json/)
            .expect(400, errors.Incomplete);
    });

    test('[401] Token was not found', async () => {
        await supertest(app)
            .post('/api/org/randomString/remove')
            .set('Authorization', 'bearer randomString')
            .send()
            .expect('Content-Type', /json/)
            .expect(401, errors.Unauthenticated);
    });
});
