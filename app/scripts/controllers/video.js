'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:VideoCtrl
 * @description
 * # VideoCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('VideoCtrl', ['$scope', '$routeParams', '$location', '$sce', 'Page', 'Videos', function ($scope, $routeParams, $location, $sce, Page, Videos) {
    Videos.get($routeParams.id).then(function (video){
      Page.meta.set('title', video.name);
      Page.meta.set('description', video.description);
      Page.body.set('class', 'video info detail');
      $scope.video = video;
    }).catch(function(){
      $location.path('/');
    });

  }]);
