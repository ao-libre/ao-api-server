const mariadb = require('mariadb');

exports.connect = function(callback) {
    pool = mariadb.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        waitForConnections: true,
        connectionLimit: 10,
        connectTimeout: 120000
    });

    callback()
};

exports.get = function() {
    return pool;
};