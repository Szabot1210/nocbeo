(function () {
  'use strict';

  angular
    .module('nocbeo-ui')
    .controller('FooterCtrl', FooterCtrl);

  /*
   * @ngInject
   */
  function FooterCtrl () {
    var vm = this;

    vm.year = new Date().getFullYear();
  }

})();
