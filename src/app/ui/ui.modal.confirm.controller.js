(function () {
  'use strict';

  angular
    .module('nocbeo-ui')
    .controller('UIModalConfirmCtrl', UIModalConfirmCtrl);

  /*
   * @ngInject
   */
  function UIModalConfirmCtrl ($uibModalInstance, title, message) {
    var vm = this;

    vm.title = title;
    vm.message = message;

    vm.ok = function () {
      $uibModalInstance.close(true);
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }

})();
