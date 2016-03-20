/**
 * Created by thomas on 13.03.16.
 */

var gulp = require('gulp');
var requiredir = require('require-dir');
var runsequence = require('run-sequence');

requiredir('gulp/tasks', {recurse: true});

gulp.task('default', ['unit', 'unit:watch']);

gulp.task('test', function(done) {
   runsequence('unit', done);
});