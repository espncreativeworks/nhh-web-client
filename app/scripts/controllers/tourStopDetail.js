'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:TourStopDetailCtrl
 * @description
 * # TourStopDetailCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('TourStopDetailCtrl', ['$scope', 'Page', 'TourStops', '$sce', '$moment', '$routeParams', function ($scope,  Page, TourStops, $sce, $moment, $routeParams) {
    var now = $moment();
    TourStops.get($routeParams.id).then(function (stop){
      $scope.stop = stop;

      Page.meta.set('title', stop.pageTitle + ' | Nissan Heisman House Tour');
      Page.meta.set('description', stop.pageDescription);
      Page.meta.set('keywords', stop.keywords);
      Page.body.set('class', 'info tour detail');
      //Page.body.set('backgroundImage', $sce.trustAsResourceUrl(stop.heroImage.secure_url));

      $scope.stop.stopDateMoment = $moment.tz($moment(stop.stopDate).endOf('day'), 'Europe/London');
      $scope.stop.stopDateFormatted = $scope.stop.stopDateMoment.format('MMM D, YYYY');
      $scope.stop.stopDateFromNow = $scope.stop.stopDateMoment.from(now);
      $scope.stop.stopDateCalendar = $scope.stop.stopDateMoment.calendar(now);
      $scope.stop.stopUpdatedAtMoment = $moment.tz($moment(stop.updatedAt), 'Europe/London');
      $scope.stop.stopUpdatedAtFromNow = $scope.stop.stopUpdatedAtMoment.from(now)
      $scope.stop.siteHtml = $sce.trustAsHtml(stop.site);
      $scope.stop.summaryHtml = $sce.trustAsHtml(stop.summary);
      $scope.stop.recapHtml = $sce.trustAsHtml(stop.recap);

      angular.forEach($scope.stop.gallery, function (photo){
        photo.trustedUrl = $sce.trustAsResourceUrl(photo.secure_url);
      });

      angular.forEach($scope.stop.videos, function (video){
        video.trustedThumbnailUrl = $sce.trustAsResourceUrl(video.thumbnailUrl);
      });

      $scope.stop.map = {
        center: {
          latitude: stop.venue.geo[1],
          longitude: stop.venue.geo[0]
        },
        zoom: 15,
        pan: true,
        draggable: true
      };
    });

  }]);
