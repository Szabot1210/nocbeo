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

    function logTime(start, label) {
      var now = performance.now();
      console.debug(label + (performance.now() - start) + ' ms');
      return now;
    }

    function get() {
      var start = performance.now();
      console.debug('Loading month data ...');
      monthHelper.get($stateParams.csvName)
        .then(function (month) {
          vm.month = month;
          vm.isCurrent = monthHelper.isCurrent(vm.month);
          start = logTime(start, 'Current month loaded, ');
        })
        .then(function () {
          return $q(function (resolve) {
            monthHelper.next($stateParams.csvName).then(function (next) {
              vm.next = next;
              resolve();
            });
          });
        })
        .then(function () {
          return $q(function (resolve) {
            monthHelper.prev($stateParams.csvName).then(function (prev) {
              vm.prev = prev;
              resolve();
            });
          });
        })
        .then(function () {
          monthHelper.data($stateParams.csvName).then(function (data) {
            var maxCols = vm.month.from.daysInMonth() + 2;
            data = _.map(data, function (row) {
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
              processedRow = processedRow.concat(row.slice(2, row.length));
              return processedRow;
            });

            start = logTime(start, 'Data loaded, ');

            vm.data = monthHelper.buildTableData(vm.month, data);
            vm.meta = _.head(data.slice(0, 1));

            start = logTime(start, 'Data processed, ');
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
