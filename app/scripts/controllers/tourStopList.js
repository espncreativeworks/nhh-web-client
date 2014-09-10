'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:TourStopListCtrl
 * @description
 * # TourStopListCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('TourStopListCtrl', ['$scope', 'Page', 'TourStops', '$sce', '$moment', function ($scope,  Page, TourStops, $sce, $moment) {
    var desc = '' +
      'Nissan and ESPN invite fans to "Get to know the Heisman Winners" during a ' +
      'pre-game experience that celebrates college football\'s most outstanding players. ' +
      'The Nissan Heisman House Tour is making stop at 10 marquee matchups this season ' +
      'including every playoff championship game. ' +
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
      $scope.stops.sort(function (a,b){
        return a.stopNumber - b.stopNumber;
      });
      angular.forEach($scope.stops, function (stop){
        // server TZ is UTC; force date to be displayed in local TZ equivalent 
        stop.stopDate = $moment.tz($moment(stop.stopDate).endOf('day'), 'Europe/London').format('MMM D, YYYY');
        stop.summaryHtml = $sce.trustAsHtml(stop.summary);
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
