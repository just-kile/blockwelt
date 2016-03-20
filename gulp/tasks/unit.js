/**
 * Created by thomas on 13.03.16.
 */

var gulp = require('gulp');
var jasmine = require('gulp-jasmine');

gulp.task('unit', ['unit:backend', 'unit:frontend']);

gulp.task('unit:backend', ['mongodb:start'], function () {
    return gulp.src('test/backend/**/*.js')
        .pipe(jasmine({verbose: true}))
        .on('end', function() {
            gulp.emit('mongodb-stop');
        })
        .on('error', function() {
            gulp.emit('mongodb-stop');
        });
});

gulp.task('unit:frontend', function (done) {
    var Server = require('karma').Server;
    new Server({
        configFile: __dirname + '/../../karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('unit:watch', function() {
   gulp.watch(['test/**/*.js', 'src/**/*.js'], ['unit']);
});