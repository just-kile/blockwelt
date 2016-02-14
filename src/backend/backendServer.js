/**
 * Created by thomas on 09.01.16.
 */

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 9003;

app.use(bodyParser.json());

app.post('/rest/upload', function (req, res) {
    console.log("Uploading data");
    res.json({result: "OK"})
});

app.use(express.static('src/frontend'));
app.listen(port);

console.log('Blockwelt is up and running.');