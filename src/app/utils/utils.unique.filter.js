(function () {
  'use strict';

  angular
    .module('nocbeo-utils')
    .filter('unique', uniqueFilter);

  /*
   * @ngInject
   */
  function uniqueFilter(_) {
    return function (arr, field) {
      return _.uniq(arr, function (a) {
        return a[field];
      });
    };
  }
})();
