(function () {
  'use strict';

  angular
    .module('nocbeo-ui')
    .directive('tableSort', tableSortDirective);

  /*
   * @ngInject
   */
  function tableSortDirective () {
    return {
      restrict: 'A',
      transclude: true,
      templateUrl: 'app/ui/ui.table.sort.html',
      scope: {
        orderBy: '=',
        name: '='
      },
      controller: function($scope) {
        $scope.by = '';
        $scope.reverse = false;

        $scope.onClick = function () {
          if ($scope.name === $scope.by) {
            $scope.reverse = !$scope.reverse;
          } else {
            $scope.by = $scope.name;
            $scope.reverse = false;
          }

          $scope.orderBy = ($scope.reverse ? '-' : '') + $scope.by;
        };

        $scope.$watch('orderBy', function() {
          if ($scope.orderBy) {
            if ($scope.orderBy.charAt(0) === '-') {
              $scope.reverse = true;
              $scope.by = $scope.orderBy.substring(1);
            } else {
              $scope.reverse = false;
              $scope.by = $scope.orderBy;
            }
          }
        });
      }
    };
  }
})();
