(function () {
  'use strict';

  angular
    .module('nocbeo')

    .constant('csvConfig', {
      dir: 'data/',
      indexFile: 'index.csv',
      dateFormat: 'YYYY/MM/DD'
    })

    .constant('toastrOptions', {
      closeButton: true,
      debug: false,
      progressBar: true,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      onclick: null,
      showDuration: 400,
      hideDuration: 1000,
      timeOut: 7000,
      extendedTimeOut: 1000,
      showEasing: 'swing',
      hideEasing: 'linear',
      showMethod: 'fadeIn',
      hideMethod: 'fadeOut'
    })
})();
