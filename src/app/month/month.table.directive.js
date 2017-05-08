(function () {
  'use strict';

  angular
    .module('nocbeo-month')
    .directive('monthTable', monthTableDirective);

  /*
   * @ngInject
   */
  function monthTableDirective(_, $timeout, $window, moment, $, monthHelper) {
    return {
      restrict: 'E',
      bindToController: {
        month: '=',
        meta: '=',
        data: '=',
        showPast: '=?'
      },
      templateUrl: 'app/month/month.table.directive.html',
      controllerAs: 'ctrl',
      controller: function ($scope) {
        var vm = this;
        vm.dayList = [];
        vm.filteredData = [];
        vm.meta = {};
        vm.todayIndex = -1; //new Date().getDate();
        vm.isCurrent = false;

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
          days = [
            moment(date).add(-3, 'days'),
            moment(date).add(-2, 'days'),
            moment(date).add(-1, 'days')
          ];
          _.times(vm.daysInMonth() + 3, function () {
            days.push(moment(date));
            date = date.add(1, 'days');
          });
          return days;
        };

        function isCell(options, item) {
          item = item.toUpperCase();
          return _.some(options, function (option) {
            return _.startsWith(item, option);
          });
        }

        vm.cellColor = function (item) {
          if (isCell(['F', 'G22', 'G194'], item)) {
            return 'blue-text';
          }
          if (isCell(['G'], item)) {
            return 'brown';
          }
          if (isCell(['BK'], item)) {
            return 'orange';
          }
          if (isCell(['S', 'TSZ', 'RSZ', 'SZ'], item)) {
            return 'yellow';
          }
          if (isCell(['K24'], item)) {
            return 'dark-blue';
          }
          if (isCell(['K'], item)) {
            return 'blue';
          }
          if (isCell(['B'], item)) {
            return 'green';
          }
        };

        vm.isWeekend = function (day) {
          var d = day.day();
          return d === 6 || d === 0;
        };

        vm.isWeekendByIndex = function (index) {
          return vm.isWeekend(moment(vm.month.from).add(index - 3, 'd'));
        };

        vm.isGroupRow = function (row) {
          if (row[0] !== null && _.every(row, function (item, index) {
              return index === 0 || item === '';
            })) {
            return true;
          }
          return false;
        };

        vm.isOtherMonth = function(day) {
          return moment(day).isBefore(vm.month.from) || moment(moment(vm.month.from).add(1, 'M').add(-1, 'h')).isBefore(day);
        };

        vm.resetData = function () {
          vm.filteredData = vm.data;
        };

        vm.selectGroup = function ($index) {
          if (vm.data.length !== vm.filteredData.length) {
            return vm.resetData();
          }

          var selectedgGroupData = vm.data.slice($index, vm.data.length);
          var lastGroupMember = _.findIndex(selectedgGroupData.slice(1, vm.data.length), function (row) {
            return row.length <= 3;
          });
          vm.filteredData = selectedgGroupData.slice(0, lastGroupMember + 1);
        };

        vm.selectRow = function($index) {
          if (vm.filteredData.length === 1) {
            return vm.resetData();
          }

          if(!vm.data[$index]) {
            return;
          }

          vm.filteredData = [vm.data[$index]];
        };

        function init() {
          vm.filteredData = vm.data;
          vm.dayList = vm.daysInMonthList();
          vm.isCurrent = monthHelper.isCurrent(vm.month);
          if (vm.isCurrent) {
            vm.todayIndex = new Date().getDate();
          }
        }

        $scope.$watch(function () {
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
