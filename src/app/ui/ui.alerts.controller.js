(function () {
  'use strict';

  angular
    .module('nocbeo-ui')
    .controller('AlertsCtrl', AlertsCtrl);

  /*
   * @ngInject
   */
  function AlertsCtrl (alerts) {
    var vm = this;

    vm.alerts = alerts.get();
    vm.close = closeAlert;

    /*
     * @method close
     * @param {Object} alert
     */
    function closeAlert (alert) {
      alerts.close(alert);
    }
  }

})();
