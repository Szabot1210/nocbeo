(function () {
  'use strict';

  angular
    .module('nocbeo-ui')
    .directive('assetPlaceholder', placeholderDirective);

  /*
   * @ngInject
   */
  function placeholderDirective (_) {
    return {
      restrict: 'EA',
      scope: {
        htmlString: '=',
        text: '='
      },
      templateUrl: 'app/ui/ui.placeholder.html',
      link: function postLink (scope) {
        scope.realTexts = {};

        scope.$watch('htmlString', function (newVal) {
          if (newVal) {
            scope.text = scope.htmlString;
            scope.placeholders = newVal.match(/\{\d+\}/g);
          }
        });

        scope.$watch('realTexts', function () {
          var values = _.values(scope.realTexts);
          scope.text = formatString(scope.htmlString, _.filter(values, Boolean));
        }, true);

        function formatString (string, values) {
          if (string) {
            return string.replace(/{(\d+)}/g, function (match, number) {
              return typeof values[number] !== 'undefined' ? values[number] : match;
            });
          }
        }
      }
    };
  }

})();
