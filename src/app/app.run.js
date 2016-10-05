/* global moment */
(function () {
  'use strict';

  angular
    .module('nocbeo')
    .run(run);

  function run(moment, toastr, toastrOptions, pace, $rootScope, monthHelper, $state) {
    moment.locale('hu');

    toastr.options = toastrOptions;

    pace.options.ajax.ignoreURLs.push(/browser-sync/gi);
    pace.options.ajax.ignoreURLs.push(/ws/gi);

    $rootScope.months = [];
    $rootScope.current = null;
    monthHelper.list().then(function(months) {
      $rootScope.months = months;
      monthHelper.current().then(function(current) {
        $rootScope.current = current;
      })
    });
    $state.go('root.home.index');
  }
})();
