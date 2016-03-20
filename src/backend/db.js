var config = require('./config.json');
var mongoose = require('mongoose');
var q = require('q');

var db;

function connect() {
    mongoose.connect(config.db.url);
    var deferred = q.defer();

    db = mongoose.connection;
    db.once('open', function() {
        deferred.resolve();
    });

    return deferred.promise();
}

module.exports = {

    close: function() {
        db.close();
    },

    connect: function () {
        return connect();
    }

};