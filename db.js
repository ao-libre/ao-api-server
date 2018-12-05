const mysql = require('mysql');
// const async = require('async');

const PRODUCTION_DB = 'argentumonline';
const TEST_DB = 'argentumonline';

exports.MODE_TEST = 'mode_test';
exports.MODE_PRODUCTION = 'mode_production';

var state = {
    pool: null,
    mode: null,
};

exports.connect = function(mode, done) {
    state.pool = mysql.createPool({
        host: '104.43.140.56',
        user: 'argentum',
        password: 'Argentum1234',
        database: mode === exports.MODE_PRODUCTION ? PRODUCTION_DB : TEST_DB
    });

    state.mode = mode;
    done()
};

exports.get = function() {
    return state.pool
};

exports.fixtures = function(data) {
    console.log('no fixture')
    // var pool = state.pool
    // if (!pool) return done(new Error('Missing database connection.'))
    //
    // var names = Object.keys(data.tables)
    // async.each(names, function(name, cb) {
    //     async.each(data.tables[name], function(row, cb) {
    //         var keys = Object.keys(row)
    //             , values = keys.map(function(key) { return "'" + row[key] + "'" })
    //
    //         pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb)
    //     }, cb)
    // }, done)
};

exports.drop = function(tables, done) {
    console.log('no drop');
    // var pool = state.pool
    // if (!pool) return done(new Error('Missing database connection.'))
    //
    // async.each(tables, function(name, cb) {
    //     pool.query('DELETE * FROM ' + name, cb)
    // }, done)
};