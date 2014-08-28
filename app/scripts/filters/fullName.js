'use strict';

/**
 * @ngdoc filter
 * @name nhhApp.filter:fullName
 * @function
 * @description
 * # fullName
 * Filter in the nhhApp.
 */
angular.module('nhhApp')
  .filter('fullName', function () {
    return function (name) {
      return name.first + ' ' + name.last;
    };
  });
