(function () {
  'use strict';

  angular
    .module('nocbeo-ui')
    .directive('panel', panelDirective);

  /*
   * @ngInject
   */
  function panelDirective () {
    return {
      replace: true,
      restrict: 'E',
      scope: {
        collapsible: '=?',
        open: '=?',
        hasFooter: '=?',
        noContent: '=?',
        heading: '='
      },
      transclude: true,
      templateUrl: 'app/ui/ui.panel.html',
      controller: function ($scope) {
        $scope.toggle = function () {
          $scope.open = !$scope.open;
        };
        if (!$scope.open) {
          $scope.open = false;
        }
      }
    };
  }

})();
