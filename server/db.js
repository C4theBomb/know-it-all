var { Sequelize, Options } = require('sequelize');
var configs = require('./config/config.js');

const env = process.env.NODE_ENV;
const config = configs[env];

const db = new Sequelize({
    ...config,
    logging: false,
    define: {
        underscored: true,
    },
});

module.exports = db;
