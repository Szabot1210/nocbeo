(function () {
  'use strict';

  angular
    .module('nocbeo')
    .config(config);

  function config ($logProvider, $provide) {
    $logProvider.debugEnabled(true);

    $provide.decorator('dateFilter', function ($delegate) {
      return function () {
        var args = [].slice.apply(arguments);

        // Check if the date format argument is not provided
        if (!args[1]) {
          args[1] = 'yyyy/MM/dd HH:mm';
        }

        var value = $delegate.apply(null, args);
        return value;
      };
    });
  }
})();
