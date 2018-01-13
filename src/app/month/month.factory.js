(function () {
  'use strict';

  angular
    .module('nocbeo-month')
    .factory('monthHelper', monthHelperFactory);

  /*
   * @ngInject
   */
  function monthHelperFactory(csvHelper, $q, csvConfig, _, moment, holidays) {
    var self = {
      months: null,
      current: null
    };

    function isWeekend(day) {
      var d = day.day();
      return d === 6 || d === 0;
    }

    function isHoliday(day, holidays) {
      return _.some(holidays, function (holiday) {
        return day.dayOfYear() === holiday.day;
      });
    }

    function isCell(options, item) {
      item = item.toUpperCase();
      return _.some(options, function (option) {
        return _.startsWith(item, option);
      });
    }

    function cellColor(item) {
      if (isCell(['F', 'G22', 'G194'], item)) {
        return 'blue-text';
      }
      if (isCell(['G'], item)) {
        return 'brown';
      }
      if (isCell(['BK'], item)) {
        return 'orange';
      }
      if (isCell(['S', 'TSZ', 'RSZ', 'SZ'], item)) {
        return 'yellow';
      }
      if (isCell(['K24'], item)) {
        return 'dark-blue';
      }
      if (isCell(['K'], item)) {
        return 'blue';
      }
      if (isCell(['B'], item)) {
        return 'green';
      }
    };

    function get(csvName) {
      return $q(function (resolve, reject) {
        list().then(function (months) {
          var month = _.find(months, {dataFile: csvName});
          holidays.get(month.from.year()).then(function (holidays) {
            month.holidays = holidays;
            resolve(month);
          });

          if (!month) {
            return reject();
          }
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
          var currentMonth = _.find(months, function (month) {
            if (!moment.isMoment(month.from) || !moment.isMoment(month.to)) {
              return false;
            }
            return moment().isBetween(month.from, month.to);
          });
          resolve(currentMonth);
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
            return resolve(months[0]);
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

    function isYesterday(day) {
      return moment().subtract(1, 'days').startOf('day').isSame(day, 'd');
    }

    function buildTableData(month, rows) {
      if (!rows || !rows.length) {
        return [];
      }

      var processedRows = [];
      _.forEach(rows, function (row, index) {
        if (!_.isArray(row)) {
          return;
        }

        if (!index) {
          return processedRows.push({
            id: index,
            type: 'meta',
            month: row[0],
            label: (row[1] || '').replace('Frissítette ', ''),
            date: row[2]
          });
        }

        if (row.length < 3) {
          return processedRows.push({
            type: 'group',
            label: row[0],
            id: index
          });
        }

        var dataRow = [];
        var pastCompare = moment().add(-2, 'days');
        _.forEach(row.slice(2, row.length), function (data, index) {
          var day = month.from.clone().add(index, 'days');
          dataRow.push({
            index: index,
            yesterday: isYesterday(day),
            isPast: day.isBefore(pastCompare),
            weekend: isWeekend(day),
            holiday: isHoliday(day, month.holidays),
            label: (data || '&nbsp').replace('sarga', '&nbsp'),
            cssClass: cellColor(data),
            dayNum: day.format('D'),
            dayName: day.format('dd'),
            otherMonth: false
          });
        });
        return processedRows.push({
          type: 'data',
          id: row[0],
          user: row[1],
          data: dataRow
        });
      });
      return processedRows;
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
      data: data,
      buildTableData: buildTableData
    };
  }

})();
