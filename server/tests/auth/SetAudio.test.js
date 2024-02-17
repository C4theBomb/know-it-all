const supertest = require('supertest');

const { sequelize } = require('../../db/models/index');
const app = require('../../app');

const errors = require('../../config/error.json');

describe('Set Audio', function () {
    beforeEach(async () => {
        try {
            await sequelize.authenticate();
            await sequelize.sync({ force: 'true' });
        } catch (error) {
            console.log('[ERROR]: Database connection failed');
        }
    });

    it('[400] Request does not include token', async () => {
        await supertest(app)
            .post('/api/auth/audio')
            .send()
            .expect('Content-Type', /json/)
            .expect(400, errors.Incomplete);
    });

    it('[401] Token was not found', async () => {
        await supertest(app)
            .post('/api/auth/audio')
            .set('Authorization', 'bearer randomString')
            .send()
            .expect('Content-Type', /json/)
            .expect(401, errors.Unauthenticated);
    });
});
