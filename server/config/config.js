module.exports = {
    production: {
        dialect: 'mysql',
        database: process.env.PRODUCTION_DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
    },
    test: {
        dialect: 'mysql',
        database: process.env.TEST_DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
    },
    development: {
        dialect: 'sqlite',
        storage: '../test_db.sqlite',
    },
};
