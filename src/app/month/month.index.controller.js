(function () {
  'use strict';

  angular
    .module('nocbeo-month')
    .controller('MonthIndexCtrl', MonthIndexCtrl);

  /*
   * @ngInject
   */
  function MonthIndexCtrl($stateParams, monthHelper, deviceDetector, _, $q) {
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
          return $q(function (resolve) {
            monthHelper.next($stateParams.csvName).then(function (next) {
              vm.next = next;
              if(!vm.next) {
                resolve();
              }
              monthHelper.data(vm.next.dataFile).then(function (data) {
                vm.nextMonth = data;
                resolve();
              });
            });
          });
        })
        .then(function () {
          return $q(function (resolve) {
            monthHelper.prev($stateParams.csvName).then(function (prev) {
              vm.prev = prev;
              if(!vm.prev) {
                resolve();
              }
              monthHelper.data(vm.prev.dataFile).then(function (data) {
                vm.prevMonth = data;
                resolve();
              });
            });
          });
        })
        .then(function () {
          monthHelper.data($stateParams.csvName).then(function (data) {
            var maxCols = vm.month.from.daysInMonth() + 2;
            data = _.map(data, function (row, index) {
              if (row.length < 5) {
                return row;
              }
              if(row.length < maxCols) {
                var diff = maxCols - row.length;
                for(var i = 0; i < diff; i++) {
                  row.push('');
                }
              } else {
                row = row.slice(0, maxCols);
              }

              var processedRow = row.slice(0, 2);
              if(vm.prevMonth) {
                processedRow = processedRow.concat(vm.prevMonth[index].slice(vm.prevMonth[index].length - 3, vm.prevMonth[index]));
              }
              processedRow = row.concat(row.slice(2, row.length));
              if(vm.nextMonth) {
                processedRow = processedRow.concat(vm.nextMonth[index].slice(0, 3));
              }
              return processedRow;
            });
            vm.data = data;
            vm.meta = _.head(vm.data.splice(0, 1));
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
