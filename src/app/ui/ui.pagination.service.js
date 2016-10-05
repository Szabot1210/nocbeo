(function () {
  'use strict';

  angular
    .module('nocbeo-ui')
    .factory('paginationHelper', paginationHelperService);

  /*
   * @ngInject
   */
  function paginationHelperService (PAGE_SIZE, $location, $q) {
    var defaults = function(total, page, pageSize) {
      return {
        total: total || 0,
        limit: pageSize || PAGE_SIZE,
        page: page || $location.search().page || 1
      };
    };

    function create(onChange, count, page, pageSize) {
      return $q(function(resolve, reject) {
        count().then(function(results) {
          var pagination = new defaults(results.data.count, page, pageSize);
          pagination.onChange = function() {
            $location.search('page', this.page);
            count().then(function(results) {
              pagination.total = results.data.count;
            });
            return onChange();
          };
          if (pagination.page > 1) {
            onChange(pagination.page, pagination.limit);
          }
          return resolve(pagination);
        }, reject);
      });

    }

    // Interface
    return {
      create: create
    };
  }

})();
