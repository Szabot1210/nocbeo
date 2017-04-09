(function () {
  'use strict';

  angular
    .module('nocbeo-month')
    .factory('monthHelper', monthHelperFactory);

  /*
   * @ngInject
   */
  function monthHelperFactory(csvHelper, $q, csvConfig, _, moment) {
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
          resolve(_.find(months, function (month) {
            if (!moment.isMoment(month.from) || !moment.isMoment(month.to)) {
              return false;
            }
            return moment().isBetween(month.from, month.to);
          }));
        }, reject);
      });
    }

    function isCurrent(month) {
      return moment().isBetween(month.from, month.to);
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
      isCurrent: isCurrent,
      prev: prev,
      next: next,
      data: data
    };
  }

})();
