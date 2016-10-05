(function () {
  'use strict';

  angular
    .module('nocbeo-utils')
    .factory('toastr', toastr);

  /*
   * @ngInject
   */
  function toastr ($window) {

    return $window.toastr;
  }

})();
