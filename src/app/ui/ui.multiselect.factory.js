(function () {
  'use strict';

  angular
    .module('nocbeo-ui')
    .factory('multiselectHelper', multiselectHelperFactory);

  /*
   * @ngInject
   */
  function multiselectHelperFactory ($translate, _, $q) {
    var translationKeys = [
      'CHECK_ALL',
      'UNCHECK_ALL',
      'SELECTION_COUNT',
      'SELECTION_OF',
      'SEARCH_PLACEHOLDER',
      'BUTTON_DEFAULT_TEXT',
      'DYNAMIC_BUTTON_TEXT_SUFFIX'
    ];
    var defaultOptions = {
      displayProp: 'name',
      idProp: '_id',
      enableSearch: true,
      scrollable: true,
      scrollableHeight: 400,
      buttonClasses: 'btn btn-info btn-sm',
      externalIdProp: ''
    };

    var defaults = _.partialRight(_.assign, function(value, other) {
      return _.isUndefined(value) ? other : value;
    });

    function getOptions(optionOverrides) {
      var deferred = $q.defer();
      var options = defaults(optionOverrides || {}, defaultOptions);
      $translate(translationKeys).then(function (translations) {
        options.translationTexts = {
          checkAll: translations.CHECK_ALL,
          uncheckAll: translations.UNCHECK_ALL,
          selectionCount: translations.SELECTION_COUNT,
          selectionOf: translations.SELECTION_OF,
          searchPlaceholder: translations.SEARCH_PLACEHOLDER,
          buttonDefaultText: translations.BUTTON_DEFAULT_TEXT,
          dynamicButtonTextSuffix: translations.DYNAMIC_BUTTON_TEXT_SUFFIX
        };
        deferred.resolve(options);
      });
      return deferred.promise;
    }

    // Interface
    return {
      getOptions: getOptions
    };
  }

})();
