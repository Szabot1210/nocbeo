(function () {
  'use strict';

  angular
    .module('nocbeo-ui')
    .run(run);

  function run ($rootScope) {
    $rootScope.slimscrollOptions = {
      railVisible: true,
      height: 'auto'
    };
  }
})();
