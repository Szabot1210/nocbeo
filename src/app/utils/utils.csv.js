(function () {
  'use strict';

  angular
    .module('nocbeo-utils')
    .factory('csvHelper', csvHelperFactory);

  /*
   * @ngInject
   */
  function csvHelperFactory($document, toastr, $q, papaparse) {

    function processData(data) {
      var csv = [];
      if (!data.length) {
        return false;
      }

      var keys = Object.keys(data[0]);
      csv.push([]);
      keys.forEach(function (key) {
        csv[0].push(key);
      });

      data.forEach(function (dataItem) {
        var row = [];
        keys.forEach(function (key) {
          row.push(dataItem[key]);
        });
        csv.push(row);
      });

      return csv;
    }

    function download(filePath, header) {
      return $q(function (resolve, reject) {
        papaparse.parse(filePath, {
          download: true,
          header: header || false,
          error: function (err, file, inputElem, reason) {
            toastr.error('Failed to download: ' + filePath + ', Reason: ' + reason);
            reject(err);
          },
          complete: function (result) {
            resolve(result.data);
          }
        });
      });
    }

    function toString(data) {
      var lineArray = [];
      data.forEach(function (infoArray, index) {
        var line = infoArray.join(',');
        lineArray.push(index === 0 ? 'data:text/csv;charset=utf-8,' + line : line);
      });
      return lineArray.join('\n');
    }

    function downloadToBrowsers(data, fileName) {
      data = processData(data);
      if (!data) {
        return false;
      }
      data = toString(data);
      var encodedUri = encodeURI(data);

      var link = $document[0].createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', fileName + '.csv');
      $document[0].body.appendChild(link);
      link.click();
    }

    return {
      downloadToBrowsers: downloadToBrowsers,
      download: download
    };
  }

})();
