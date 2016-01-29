'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

gulp.task('styles', function () {

  return gulp.src([
    path.join(conf.paths.src, '/index.less')
  ])
    .pipe($.sourcemaps.init())
    .pipe($.less()).on('error', conf.errorHandler('Less'))
    .pipe($.csslint())
    .pipe($.csslintLessReporter()).on('error', conf.errorHandler('CssLintLessReporter'))
    .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('styles:app', function () {

  return gulp.src([
    path.join(conf.paths.app, '/styles/style.less')
  ])
    .pipe($.sourcemaps.init())
    .pipe($.less()).on('error', conf.errorHandler('Less'))
    .pipe($.csslint())
    .pipe($.csslintLessReporter()).on('error', conf.errorHandler('CssLintLessReporter'));
    // .pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    // .pipe($.sourcemaps.write())
    // .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app/')))
    // .pipe(browserSync.reload({ stream: true }));
});
