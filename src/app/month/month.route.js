(function () {
  'use strict';

  angular
    .module('nocbeo-month')
    .config(config);

  function config ($stateProvider) {

    $stateProvider
      .state('root.month', {
        url: '',
        abstract: true
      })
      .state('root.month.index', {
        url: '/month/{csvName}',
        views: {
          'container@': {
            templateUrl: 'app/month/month.index.html',
            controller: 'MonthIndexCtrl as monthCtrl'
          }
        }
      });
  }
})();
