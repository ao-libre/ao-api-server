/**
 * @apiDefine UserFieldsExplanation
 *
 * @apiSuccess {String} id  Id of the char.
 * @apiSuccess {String} name Name of the char.
 * @apiSuccess {Number} level Level of the char.
 * @apiSuccess {Number} exp Experience of the char.
 * @apiSuccess {Number} elu Experience Level Up.
 * @apiSuccess {Number} genre_id Genre ID.
 * @apiSuccess {Number} race_id Race ID.
 * @apiSuccess {Number} class_id Class ID.
 * @apiSuccess {Number} home_id Home ID, place where it can go with /hogar.
 * @apiSuccess {Number} description Description set with /desc.
 * @apiSuccess {Number} gold Gold that the char has in the wallet.
 * @apiSuccess {Number} bank_gold Gold that the char has in the bank.
 * @apiSuccess {Number} pos_map Map number where the char is at the moment.
 * @apiSuccess {Number} pos_x Horizontal position in the map.
 * @apiSuccess {Number} pos_y Vertical position in the map.
 * @apiSuccess {Number} body_id Body ID.
 * @apiSuccess {Number} killed_npcs Quantity of npcs killed by the char.
 * @apiSuccess {Number} killed_users Quantity of users killed by the char.
 * @apiSuccess {Number} counter_connected Time expended online since the beginning of the time.
 * @apiSuccess {Number} is_logged If the user is logged at the moment.
 * @apiSuccess {Number} min_hp Current Health Points of the char
 * @apiSuccess {Number} max_hp Char's Maximum Health Points.
 * @apiSuccess {Number} min_man Char's Current Mana Points.
 * @apiSuccess {Number} max_man Char's Maximum Mana Points.
 * @apiSuccess {Number} min_sta Char's Current Stamina Points.
 * @apiSuccess {Number} max_sta Char's Maximum Stamina Points.
 * @apiSuccess {Number} min_ham Char's Current Hungry Points.
 * @apiSuccess {Number} max_ham Char's Maximum Hungry Points.
 * @apiSuccess {Number} min_sed Char's Current Thirsty Points.
 * @apiSuccess {Number} max_sed Char's Maximum Thirsty Points.
 * @apiSuccess {Number} min_hit Char's Minimum Hit Points.
 * @apiSuccess {Number} max_hit Char's Maximum Hit Points.
 * @apiSuccess {Number} head_id Head ID.
 * @apiSuccess {Number} weapon_id Weapon Equiped ID.
 * @apiSuccess {Number} helmet_id Helmet Equiped ID.
 * @apiSuccess {Number} shield_id Shield Equiped ID.
 * @apiSuccess {Number} pertenece_consejo_real Char member of the Consejo Real.
 * @apiSuccess {Number} pertenece_consejo_caos Char member of the Consejo Caos.
 * @apiSuccess {Number} pertenece_caos Char member of Caos.
 * @apiSuccess {Number} pertenece_real Char member of Real.
 * @apiSuccess {Number} ciudadanos_matados Quantity Ciudadanos killed by the char.
 * @apiSuccess {Number} criminales_matados Quantity Criminales killed by the char.
 * @apiSuccess {Number} is_dead Indicate if the char is dead.
 * @apiSuccess {Number} is_ban Indicate if the char is banned.
 *
 */

/**
 * @apiDefine UserJsonResponse
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   {
 *    "id": 2,
 *    "name": "recox",
 *    "level": 1,
 *    "exp": 0,
 *    "elu": 300,
 *    "genre_id": 2,
 *    "race_id": 1,
 *    "class_id": 2,
 *    "home_id": 1,
 *    "description": "",
 *    "gold": 0,
 *    "bank_gold": 0,
 *    "pos_map": 1,
 *    "pos_x": 36,
 *    "pos_y": 82,
 *    "body_id": 1,
 *    "killed_npcs": 0,
 *    "killed_users": 0,
 *    "counter_connected": 0,
 *    "is_logged": 0,
 *    "min_hp": 17,
 *    "max_hp": 17,
 *    "min_man": 50,
 *    "max_man": 50,
 *    "min_sta": 60,
 *    "max_sta": 60,
 *    "min_ham": 90,
 *    "max_ham": 100,
 *    "min_sed": 90,
 *    "max_sed": 100,
 *    "min_hit": 1,
 *    "max_hit": 2,
 *    "head_id": 70,
 *    "weapon_id": 12,
 *    "helmet_id": 2,
 *    "shield_id": 2,
 *    "pertenece_consejo_real": 0,
 *    "pertenece_consejo_caos": 0,
 *    "pertenece_caos": 0,
 *    "pertenece_real": 0,
 *    "ciudadanos_matados": 0,
 *    "criminales_matados": 0,
 *    "is_dead": 0,
 *    "is_ban": 0
 *   }
 */

/**
 * @api {get} users/user/:name Get char by name
 * @apiVersion 0.1.0
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {String} name Char unique name.
 *
 * @apiUse UserFieldsExplanation
 * @apiUse UserJsonResponse
 *
 */