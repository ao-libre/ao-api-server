//USERS are the charfiles in the database
//Use charfile controller to read from charfiles

const db = require('../db.js');

const publicFieldsFromUsersTable = "id, name, level, exp, elu, genre_id, race_id, class_id, home_id, description, gold, bank_gold, pos_map, pos_x, pos_y, body_id, killed_npcs, killed_users, counter_connected, is_logged, min_hp, max_hp, min_man, max_man, min_sta, max_sta, min_ham, max_ham, min_sed, max_sed, min_hit, max_hit, body_id, head_id, weapon_id, helmet_id, shield_id, pertenece_consejo_real, pertenece_consejo_caos, pertenece_caos, pertenece_real, ciudadanos_matados, criminales_matados, is_dead, is_ban";

exports.getAllUsers = function(req, res) {
    db.get().query(`SELECT ${publicFieldsFromUsersTable} FROM user`, function (err, results, fields) {
        if (err) throw err;
        res.status(200).json(results);
    })
};

exports.getUserByName = function(req, res, name) {
    db.get().query(`SELECT ${publicFieldsFromUsersTable} FROM user WHERE name = '${name}';`, res.userId, function (err, results, rows) {
        if (err) throw err;
        res.status(200).json(results);
    })
};

exports.getAllUsersConnectedCount = function(req, res) {
    db.get().query(`SELECT COUNT(id) as users_connected FROM user WHERE is_logged = true;`, function (err, results, fields) {
        if (err) throw err;
        res.status(200).json(results);
    })
};

exports.getTopTenMoreHp = function (req, res) {
    db.get().query(`SELECT ${publicFieldsFromUsersTable} FROM user ORDER BY max_hp DESC LIMIT 10;`, function (err, results, fields) {
        if (err) throw err;
        res.status(200).json(results);
    });
};

exports.getTopTenMoreTimeOnline = function (req, res) {
    db.get().query(`SELECT ${publicFieldsFromUsersTable} FROM user ORDER BY counter_connected DESC LIMIT 10;`, function (err, results, fields) {
        if (err) throw err;
        res.status(200).json(results);
    });
};

exports.getTopTenMaxLeverUsers = function (req, res) {
    db.get().query(`SELECT ${publicFieldsFromUsersTable} FROM user ORDER BY level DESC LIMIT 10;`, function (err, results, fields) {
        if (err) throw err;
        res.status(200).json(results);
    });
};

exports.getTopTenNpcKiller = function (req, res) {
    db.get().query(`SELECT ${publicFieldsFromUsersTable} FROM user ORDER BY killed_npcs DESC LIMIT 10;`, function (err, results, fields) {
        if (err) throw err;
        res.status(200).json(results);
    });
};

exports.getTopTenUserKiller = function (req, res) {
    db.get().query(`SELECT ${publicFieldsFromUsersTable} FROM user ORDER BY killed_users DESC LIMIT 10;`, function (err, results, fields) {
        if (err) throw err;
        res.status(200).json(results);
    });
};

exports.getTopTenMoreGoldUsers = function (req, res) {
    db.get().query(`SELECT ${publicFieldsFromUsersTable} FROM user ORDER BY gold DESC, bank_gold DESC LIMIT 10;`, function (err, results, fields) {
        if (err) throw err;
        res.status(200).json(results);
    });
};

exports.getAllArmadaUsers = function (req, res) {
    db.get().query(`SELECT ${publicFieldsFromUsersTable} FROM user WHERE pertenece_real = 1 ORDER by level DESC;`, function (err, results, fields) {
        if (err) throw err;
        res.status(200).json(results);
    });
};

exports.getAllCaosUsers = function (req, res) {
    db.get().query(`SELECT ${publicFieldsFromUsersTable} FROM user WHERE pertenece_caos = 1 ORDER by level DESC;`, function (err, results, fields) {
        if (err) throw err;
        res.status(200).json(results);
    });
};

exports.getAllArmadaConsejoUsers = function (req, res) {
    db.get().query(`SELECT ${publicFieldsFromUsersTable} FROM user WHERE pertenece_consejo_real = 1 ORDER by level DESC;`, function (err, results, fields) {
        if (err) throw err;
        res.status(200).json(results);
    });
};

exports.getAllCaosConsejoUsers = function (req, res) {
    db.get().query(`SELECT ${publicFieldsFromUsersTable} FROM user WHERE pertenece_consejo_caos = 1 ORDER by level DESC;`, function (err, results, fields) {
        if (err) throw err;
        res.status(200).json(results);
    });
};
