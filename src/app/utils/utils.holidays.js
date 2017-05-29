(function () {
  'use strict';

  angular
    .module('nocbeo-utils')
    .factory('holidays', holidays);

  /*
   * @ngInject
   */
  function holidays($q, $http, _) {
    return {
      get: function (year) {
        return $q(function (resolve) {
          if (!year) {
            year = new Date().getFullYear();
          }
          $http({
            method: 'GET',
            url: '/data/holidays/holidays_' + year + '.json'
          }).then(function successCallback(response) {
            resolve(_.map(_.filter(response.data, {type: 'public'}), function(holiday) {
              holiday.day = moment(holiday.date).dayOfYear();
              return holiday;
            }));
          }, function errorCallback() {
            resolve([]);
          });
        });
      }
    }
  }

})();
