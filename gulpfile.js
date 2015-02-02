'use strict';
var gulp = require('gulp')
, gutil = require('gulp-util')
, notify = require('gulp-notify')
, sass = require('gulp-sass')
, livereload = require('gulp-livereload')
, watch = require('gulp-watch');

gulp.task('sass', function () {
  gulp.src('./_sass/build.scss')
  .pipe(sass())
  .pipe(gulp.dest('./assets/css'));
});

gulp.task('watch', function() {
  gulp.watch('./_sass/**/*.scss', function() {
    gulp.run('sass');
  });

  gulp.watch('app/js/**/*.js', function() {});

  gulp.watch('app/**/*.html', function() {});
});

gulp.task('default', ['sass', 'watch']);
