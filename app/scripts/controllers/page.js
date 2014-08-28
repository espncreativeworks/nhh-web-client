'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:PageCtrl
 * @description
 * # PageCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('PageCtrl', ['$scope', 'Page', function ($scope, Page) {
    $scope.meta = Page.meta.data;
    $scope.body = Page.body.data;
  }]);
