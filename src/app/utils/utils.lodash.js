(function () {
  'use strict';

  angular
    .module('nocbeo-utils')
    .factory('_', lodash);

  /*
   * @ngInject
   */
  function lodash ($window) {

    // place lodash include before angular
    return $window._;
  }

})();
