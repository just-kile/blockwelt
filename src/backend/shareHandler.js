var db = require('../db');

function upload(request, response) {
    if (request.body && request.body.locations) {
        db.get('foo');
        response.status(200).send();
    } else {
        response.status(400).send('Invalid data.');
    }
}

module.exports = function() {
    this.upload = upload
}