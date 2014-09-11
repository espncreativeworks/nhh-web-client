'use strict';

/**
 * @ngdoc filter
 * @name nhhApp.filter:ordinalize
 * @function
 * @description
 * # ordinalize
 * Filter in the nhhApp.
 */
angular.module('nhhApp')
  .filter('ordinalize', function () {
    return function (cardinal) {
      var self = cardinal, val = Math.round(self.valueOf()), cent, dec, ordinalized = self.toString();

      cent = val % 100;
      dec = val % 10;
      if (cent - dec === 10) {
        ordinalized += 'th';
        return ordinalized;
      }

      switch (dec) {
        case 1:
          ordinalized += 'st';
          return ordinalized;
        case 2:
          ordinalized += 'nd';
          return ordinalized;
        case 3:
          ordinalized += 'rd';
          return ordinalized;
        default:
          ordinalized += 'th';
          return ordinalized;
      }
    };
  });
