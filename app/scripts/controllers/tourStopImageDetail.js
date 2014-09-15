'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:TourStopImageDetailCtrl
 * @description
 * # TourStopImageDetailCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('TourStopImageDetailCtrl', ['$scope', 'Page', 'TourStops', '$sce', '$routeParams', function ($scope,  Page, TourStops, $sce, $routeParams) {

    TourStops.get($routeParams.stopId).then(function (stop){
      $scope.stop = stop;

      Page.meta.set('description', stop.pageDescription);
      Page.meta.set('keywords', stop.keywords);
      Page.body.set('class', 'info tour-image image detail');

      angular.forEach($scope.stop.gallery, function (photo){
        if (photo.public_id === $routeParams.photoId || photo._id === $routeParams.photoId){
          $scope.photo = photo;
          $scope.photo.trustedUrl = $sce.trustAsResourceUrl(photo.secure_url);
          Page.meta.set('title', 'Photo ' + photo.public_id + ' - ' + $scope.stop.pageTitle + ' | Nissan Heisman House Tour', { suffix: false });
        }
      });

    });

  }]);
