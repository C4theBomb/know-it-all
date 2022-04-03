require('dotenv').config();

module.exports = {
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'mysql',
    },
    test: {
        dialect: 'sqlite',
        storage: '../test_db.sqlite3',
    },
    development: {
        dialect: 'sqlite',
        storage: '../db.sqlite3',
    },
};
