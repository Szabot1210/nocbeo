(function () {
  'use strict';

  angular
    .module('nocbeo-utils')
    .factory('moment', moment);

  /*
   * @ngInject
   */
  function moment ($window) {

    // place moment include before angular
    return $window.moment;
  }

})();
