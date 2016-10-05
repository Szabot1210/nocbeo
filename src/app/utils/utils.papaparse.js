(function () {
  'use strict';

  angular
    .module('nocbeo-utils')
    .factory('papaparse', papaparse);

  /*
   * @ngInject
   */
  function papaparse($window) {
    return $window.Papa;
  }

})();
