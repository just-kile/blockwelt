/**
 * Created by thomas on 09.01.16.
 */

var express = require('express');

var app = express();
var port = 9003;

app.use(express.static('src/frontend'));
app.listen(port);

console.log('Blockwelt is up and running.');