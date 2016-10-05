(function () {
  'use strict';

  angular
    .module('nocbeo-ui')
    .filter('conditionalIcons', conditionalIconsFilter);

  /*
   * @ngInject
   */
  function conditionalIconsFilter () {
    return function(input) {
      if (input) {
        return '<i class="fa fa-fw fa-lg fa-check green"></i>';
      } else {
        return '<i class="fa fa-fw fa-lg fa-times red"></i>';
      }
    };
  }

})();
