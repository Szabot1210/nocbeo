'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

module.exports = function(options) {
  gulp.task('partials', function () {
    return gulp.src([
      options.src + '/app/**/*.html',
      options.tmp + '/serve/app/**/*.html'
    ])
      .pipe($.minifyHtml({
        empty: true,
        spare: true,
        quotes: true
      }))
      .pipe($.angularTemplatecache('templateCacheHtml.js', {
        module: 'nocbeo',
        root: 'app'
      }))
      .pipe(gulp.dest(options.tmp + '/partials/'));
  });

  gulp.task('html', ['inject', 'partials'], function () {
    var partialsInjectFile = gulp.src(options.tmp + '/partials/templateCacheHtml.js', { read: false });
    var partialsInjectOptions = {
      starttag: '<!-- inject:partials -->',
      ignorePath: options.tmp + '/partials',
      addRootSlash: false
    };

    var htmlFilter = $.filter('*.html');
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');
    var assets;

    return gulp.src(options.tmp + '/serve/*.html')
      .pipe($.inject(partialsInjectFile, partialsInjectOptions))
      .pipe(assets = $.useref.assets())
      .pipe($.rev())
      .pipe(jsFilter)
      .pipe($.ngAnnotate())
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
      .pipe($.uglify()).on('error', options.errorHandler('Uglify'))
      .pipe(jsFilter.restore())
      .pipe(cssFilter)
      .pipe($.replace('../../bower_components/bootstrap/fonts/', '../fonts/'))
      .pipe($.cssmin())
      .pipe(cssFilter.restore())
      .pipe(assets.restore())
      .pipe($.useref())
      .pipe($.revReplace())
      .pipe(htmlFilter)
      .pipe($.minifyHtml({
        empty: true,
        spare: true,
        quotes: true,
        conditionals: true
      }))
      .pipe(htmlFilter.restore())
      .pipe(gulp.dest(options.dist + '/'))
      .pipe($.size({ title: options.dist + '/', showFiles: true }));
  });

  // Only applies for fonts from bower dependencies
  // Custom fonts are handled by the "other" task
  gulp.task('fonts', function () {
    gulp.src($.mainBowerFiles())
      .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
      .pipe($.flatten())
      .pipe(gulp.dest(options.tmp + '/serve/fonts/'))
      .pipe(gulp.dest(options.dist + '/fonts/'));
  });

  gulp.task('other', function () {
    return gulp.src([
      options.src + '/**/*',
      '!' + options.src + '/**/*.{html,css,js,less}'
    ])
      .pipe(gulp.dest(options.dist + '/'));
  });

  gulp.task('images', function () {
    return gulp.src([
      options.src + '/images/**/*'
    ])
      .pipe(gulp.dest(options.tmp + '/serve/images/'));
  });

  gulp.task('clean', function (done) {
    $.del([options.dist + '/', options.tmp + '/'], done);
  });

  gulp.task('build', ['html', 'fonts', 'images', 'other']);
};
