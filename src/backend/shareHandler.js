var db;

function upload(request, response) {
    console.log('foo');
    if (request.body && request.body.locations) {

        db.get('locations').insert({locations: request.body.locations}, function (error, data) {
            if (error) {
                response.status(500).send(error);
            } else {
                response.status(200).json({id: data._id});
            }
        });
    } else {
        console.log('foo');
        response.status(400).send('Invalid data.');
    }
}

function get(request, response) {
    var id = request.params.id;
    console.log('asfasdf ', id)
    if (id) {
        db.get('locations').findOne({_id: id}, function (error, data) {
            if (error) {
                response.status(500).send(error);
            } else {
                response.status(200).json(data);
            }
        });
    } else {
        response.status(400).send();
    }
}

module.exports = function () {
    this.upload = upload,
    this.get = get
};