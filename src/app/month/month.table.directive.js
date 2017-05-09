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
            return !row.data;
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
          vm.header = _.find(vm.data, {type: 'data'}).data;
          vm.meta = _.find(vm.data, {type: 'meta'});
          vm.filteredData = vm.data;
          vm.isCurrent = monthHelper.isCurrent(vm.month);
          if (vm.isCurrent) {
            vm.todayIndex = new Date().getDate();
          }
          console.debug('TableDirective.init() finished');
        }

        $scope.$watchCollection(function () {
          return vm.data;
        }, function (newValue, oldValue) {
          if (!newValue) {
            return;
          }

          init();
        });
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
