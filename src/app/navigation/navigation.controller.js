(function () {
  'use strict';

  angular
    .module('nocbeo-navigation')
    .controller('NavigationCtrl', NavigationCtrl);

  /*
   * @ngInject
   */
  function NavigationCtrl ($rootScope) {
    var vm = this;

    vm.months = null;
    vm.current = null;

    vm.toggleNavbar = toggleNavbar;

    function toggleNavbar() {
      $rootScope.navbarCollapsed = $rootScope.navbarCollapsed ? false : true;
    }

    $rootScope.$watch('months', function(newValue) {
      vm.months = newValue;
    });
    $rootScope.$watch('current', function(newValue) {
      vm.current = newValue;
    });
  }
})();
