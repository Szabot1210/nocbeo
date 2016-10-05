(function () {
  'use strict';

  angular
    .module('nocbeo-month')
    .factory('monthHelper', monthHelperFactory);

  /*
   * @ngInject
   */
  function monthHelperFactory(csvHelper, $q, csvConfig, _) {
    var self = {
      months: null,
      current: null
    };

    function get(csvName) {
      return $q(function (resolve, reject) {
        list().then(function (months) {
          var m = _.find(months, {dataFile: csvName});
          if (m) {
            return resolve(m);
          }
          reject();
        });
      });
    }

    function list() {
      return $q(function (resolve, reject) {
        if (self.months) {
          return resolve(self.months);
        }

        csvHelper.download(csvConfig.dir + csvConfig.indexFile).then(function (data) {
          self.months = [];
          data.forEach(function (row) {
            self.months.push({
              label: row[0],
              from: moment(row[1], csvConfig.dateFormat),
              to: moment(row[2], csvConfig.dateFormat),
              dataFile: row[3]
            });
          });
          resolve(self.months);
        }, reject);
      });
    }

    function current() {
      return $q(function (resolve, reject) {
        list().then(function (months) {
          //TODO
          resolve(months[0]);
        }, reject);
      });
    }

    function prev(csvName) {
      return $q(function (resolve, reject) {
        list().then(function (months) {
          var i = _.findIndex(months, {dataFile: csvName});
          if (i > 0) {
            return resolve(months[i - 1]);
          }
          reject();
        });
      });
    }

    function next(csvName) {
      return $q(function (resolve, reject) {
        list().then(function (months) {
          var i = _.findIndex(months, {dataFile: csvName});
          if (i < months.length - 1 && i > -1) {
            return resolve(months[i + 1]);
          }
          reject();
        });
      });
    }

    function data(csvName) {
      return $q(function (resolve, reject) {
        csvHelper.download(csvConfig.dir + csvName).then(resolve, reject);
      });
    }

    // Interface
    return {
      months: self.months,
      get: get,
      list: list,
      current: current,
      prev: prev,
      next: next,
      data: data
    };
  }

})();
