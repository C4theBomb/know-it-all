const supertest = require('supertest');

var { sequelize } = require('../../db/models/index');
const app = require('../../app');

describe('SetAudio', function () {
    beforeEach(async () => {
        try {
            await sequelize.authenticate();
            await sequelize.sync({ force: 'true' });
        } catch (error) {
            console.log('[ERROR]: Database connection failed');
        }
    });

    test('[403] Missing token', async () => {
        await supertest(app)
            .post('/api/auth/logout')
            .send()
            .expect(403, 'Unauthorized user')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });

    test('[511] Token was not found', async () => {
        await supertest(app)
            .post('/api/auth/logout')
            .send({ token: 'randomString' })
            .expect(511, 'Session expired')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });
});
