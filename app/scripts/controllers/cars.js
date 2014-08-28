'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:CarsCtrl
 * @description
 * # CarsCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('CarsCtrl', ['$scope', 'Cars', '$analytics', function ($scope, Cars, $analytics) {
    Cars.random().then(function(car){
      $scope.car = car;
      $analytics.eventTrack('Shown', {
        category: 'Cars',
        label: car.name
      });
    });
  }]);
