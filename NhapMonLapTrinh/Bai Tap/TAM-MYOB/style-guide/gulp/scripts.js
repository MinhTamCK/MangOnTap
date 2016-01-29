'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

var src = [
  path.join(conf.paths.app, '/scripts/**/*.js'),
  '!' + path.join(conf.paths.app, '/scripts/l10n.js'),
  '!' + path.join(conf.paths.app, '/scripts/libs/**/*.js'),
  // '!' + path.join(conf.paths.app, '/scripts/plugins/**/*.js'),
  path.join(conf.paths.aem, '/**/*.js'),
  '!' + path.join(conf.paths.aem, '/apps/myob/components/clientlibs/**/*.js'),
  '!' + path.join(conf.paths.aem, '/apps/myob/components/structure/**/*.js'),
  '!' + path.join(conf.paths.aem, '/etc/designs/myob/headlibs/**/*.js'),
  '!' + path.join(conf.paths.aem, '/etc/designs/myob/footlibs/**/*.js')
];

gulp.task('scripts:app:eslint', function() {

  return gulp.src(src)
    .pipe($.debug({
      title: 'files:'
    }))
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

gulp.task('scripts:app:jscs', function() {

  return gulp.src(src)
    .pipe($.jscs({fix: false}))
    .pipe($.jscs.reporter())
    .pipe($.jscs.reporter('fail'))
    // .pipe(gulp.dest(path.join(conf.paths.app, '/scripts'))) // only if fixing
    ;
});

gulp.task('scripts:app', ['scripts:app:eslint', 'scripts:app:jscs']);
