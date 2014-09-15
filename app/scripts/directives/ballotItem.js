'use strict';

/**
 * @ngdoc directive
 * @name nhhApp.directive:ballotItem
 * @description
 * # ballotItem
 */
angular.module('nhhApp')
  .directive('ballotItem', function () {
    return {
      templateUrl: 'partials/ballot_item',
      restrict: 'E',
      replace: true,
      link: function postLink() {
        //element.text('this is the ballotItem directive');
      }
    };
  });
