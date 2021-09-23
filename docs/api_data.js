define({ "api": [
  {
    "type": "get",
    "url": "accounts/backupaccountfiles",
    "title": "Backup Account Files to database",
    "version": "0.1.0",
    "name": "backupaccountfiles",
    "group": "Accounts",
    "filename": "apidoc/accounts.js",
    "groupTitle": "Accounts"
  },
  {
    "type": "get",
    "url": "charfiles/backupcharfiles",
    "title": "Backup Charfiles to database",
    "version": "0.1.0",
    "name": "backupcharfiles",
    "group": "Charfiles",
    "filename": "apidoc/charfiles.js",
    "groupTitle": "Charfiles"
  },
  {
    "type": "get",
    "url": "charfiles/armada",
    "title": "Get all chars who belong to Armada",
    "version": "0.1.0",
    "name": "getAllArmadaCharfiles",
    "group": "Charfiles",
    "filename": "apidoc/charfiles.js",
    "groupTitle": "Charfiles"
  },
  {
    "type": "get",
    "url": "charfiles/caos",
    "title": "Get all chars who belong to Caos",
    "version": "0.1.0",
    "name": "getAllCaosCharfiles",
    "group": "Charfiles",
    "filename": "apidoc/charfiles.js",
    "groupTitle": "Charfiles"
  },
  {
    "type": "get",
    "url": "charfiles/all",
    "title": "Get all chars",
    "version": "0.1.0",
    "name": "getAllCharfiles",
    "group": "Charfiles",
    "filename": "apidoc/charfiles.js",
    "groupTitle": "Charfiles"
  },
  {
    "type": "get",
    "url": "charfiles/user/:name",
    "title": "Get char by name",
    "version": "0.1.0",
    "name": "getCharByName",
    "group": "Charfiles",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Char unique name.</p>"
          }
        ]
      }
    },
    "filename": "apidoc/charfiles.js",
    "groupTitle": "Charfiles"
  },
  {
    "type": "get",
    "url": "charfiles/file/:name",
    "title": "Get charfile by name",
    "version": "0.1.0",
    "name": "getCharfile",
    "group": "Charfiles",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Char file unique name.</p>"
          }
        ]
      }
    },
    "filename": "apidoc/charfiles.js",
    "groupTitle": "Charfiles"
  },
  {
    "type": "get",
    "url": "charfiles/toptenlevel",
    "title": "Get top ten level chars",
    "version": "0.1.0",
    "name": "getTopTenMaxLeverCharfiles",
    "group": "Charfiles",
    "filename": "apidoc/charfiles.js",
    "groupTitle": "Charfiles"
  },
  {
    "type": "get",
    "url": "charfiles/toptengold",
    "title": "Get top ten gold chars",
    "version": "0.1.0",
    "name": "getTopTenMoreGoldCharfiles",
    "group": "Charfiles",
    "filename": "apidoc/charfiles.js",
    "groupTitle": "Charfiles"
  },
  {
    "type": "get",
    "url": "charfiles/toptenmorehp",
    "title": "Get top ten more health points chars",
    "version": "0.1.0",
    "name": "getTopTenMoreHp",
    "group": "Charfiles",
    "filename": "apidoc/charfiles.js",
    "groupTitle": "Charfiles"
  },
  {
    "type": "get",
    "url": "charfiles/toptenmoretimeonline",
    "title": "Get top ten more time online chars",
    "version": "0.1.0",
    "name": "getTopTenMoreTimeOnline",
    "group": "Charfiles",
    "filename": "apidoc/charfiles.js",
    "groupTitle": "Charfiles"
  },
  {
    "type": "get",
    "url": "charfiles/toptenuserkiller",
    "title": "Get top ten more npc killed by char",
    "version": "0.1.0",
    "name": "getTopTenUserKiller",
    "group": "Charfiles",
    "filename": "apidoc/charfiles.js",
    "groupTitle": "Charfiles"
  },
  {
    "type": "get",
    "url": "charfiles/toptenuserkiller",
    "title": "Get top ten more Charfiles killed by char",
    "version": "0.1.0",
    "name": "getTopTenUserKiller",
    "group": "Charfiles",
    "filename": "apidoc/charfiles.js",
    "groupTitle": "Charfiles"
  },
  {
    "type": "get",
    "url": "users/consejoarmada",
    "title": "Get all chars who belong to Consejo Armada",
    "version": "0.1.0",
    "name": "getAllArmadaConsejoUsers",
    "group": "User",
    "filename": "apidoc/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "users/armada",
    "title": "Get all chars who belong to Armada",
    "version": "0.1.0",
    "name": "getAllArmadaUsers",
    "group": "User",
    "filename": "apidoc/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "users/consejocaos",
    "title": "Get all chars who belong to Consejo Caos",
    "version": "0.1.0",
    "name": "getAllCaosConsejoUsers",
    "group": "User",
    "filename": "apidoc/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "users/caos",
    "title": "Get all chars who belong to Caos",
    "version": "0.1.0",
    "name": "getAllCaosUsers",
    "group": "User",
    "filename": "apidoc/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "users/all",
    "title": "Get all chars",
    "version": "0.1.0",
    "name": "getAllUsers",
    "group": "User",
    "filename": "apidoc/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "users/online",
    "title": "Get quantity chars connected.",
    "version": "0.1.0",
    "name": "getAllUsersOnline",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "users_connected",
            "description": "<p>Quantity of chars connected.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n{\n \"quantity\": 150,\n}",
          "type": "json"
        }
      ]
    },
    "filename": "apidoc/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "users/toptenlevel",
    "title": "Get top ten level chars",
    "version": "0.1.0",
    "name": "getTopTenMaxLeverUsers",
    "group": "User",
    "filename": "apidoc/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "users/toptengold",
    "title": "Get top ten gold chars",
    "version": "0.1.0",
    "name": "getTopTenMoreGoldUsers",
    "group": "User",
    "filename": "apidoc/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "users/toptenmorehp",
    "title": "Get top ten more health points chars",
    "version": "0.1.0",
    "name": "getTopTenMoreHp",
    "group": "User",
    "filename": "apidoc/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "users/toptenmoretimeonline",
    "title": "Get top ten more time online chars",
    "version": "0.1.0",
    "name": "getTopTenMoreTimeOnline",
    "group": "User",
    "filename": "apidoc/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "users/toptenuserkiller",
    "title": "Get top ten more users killed by char",
    "version": "0.1.0",
    "name": "getTopTenUserKiller",
    "group": "User",
    "filename": "apidoc/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "users/toptenuserkiller",
    "title": "Get top ten more npc killed by char",
    "version": "0.1.0",
    "name": "getTopTenUserKiller",
    "group": "User",
    "filename": "apidoc/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "users/user/:name",
    "title": "Get char by name",
    "version": "0.1.0",
    "name": "getUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Char unique name.</p>"
          }
        ]
      }
    },
    "filename": "apidoc/users.js",
    "groupTitle": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the char.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the char.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "level",
            "description": "<p>Level of the char.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "exp",
            "description": "<p>Experience of the char.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "elu",
            "description": "<p>Experience Level Up.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "genre_id",
            "description": "<p>Genre ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "race_id",
            "description": "<p>Race ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "class_id",
            "description": "<p>Class ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "home_id",
            "description": "<p>Home ID, place where it can go with /hogar.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "description",
            "description": "<p>Description set with /desc.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "gold",
            "description": "<p>Gold that the char has in the wallet.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "bank_gold",
            "description": "<p>Gold that the char has in the bank.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pos_map",
            "description": "<p>Map number where the char is at the moment.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pos_x",
            "description": "<p>Horizontal position in the map.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pos_y",
            "description": "<p>Vertical position in the map.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "body_id",
            "description": "<p>Body ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "killed_npcs",
            "description": "<p>Quantity of npcs killed by the char.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "killed_users",
            "description": "<p>Quantity of users killed by the char.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "counter_connected",
            "description": "<p>Time expended online since the beginning of the time.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "is_logged",
            "description": "<p>If the user is logged at the moment.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "min_hp",
            "description": "<p>Current Health Points of the char</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "max_hp",
            "description": "<p>Char's Maximum Health Points.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "min_man",
            "description": "<p>Char's Current Mana Points.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "max_man",
            "description": "<p>Char's Maximum Mana Points.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "min_sta",
            "description": "<p>Char's Current Stamina Points.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "max_sta",
            "description": "<p>Char's Maximum Stamina Points.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "min_ham",
            "description": "<p>Char's Current Hungry Points.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "max_ham",
            "description": "<p>Char's Maximum Hungry Points.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "min_sed",
            "description": "<p>Char's Current Thirsty Points.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "max_sed",
            "description": "<p>Char's Maximum Thirsty Points.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "min_hit",
            "description": "<p>Char's Minimum Hit Points.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "max_hit",
            "description": "<p>Char's Maximum Hit Points.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "head_id",
            "description": "<p>Head ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "weapon_id",
            "description": "<p>Weapon Equiped ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "helmet_id",
            "description": "<p>Helmet Equiped ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "shield_id",
            "description": "<p>Shield Equiped ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pertenece_consejo_real",
            "description": "<p>Char member of the Consejo Real.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pertenece_consejo_caos",
            "description": "<p>Char member of the Consejo Caos.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pertenece_caos",
            "description": "<p>Char member of Caos.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "pertenece_real",
            "description": "<p>Char member of Real.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "ciudadanos_matados",
            "description": "<p>Quantity Ciudadanos killed by the char.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "criminales_matados",
            "description": "<p>Quantity Criminales killed by the char.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "is_dead",
            "description": "<p>Indicate if the char is dead.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "is_ban",
            "description": "<p>Indicate if the char is banned.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  HTTP/1.1 200 OK\n{\n \"id\": 2,\n \"name\": \"recox\",\n \"level\": 1,\n \"exp\": 0,\n \"elu\": 300,\n \"genre_id\": 2,\n \"race_id\": 1,\n \"class_id\": 2,\n \"home_id\": 1,\n \"description\": \"\",\n \"gold\": 0,\n \"bank_gold\": 0,\n \"pos_map\": 1,\n \"pos_x\": 36,\n \"pos_y\": 82,\n \"body_id\": 1,\n \"killed_npcs\": 0,\n \"killed_users\": 0,\n \"counter_connected\": 0,\n \"is_logged\": 0,\n \"min_hp\": 17,\n \"max_hp\": 17,\n \"min_man\": 50,\n \"max_man\": 50,\n \"min_sta\": 60,\n \"max_sta\": 60,\n \"min_ham\": 90,\n \"max_ham\": 100,\n \"min_sed\": 90,\n \"max_sed\": 100,\n \"min_hit\": 1,\n \"max_hit\": 2,\n \"head_id\": 70,\n \"weapon_id\": 12,\n \"helmet_id\": 2,\n \"shield_id\": 2,\n \"pertenece_consejo_real\": 0,\n \"pertenece_consejo_caos\": 0,\n \"pertenece_caos\": 0,\n \"pertenece_real\": 0,\n \"ciudadanos_matados\": 0,\n \"criminales_matados\": 0,\n \"is_dead\": 0,\n \"is_ban\": 0\n}",
          "type": "json"
        }
      ]
    }
  }
] });
