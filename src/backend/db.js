var monk = require('monk')
var config = require('./config')
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
            setup();
        }
        return db.get(collection);
    }

};