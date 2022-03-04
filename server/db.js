var { Sequelize, Options } = require('sequelize');
var configs = require('./config/config.js');

const env = process.env.NODE_ENV || 'development';
const config = configs[env];

const db = new Sequelize({
    ...config,
    define: {
        underscored: true,
    },
});

module.exports = db;
