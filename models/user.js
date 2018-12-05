const db = require('../db.js')

exports.getAll = function(req, res) {
    db.get().query('SELECT * FROM user', function (err, results, fields) {
        if (err) throw err;

        //preguntar por que se ve diferente esto, que un resultado de mysql to json
        // res.send([{"asd":"ddd"}])

        res.status(200).send(JSON.stringify(results));
    })
};

exports.getAllByUser = function(req, res) {
    console.log(req)
    db.get().query('SELECT * FROM user WHERE id = ?', res.userId, function (err, rows) {
        if (err) throw err;
        res.send(rows);
    })
};

exports.getAllUsersConnectedCount = function(req, res) {
    db.get().query('SELECT COUNT(id) as users_connected FROM `user` WHERE is_logged = true;', function (err, results, fields) {
        if (err) throw err;

        //preguntar por que se ve diferente esto, que un resultado de mysql to json
        // res.send([{"asd":"ddd"}])

        res.status(200).send(JSON.stringify(results));
    })
};