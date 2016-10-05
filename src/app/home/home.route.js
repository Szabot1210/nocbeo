(function () {
  'use strict';

  angular
    .module('nocbeo-home')
    .config(config);

  function config ($stateProvider) {

    $stateProvider
      .state('root.home', {
        url: '',
        abstract: true
      })
      .state('root.home.index', {
        url: '/',
        views: {
          'container@': {
            templateUrl: 'app/home/home.index.html',
            controller: 'HomeIndexCtrl as homeCtrl'
          }
        }
      })
  }
})();
