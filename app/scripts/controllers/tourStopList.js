'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:TourStopListCtrl
 * @description
 * # TourStopListCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('TourStopListCtrl', ['$scope', 'Page', 'TourStops', '$sce', function ($scope,  Page, TourStops, $sce) {
    var desc = '' +
      'Nissan and ESPN invite fans to "Get to know the Heismans" during a ' +
      'pre-game experience that celebrates college football\'s most outstanding players. ' +
      'The Nissan Heisman House Tour is making stop at 10 marquee matchups this season ' +
      'including its ultimate destination of Pasadena for the 2014 National Championship Game. ' +
      'Admission to the tour is free! Come join us for fun interactives to win prizes and ' +
      'the opportunity to meet former Heisman winners.';

    var keywords = 'nissan heisman house tour, espn heisman tour';

    Page.meta.set('title', 'Heisman House Tour');
    Page.meta.set('description', desc);
    Page.meta.set('keywords', keywords);
    Page.body.set('class', 'info tour');

    TourStops.all().then(function (stops){
      $scope.stops = stops;
      $scope.overview = desc;
      angular.forEach($scope.stops, function (stop){
        stop.summaryHtml = $sce.trustAsHtml(stop.summary);
        stop.thumbnailUrl = $sce.trustAsResourceUrl(stop.thumbnailImage.secure_url);
        stop.map = {
          center: {
            latitude: stop.venue.geo[1],
            longitude: stop.venue.geo[0]
          },
          zoom: 15,
          pan: true,
          draggable: true
        };
      });
    });

  }]);
