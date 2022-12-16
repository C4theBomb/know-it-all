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
            .post('/api/auth/audio')
            .send()
            .expect(403, 'Unauthorized user')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });

    test('[400] Token was not found', async () => {
        await supertest(app)
            .post('/api/auth/audio')
            .send({ token: 'randomString' })
            .expect(400, 'Session expired')
            .set('Accept', 'text/html')
            .expect('Content-Type', /text/);
    });
});
