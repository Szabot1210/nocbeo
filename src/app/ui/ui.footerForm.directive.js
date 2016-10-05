(function () {
  'use strict';

  angular
    .module('nocbeo-ui')
    .directive('footerForm', footerFormDirective);

  /*
   * @ngInject
   */
  function footerFormDirective () {
    return {
      replace: true,
      restrict: 'E',
      scope: {
        title: '@',
        submit: '&'
      },
      transclude: true,
      templateUrl: 'app/ui/ui.footerForm.html'
    };
  }

})();
