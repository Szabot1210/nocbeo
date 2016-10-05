(function () {
  'use strict';

  angular
    .module('nocbeo-ui')
    .filter('time', timeFilter);

  /*
   * @ngInject
   */
  function timeFilter () {
    var conversions = {
      'ss': angular.identity,
      'mm': function(value) {return value * 60;},
      'hh': function(value) {return value * 3600;}
    };

    var padding = function(value, length) {
      var zeroes = length - ('' + (value)).length;
      var pad = '';
      while (zeroes-- > 0) {
        pad += '0';
      }
      return pad + value;
    };

    return function (value, unit, format, isPadded) {
      value = Math.round(value);
      var totalSeconds = conversions[unit || 'ss'](value);
      var hh = Math.floor(totalSeconds / 3600);
      var mm = Math.floor((totalSeconds % 3600) / 60);
      var ss = totalSeconds % 60;

      format = format || 'hh:mm:ss';
      isPadded = angular.isDefined(isPadded) ? isPadded : true;
      hh = isPadded ? padding(hh, 2) : hh;
      mm = isPadded ? padding(mm, 2) : mm;
      ss = isPadded ? padding(ss, 2) : ss;

      return format.replace(/hh/, hh).replace(/mm/, mm).replace(/ss/, ss);
    };
  }

})();
