/**
 * Created by thomas on 13.03.16.
 */

var gulp = require('gulp');
var cover = require('gulp-coverage');
var jasmine = require('gulp-jasmine');

gulp.task('unit', ['unit:backend', 'unit:frontend']);

gulp.task('unit:backend', ['mongodb:start'], function () {
    return gulp.src('test/backend/**/*.js')
        .pipe(cover.instrument({
            pattern: ['src/backend/**/*.js'],
        }))
        .pipe(jasmine({verbose: true}))
        .pipe(cover.gather())
        .pipe(cover.format({
            reporter: 'lcov',
            outFile: 'lcov.info'
        }))
        .pipe(gulp.dest('coverage/backend'))
        .on('end', function () {
            gulp.emit('mongodb-stop');
        })
        .on('error', function () {
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

gulp.task('unit:watch', function () {
    gulp.watch(['test/**/*.js', 'src/**/*.js'], ['unit']);
});