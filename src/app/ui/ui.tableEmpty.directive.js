(function () {
  'use strict';

  angular
    .module('nocbeo-ui')
    .directive('tableEmpty', tableEmptyDirective);

  /*
   * @ngInject
   */
  function tableEmptyDirective () {
    return {
      restrict: 'A',
      replace: true,
      scope: {
        cols: '=',
        entities: '='
      },
      templateUrl: 'app/ui/ui.tableEmpty.html',
      link: function($scope, element) {
        function setVisibility() {
          element.hide();
          if (!$scope.entities || $scope.entities.length === 0) {
            element.show();
          }
        }
        setVisibility();
        $scope.$watch('entities', setVisibility);
      }
    };
  }

})();
