var db;

function upload(request, response) {
    if (request.body && request.body.locations) {
        console.log(request.body.locations);
        
        db.get('locations').insert({locations: request.body.locations}, function (error, data) {
            if (error) {
                response.status(500).send(error);
            } else {
                response.status(200).json({id: data._id});
            }
        });
    } else {
        response.status(400).send('Invalid data.');
    }
}

module.exports = function (_db) {
    db = _db;

    this.upload = upload
};