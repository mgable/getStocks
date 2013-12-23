'use strict';

angular.module('getStocksApp')
  .directive('focus', function () {
    return {
      link: function postLink(scope, element, attrs) {
        element[0].focus();
      }
    };
  });
