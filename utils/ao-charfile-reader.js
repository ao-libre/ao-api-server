const fs = require('fs');

module.exports = {

    getCharFile(chrName) {
      return new Promise(function(resolve, reject) {
          fs.readFile(chrName, function(err, data) {
              if (err) return reject(err);
              console.log(data)
              resolve(data.toString('utf-8'));
          });
      })
    },
};

