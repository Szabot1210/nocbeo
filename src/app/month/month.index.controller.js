(function () {
  'use strict';

  angular
    .module('nocbeo-month')
    .controller('MonthIndexCtrl', MonthIndexCtrl);

  /*
   * @ngInject
   */
  function MonthIndexCtrl($stateParams, monthHelper, deviceDetector) {
    var vm = this;

    vm.meta = null;
    vm.month = null;
    vm.prevMonth = null;
    vm.nextMonth = null;
    vm.showPast = true;
    vm.isCurrent = null;
    vm.setPast = setPast;

    function setPast(value) {
      vm.showPast = value;
    }

    function get() {
      monthHelper.get($stateParams.csvName)
        .then(function (month) {
          vm.month = month;
          vm.isCurrent = monthHelper.isCurrent(vm.month);
        })
        .then(function () {
          monthHelper.next($stateParams.csvName).then(function (next) {
            vm.next = next;
          });
        })
        .then(function () {
          monthHelper.prev($stateParams.csvName).then(function (prev) {
            vm.prev = prev;
          });
        })
        .then(function () {
          monthHelper.data($stateParams.csvName).then(function (data) {
            vm.data = data;
            vm.meta = vm.data.splice(0, 3);
          });
        });
    }

    function init() {
      if (vm.isCurrent && !deviceDetector.isDesktop()) {
        vm.showPast = false;
      }
      get();
    }

    init();
  }

})();
