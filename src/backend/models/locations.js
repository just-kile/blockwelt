/**
 * Created by thomas on 13.03.16.
 */

var mongoose = require('mongoose');


var locationsSchema = new mongoose.Schema({
    locations: Array
});


var Locations =  mongoose.model('locations', locationsSchema);

module.exports = Locations;