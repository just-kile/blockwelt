var db;

function upload(request, response) {
    if (request.body && request.body.locations) {
        db.get('locations').insert({locations: request.body.locations}, function (error, data) {
            console.log(data);
            response.status(200);
        });
    } else {
        response.status(400).send('Invalid data.');
    }
}

module.exports = function (_db) {
    db = _db;

    this.upload = upload
};