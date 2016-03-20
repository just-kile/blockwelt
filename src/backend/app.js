/**
 * Created by thomas on 09.01.16.
 */

module.exports = function (db) {

    var express = require('express');
    var bodyParser = require('body-parser');
    var app = express();

    var ShareHandler = require('./shareHandler');
    var routes = require('./routes');
    var db = require('./db');

    var port = 9003;

    var handlers = {
        share: new ShareHandler()
    };

    app.use(bodyParser.json());
    app.use(express.static('src/frontend'));

    routes.setup(app, handlers);

    var server

    return {
        run: function () {
            server = app.listen(port);
            db.connect();
            console.log('Blockwelt is up and running.');
        },

        shutDown: function () {
            server.close();
            console.log('Blockwelt is down.');
        }
    }

};