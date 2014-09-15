'use strict';

/**
 * @ngdoc directive
 * @name nhhApp.directive:nhhBack
 * @description
 * # nhhBack
 */
angular.module('nhhApp')
  .directive('nhhBack', ['$window', 'Page', function ($window, Page) {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
        element.on('click', '#back-toggle', function (){
          element.attr('disabled', true);
          Page.body.reset();
          $window.history.back();
        });
      }
    };
  }]);
