var browserify = require('browserify');
var gulp = require('gulp');
var jade = require('gulp-jade');
var source = require('vinyl-source-stream');
var stylus = require('gulp-stylus');
var watchify = require('watchify');

var bundler = watchify(browserify('./src/js/index.js', watchify.args))
        .on('update', bundle)
        .on('log', function (msg) {
            console.log(msg);
        });


function bundle () {
    return bundler
        .bundle()
        .on('error', function () {
            console.log('Browserify Error');
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist'));
}

gulp.task('js', bundle);

gulp.task('jade', function () {
    gulp.src(['./src/index.jade'])
        .pipe(jade())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('stylus', function () {
    gulp.src(['./src/styl/style.styl'])
        .pipe(stylus())
        .pipe(gulp.dest('./dist/'));
});
