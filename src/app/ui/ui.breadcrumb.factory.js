(function () {
  'use strict';

  angular
    .module('nocbeo-ui')
    .factory('breadcrumb', breadcrumbFactory);

  /*
   * @ngInject
   */
  function breadcrumbFactory ($rootScope, $state, $translate) {
    var service = {
      list: [],
      title: ''
    };

    function generate() {
      service.list = [];
      generateBreadcrumbs($state.$current);
      generateTitle();
      $rootScope.$broadcast('breadcrumbs:updated', service.list);
    }

    function addBreadcrumb(title, state) {
      service.list.push({
        title: title,
        state: state
      });
    }

    function generateBreadcrumbs(state) {
      if (angular.isDefined(state.parentOverride)) {
        generateBreadcrumbs($state.get(state.parentOverride));
        if (angular.isDefined(state.title)) {
          addBreadcrumb(state.title, state.name);
        }
      } else if (angular.isDefined(state.parent)) {
        generateBreadcrumbs($state.get(state.parent));
        if (angular.isDefined(state.title)) {
          addBreadcrumb(state.title, state.name);
        }
      } else if (angular.isDefined(state.title)) {
        addBreadcrumb(state.title, state.name);
      }
    }

    function appendTitle(translation, index) {
      var title = translation;

      if (index < service.list.length - 1) {
        title += ' > ';
      }

      return title;
    }

    function generateTitle() {
      service.title = '';

      angular.forEach(service.list, function(breadcrumb, index) {
        $translate(breadcrumb.title).then(
          function(translation) {
            service.title += appendTitle(translation, index);
          }, function(translation) {
            service.title += appendTitle(translation, index);
          }
        );
      });
    }

    service.init = function() {
      $rootScope.$on('$stateChangeSuccess', function() {
        generate();
      });
      generate();
    };

    return service;
  }

})();
