var Locations = require('./models/locations');

function upload(request, response) {
    if (request.body && request.body.locations) {
        Locations.create({
            locations: request.body.locations
        }).then(function (data) {
            response.status(200).json({id: data._id});
        }, function (error) {
            response.status(500).send(error);
        });
    } else {
        response.status(400).send('Invalid data.');
    }
}

function get(request, response) {
    var id = request.params.id;
    if (id) {
        Locations.findOne({_id: id}).then(function (data) {
            response.status(200).json(data);
        }, function (error) {
            response.status(500).send(error);
        });
    } else {
        response.status(400).send();
    }
}

module.exports = function () {
    this.upload = upload;
    this.get = get
};