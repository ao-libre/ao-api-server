const db = require('../db.js');

const publicFieldsFromUsersTable = "`id`, `name`, `level`, `exp`, `elu`, `description` from `users`";

exports.getAllUsers = function(req, res) {
    db.get().query('SELECT * FROM user', function (err, results, fields) {
        if (err) throw err;
        res.status(200).json(results);
    })
};

exports.getAllByUser = function(req, res) {
    console.log(req)
    db.get().query('SELECT * FROM user WHERE id = ?', res.userId, function (err, rows) {
        if (err) throw err;
        res.status(200).json(results);
    })
};

exports.getAllUsersConnectedCount = function(req, res) {
    db.get().query('SELECT COUNT(id) as users_connected FROM `user` WHERE is_logged = true;', function (err, results, fields) {
        if (err) throw err;
        res.status(200).json(results);
    })
};

exports.getTopTenMaxLeverUsers = function (req, res) {
    db.get().query('SELECT `id`, `name`, `level`, `exp`, `elu`, `description` FROM `user` ORDER BY `level` DESC LIMIT 10;', function (err, results, fields) {
        if (err) throw err;
        res.status(200).json(results);
    })
};