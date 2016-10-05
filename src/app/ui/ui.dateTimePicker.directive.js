(function () {
  'use strict';

  angular
    .module('nocbeo-ui')
    .directive('uiDateTimePicker', dateTimePickerDirective);

  /*
   * @ngInject
   */
  function dateTimePickerDirective() {
    return {
      restrict: 'E',
      scope: {
        value: '=',
        required: '=?'
      },
      templateUrl: 'app/ui/ui.dateTimePicker.html',
      controller: function($scope) {
        $scope.status = {
          isOpen: false
        };
        $scope.close = function() {
          $scope.status.isOpen = false;
        };
      }
    };
  }

})();
