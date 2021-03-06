'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:TourStopVideoDetailCtrl
 * @description
 * # TourStopVideoDetailCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('TourStopVideoDetailCtrl', ['$scope', 'Page', 'TourStops', '$sce', '$routeParams', function ($scope,  Page, TourStops, $sce, $routeParams) {

    TourStops.get($routeParams.stopId).then(function (stop){
      $scope.stop = stop;

      Page.meta.set('description', stop.pageDescription);
      Page.meta.set('keywords', stop.keywords);
      Page.body.set('class', 'info tour-video video detail');

      angular.forEach($scope.stop.videos, function (video){
        if (video.youtubeId === $routeParams.videoId || video._id === $routeParams.videoId){
          $scope.video = video;
          Page.meta.set('title', 'Video ' + ($scope.video.name || $scope.video.title || $scope.video.meta.title) + ' - ' + $scope.stop.pageTitle + ' | Nissan Heisman House Tour', { suffix: false });
        }
      });

    });

  }]);
