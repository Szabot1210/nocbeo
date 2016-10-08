(function () {
  'use strict';

  angular
    .module('nocbeo-month')
    .directive('monthTable', monthTableDirective);

  /*
   * @ngInject
   */
  function monthTableDirective(_, $timeout, $window, moment, $) {
    return {
      restrict: 'E',
      bindToController: {
        month: '=',
        data: '=',
        showPast: '=?'
      },
      templateUrl: 'app/month/month.table.directive.html',
      controllerAs: 'ctrl',
      controller: function ($scope) {
        var vm = this;
        vm.dayList = [];
        vm.todayIndex = new Date().getDate();

        vm.daysInMonth = function () {
          if (!vm.month) {
            return 30;
          }

          return vm.month.from.daysInMonth();
        };

        vm.daysInMonthList = function () {
          var days = [];
          if (!vm.month) {
            return days;
          }

          var date = moment(vm.month.from);
          _.times(vm.daysInMonth(), function () {
            days.push(moment(date));
            date = date.add(1, 'days');
          });
          return days;
        };

        vm.isWeekend = function (day) {
          var d = day.day();
          return d === 6 || d === 0;
        };

        vm.isWeekendByIndex = function (index) {
          return vm.isWeekend(moment(vm.month.from).add(index - 1, 'd'));
        };

        vm.isGroupRow = function (row) {
          if (row[0] !== null && _.every(row, function (item, index) {
              return index === 0 || item === '';
            })) {
            return true;
          }
          return false;
        };

        function init() {
          vm.dayList = vm.daysInMonthList();
        }

        $scope.$watch(function() {
          return vm.data;
        }, function (newValue) {
          if (!newValue) {
            return;
          }
          init();
        }, true);
      },
      link: function ($scope, $element) {
        var headerTable = {};
        var sideTable = {};
        var tableContainer = {};

        function onScroll(event) {
          $window.requestAnimationFrame(function () {
            headerTable.css('transform', 'translateX(' + (event.currentTarget.scrollLeft * -1) + 'px)');
            sideTable.css('transform', 'translateY(' + (event.currentTarget.scrollTop * -1) + 'px)');
          });
        }

        function rowHover(source, target) {
          function findRow(element) {
            return $(target.find('tbody > tr').get($(element).index()));
          }

          source.find('tr').hover(function () {
            $(this).addClass('hover');
            findRow(this).addClass('hover');
          }, function () {
            $(this).removeClass('hover');
            findRow(this).removeClass('hover');
          });
        }

        function init() {
          headerTable = $('#nocbeo-table-header-container > table');
          sideTable = $('#nocbeo-table-side-container > table');
          tableContainer = $element.find('#nocbeo-table-data-container');
          tableContainer.scroll(onScroll);

          rowHover(tableContainer, sideTable);
          rowHover(sideTable, tableContainer);
        }

        $timeout(init, 1000);
      }
    };
  }
})();
