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

    if ($location.search().msg === "promotion already entered in this period") {
    	$scope.title = 'Sorry';
    	$scope.message = 'You have already entered today. Please come back tomorrow for another chance to win.';
    } else {
	    $scope.title = 'Oops...';
	    $scope.message = $location.search().msg || 'An unexpected error occured.';
	}

    Page.meta.set('title', 'Error');
    Page.meta.set('description', $scope.message);
    Page.body.set('class', 'info error');
  }]);
