const mysql = require('mysql2/promise');

var state = {
    pool: null,
    mode: null,
};

exports.connect = function(mode, done) {
    state.pool = mysql.createPool({
        // host: 'db4free.net',
        // user: 'aolibre_database',
        // database: 'aolibre_database',
        // password: 'cocacola',
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        connectTimeout: 120000
    });

    state.mode = mode;
    done()
};

exports.get = function() {
    return state.pool
};