(function () {
  'use strict';

  angular
    .module('nocbeo')
    .config(config);

  function config($stateProvider, $httpProvider) {
    $httpProvider.defaults.headers.get = {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    };

    $stateProvider
      .state('root', {
        url: '',
        abstract: true,
        views: {
          'navigation': {
            templateUrl: 'app/navigation/navigation.html',
            controller: 'NavigationCtrl as navigation'
          }
        }
      });
  }
})();
