'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

module.exports = function(options) {
  gulp.task('constants', function() {
    return gulp.src(options.src + '/app/**/app.constant.js')
      .pipe($.replace('##API_URL##', options.apiUrl))
      .pipe($.replace('##MQTT_URL##', options.mqttUrl))
      .pipe($.replace('##MQTT_TOPIC_PREFIX##', options.mqttTopicPrefix))
      .pipe($.replace('##STORAGE_PREFIX##', options.storagePrefix))
      .pipe($.replace('##DEFAULT_LANGUAGE##', options.defaultLanguage))
      .pipe($.replace('##APP_ID##', options.appId))
      .pipe($.replace('##PLAY_STORE_URL##', options.playStoreUrl))
      .pipe($.replace('##APPLE_STORE_URL##', options.appleStoreUrl))
      .pipe($.replace('##FACEBOOK_CLIENT_ID##', options.facebookClientId))
      .pipe($.replace('##GOOGLE_CLIENT_ID##', options.googleClientId))
      .pipe(gulp.dest(options.tmp + '/serve'));
  });

  gulp.task('inject', ['constants', 'scripts', 'styles'], function () {
    var injectStyles = gulp.src([
      options.tmp + '/serve/styles/**/*.css',
      '!' + options.tmp + '/serve/styles/vendor.css'
    ], { read: false });

    var injectScripts = gulp.src([
      options.src + '/app/**/*.js',
      options.tmp + '/serve/app.constant.js',
      '!' + options.src + '/app/**/app.constant.js',
      '!' + options.src + '/app/**/*.spec.js',
      '!' + options.src + '/app/**/*.mock.js'
    ])
    .pipe($.angularFilesort()).on('error', options.errorHandler('AngularFilesort'));

    var injectOptions = {
      ignorePath: [options.src, options.tmp + '/serve'],
      addRootSlash: false
    };

    return gulp.src(options.src + '/*.html')
      .pipe($.inject(injectStyles, injectOptions))
      .pipe($.inject(injectScripts, injectOptions))
      .pipe(wiredep(options.wiredep))
      .pipe(gulp.dest(options.tmp + '/serve'));

  });
};
