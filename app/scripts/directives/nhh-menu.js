'use strict';

/**
 * @ngdoc directive
 * @name nhhApp.directive:nhhMenu
 * @description
 * # nhhMenu
 */
angular.module('nhhApp')
  .directive('nhhMenu', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
        element.on('click', '#menu-toggle, .menu-close', function (){
          element.find('#menu-toggle').toggleClass('active');
          element.parents('body').toggleClass('body-push body-push-to-right');
          element.toggleClass('menu-open');
        });
      }
    };
  });
