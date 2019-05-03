const mysql = require('mysql');

const PRODUCTION_DB = 'ao_database';
const TEST_DB = 'ao_database';

exports.MODE_TEST = 'mode_test';
exports.MODE_PRODUCTION = 'mode_production';

var state = {
    pool: null,
    mode: null,
};

exports.connect = function(mode, done) {
    state.pool = mysql.createPool({
        host: 'db4free.net',
        user: 'aolibre_database',
        password: 'cocacola',
        database: mode === exports.MODE_PRODUCTION ? PRODUCTION_DB : TEST_DB
    });

    state.mode = mode;
    done()
};

exports.get = function() {
    return state.pool
};