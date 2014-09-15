'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:ErrorCtrl
 * @description
 * # ErrorCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('ErrorCtrl', ['$scope', '$location', 'Page', function ($scope, $location, Page) {
    Page.meta.reset();

    $scope.title = 'Oops...';
    $scope.message = $location.search().msg || 'An unexpected error occured.';

    Page.meta.set('title', 'Error');
    Page.meta.set('description', $scope.message);
    Page.body.set('class', 'info error');
  }]);
