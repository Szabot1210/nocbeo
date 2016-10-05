(function () {
  'use strict';

  angular.module('nocbeo', [
    'ui.router',
    'ui.bootstrap',
    'multi-transclude',
    'ngSanitize',
    'ngStorage',
    'ngSanitize',
    'ng.deviceDetector',
    'ngTouch',
    'pascalprecht.translate',
    'duScroll',

    'nocbeo-utils',
    'nocbeo-ui',

    // resources,
    'nocbeo-home',
    'nocbeo-month',
    'nocbeo-navigation'
  ]);
})();
