(function () {
  'use strict';

  angular
    .module('nocbeo-utils')
    .factory('$', jquery);

  /*
   * @ngInject
   */
  function jquery ($window) {

    return $window.jQuery;
  }

})();
