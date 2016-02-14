var monk = require('monk')
var config = require('./config.json')
var db;

function connect() {
    db = monk(config.db.url);
}

module.exports = {

    close: function() {
        db.close();
    },

    get: function (collection) {
        if (!db) {
            connect();
        }
        console.log('doh!')
        return db.get(collection);
    }

};