(function () {
  'use strict';

  angular
    .module('nocbeo-ui')
    .factory('alerts', alertsFactory);

  /*
   * @ngInject
   */
  function alertsFactory(toastr, _) {
    var alerts = [];

    /*
     * @method get
     * @returns {Array} alerts
     */
    function get() {
      return alerts;
    }

    /*
     * close: remove alert from array
     * @method close
     */
    function close(alertItem) {
      var index = _.findIndex(alerts, alertItem);

      alerts.splice(index, 1);
    }

    /*
     * @method create
     * @param {Object} options
     * @returns {Object} alert
     */
    function create(options) {
      switch (options.type) {
        case 'success':
        case 'info':
          toastr.success(options.content, options.title, {preventDuplicates: false});
          return;
        case 'error':
        case 'danger':
          toastr.error(options.content, options.title);
          return;
        default:
          toastr.warning(options.content, options.title);
      }
    }

    /*
     * @method creationSuccess
     * @returns {Object} alert
     */
    function creationSuccess() {
      return create({
        title: 'Success!',
        content: 'Resource created successfully.',
        type: 'info',
        duration: 3000
      });
    }

    /*
     * @method creationError
     * @returns {Object} alert
     */
    function creationError() {
      return create({
        title: 'Error!',
        content: 'Something went wrong while creating new resource.',
        type: 'danger',
        duration: 3000
      });
    }

    /*
     * @method saveSuccess
     * @returns {Object} alert
     */
    function saveSuccess() {
      return create({
        title: 'Success!',
        content: 'Changes saved successfully.',
        type: 'info',
        duration: 300000
      });
    }

    /*
     * @method saveError
     * @returns {Object} alert
     */
    function saveError() {
      return create({
        title: 'Error!',
        content: 'Failed to save changes.',
        type: 'danger',
        duration: 3000
      });
    }

    /*
     * @method removeSuccess
     * @returns {Object} alert
     */
    function removeSuccess() {
      return create({
        title: 'Success!',
        content: 'Resource removed successfully.',
        type: 'info',
        duration: 3000
      });
    }

    /*
     * @method removeError
     * @returns {Object} alert
     */
    function removeError() {
      return create({
        title: 'Error!',
        content: 'Failed to remove resource.',
        type: 'danger',
        duration: 3000
      });
    }

    /*
     * @method unauthorizedAlert
     * @returns {Object} alert
     */
    function unauthorizedAlert() {
      return create({
        title: 'Forbidden!',
        content: 'Your don\'t have permission',
        type: 'warning',
        duration: 3000
      });
    }

    /*
     * @method reportError
     * @returns {Object} alert
     */
    function reportError() {
      return create({
        title: 'Error getting the report!',
        content: 'Please check the filters and try again.',
        type: 'danger',
        duration: 5000
      });
    }

    // Interface
    return {
      get: get,
      close: close,
      create: create,

      // helpers
      creation: {
        success: creationSuccess,
        error: creationError
      },
      save: {
        success: saveSuccess,
        error: saveError
      },
      remove: {
        success: removeSuccess,
        error: removeError
      },
      unauthorized: unauthorizedAlert,
      report: {
        error: reportError
      }
    };
  }

})();
