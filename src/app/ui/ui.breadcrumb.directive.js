(function () {
  'use strict';

  angular
    .module('nocbeo-ui')
    .directive('breadcrumb', breadcrumbDirective);

  /*
   * @ngInject
   */
  function breadcrumbDirective () {
    return {
      restrict: 'EA',
      templateUrl: 'app/ui/ui.breadcrumb.html',
      controller: function($rootScope, $scope, $state, breadcrumb) {
        $scope.breadcrumbs = [];
        $scope.title = '';
        $rootScope.$on('breadcrumbs:updated', function(event, data) {
          $scope.breadcrumbs = data;
          $scope.title = $state.$current.title;
        });
        breadcrumb.init();
      }
    };
  }

})();
