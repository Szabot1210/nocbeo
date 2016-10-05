(function () {
  'use strict';

  angular
    .module('nocbeo-utils')
    .factory('pace', pace);

  /*
   * @ngInject
   */
  function pace ($window) {

    return $window.Pace;
  }

})();
