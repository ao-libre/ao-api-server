const mysql = require('mysql2/promise');

var state = {
    pool: null,
    mode: null,
};

exports.connect = function(mode, done) {
    state.pool = mysql.createPool({
        host: 'db4free.net',
        user: 'aolibre_database',
        database: 'aolibre_database',
        password: 'cocacola',
    });

    state.mode = mode;
    done()
};

exports.get = function() {
    return state.pool
};