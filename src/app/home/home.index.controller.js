(function () {
  'use strict';

  angular
    .module('nocbeo-home')
    .controller('HomeIndexCtrl', HomeIndexCtrl);

  /*
   * @ngInject
   */
  function HomeIndexCtrl(monthHelper) {
    var vm = this;

    vm.months = [];
    vm.current = null;

    function get() {
      monthHelper.list().then(function(months) {
        vm.months = months;
        monthHelper.current().then(function(current) {
          vm.current = current;
        })
      });
    }

    function init() {
      get();
    }

    init();
  }

})();
