'use strict';

/**
 * @ngdoc directive
 * @name nhhApp.directive:nhhShare
 * @description
 * # nhhShare
 */
angular.module('nhhApp')
  .directive('nhhShare', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element) {
        element.text('this is the nhhShare directive');
      }
    };
  });
