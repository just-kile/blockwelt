/**
 * Created by thomas on 09.01.16.
 */

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var ShareHandler = require('./handlers/shareHandler')
var routes = require('./routes');

var port = 9003;

var handlers = {
    share: new ShareHandler()
};

app.use(bodyParser.json());
app.use(express.static('src/frontend'));

routes.setup(app, handlers);
var server = app.listen(port);

console.log('Blockwelt is up and running.');

module.exports = server;