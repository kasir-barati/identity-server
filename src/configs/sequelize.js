const { Sequelize } = require('sequelize');

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const NODE_ENV = process.env.NODE_ENV;

const _sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    dialect: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    pool: {
        max: 9,
        min: 0,
        idle: 10000
    },
    logging: NODE_ENV === 'develop' ? true : false
});

/**
 * @returns {Object} sequelize
 */
module.exports.getSequelize = () => _sequelize ? _sequelize : null;