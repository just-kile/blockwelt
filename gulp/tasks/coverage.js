var coveralls = require('gulp-coveralls');
var gulp = require('gulp');

gulp.task('coveralls', ['unit'], function() {
    // lcov.info is the file which has the coverage information we wan't to upload
    return gulp.src(__dirname + '/coverage/**/lcov.info')
        .pipe(coveralls());
});