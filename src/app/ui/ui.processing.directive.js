(function () {
  'use strict';

  angular
    .module('nocbeo-ui')
    .directive('processing', processingDirective);

  /*
   * @ngInject
   */
  function processingDirective () {
    return {
      replace: true,
      restrict: 'E',
      template: '<span class="saving">{{ \'PROCESSING\' | translate }}<span>.</span><span>.</span><span>.</span></span>'
    };
  }

})();
