(function () {
  'use strict';

  angular
    .module('nocbeo-ui')
    .factory('uiConfirm', uiConfirmFactory);

  /*
   * @ngInject
   */
  function uiConfirmFactory ($uibModal) {

    /*
     * @method create
     * @param {Object} options
     */
    function create (options) {
      options = options || {
        title: 'Confirm?',
        message: 'Please confirm the action'
      };

      var modalInstance = $uibModal.open({
        templateUrl: 'app/ui/ui.modal.confirm.html',
        controller: 'UIModalConfirmCtrl',
        controllerAs: 'modalConfirm',
        size: 'sm',
        resolve: {
          title: function () {
            return options.title;
          },
          message: function () {
            return options.message;
          }
        }
      });

      return modalInstance.result;
    }

    return create;
  }

})();
