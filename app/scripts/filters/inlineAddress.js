'use strict';

/**
 * @ngdoc filter
 * @name nhhApp.filter:inlineAddress
 * @function
 * @description
 * # inlineAddress
 * Filter in the nhhApp.
 */
angular.module('nhhApp')
  .filter('inlineAddress', function () {
    return function (address) {
      var _address = address.street1 || 'N/A';
      if (address.street2) {
        _address += ' ' + address.street2;
      }
      if (address.street3) {
        _address += ' ' + address.street3;
      }
      if (address.city && address.state && address.postcode){
        _address += ', ' + address.city + ', ' + address.state + ' ' + address.postcode;
      }
      return _address;
    };
  });
