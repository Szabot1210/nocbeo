(function () {
  'use strict';

  angular
    .module('nocbeo-ui')
    .filter('mongoCreateDate', mongoCreateDateFilter);

  /*
   * @ngInject
   */
  function mongoCreateDateFilter () {
    return function(input) {
      var timestamp = input._id.toString().substring(0,8);
      return new Date(parseInt(timestamp, 16) * 1000);
    };
  }

})();
