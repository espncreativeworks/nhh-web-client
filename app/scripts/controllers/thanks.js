'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:ThanksCtrl
 * @description
 * # ThanksCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('ThanksCtrl', ['$scope', 'Page', 'Sweepstakes', function ($scope, Page, Sweepstakes) {
    Page.meta.reset();
    Page.meta.set('title', 'Thanks!');
    Page.body.set('class', 'info thanks');

    Sweepstakes.status().then(function (status){
      $scope.eligibility = status.eligibility;
    });
  }]);
