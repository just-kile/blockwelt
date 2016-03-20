/**
 * Created by thomas on 13.03.16.
 */

var gulp = require('gulp');
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

gulp.task('mongodb:start', function(done) {

    mockgoose(mongoose);
    mongoose.connect('mongodb://example.com/TestDb', function(error) {
        done(error);
    });

    gulp.on('mongodb-stop', function() {
        mongoose.disconnect();
    });

});