const { config } = require('../config')
const Pool = require("pg").Pool;

const pool = new Pool({
    user: config.dbUser,
    host: config.dbHost,
    database: config.dbName,
    password: config.dbPassword,
    port: config.dbPort,
    // ssl: true
});

module.exports = {pool}