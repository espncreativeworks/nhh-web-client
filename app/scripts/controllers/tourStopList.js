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
    var now = $moment();
    var desc = '' +
      'Nissan and ESPN invite fans to "Get to know the Heisman Winners" during a ' +
      'pre-game experience that celebrates college football\'s most outstanding players. ' +
      'The Nissan Heisman House Tour is making stops at 10 marquee matchups this ' +
      'season including its ultimate destination of Arlington for the College Football Playoff National Championship. ' +
      'Admission to the tour is free! Come join us for fun interactives to win prizes and ' +
      'the opportunity to meet former Heisman winners.';

    var keywords = 'nissan heisman house tour, espn heisman tour';

    Page.meta.set('title', 'Heisman House Tour');
    Page.meta.set('description', desc);
    Page.meta.set('keywords', keywords);
    Page.body.set('class', 'info tour');
    $scope.overview = 'Loading...';
    TourStops.all().then(function (stops){
      stops = stops.sort(function (a,b){
        return a.stopNumber - b.stopNumber;
      });
      $scope.stops = stops;
      $scope.overview = desc;
      angular.forEach($scope.stops, function (stop){
        // server TZ is UTC; force date to be displayed in local TZ equivalent
        var viewMoreBtn = $('<a>', { 'class': 'btn-link btn-link-nhh hidden-xs no-decoration', 'href': '#!/tour-stops/' + stop.slug, 'title': 'View More' }).html('View More ');
        var iconHtml = $('<i>', { 'class': 'fa fa-angle-double-right' });
        viewMoreBtn.append(iconHtml);
        var _summary = $(stop.summary).append(' ').append(viewMoreBtn);
        stop.stopDateMoment = $moment.tz($moment(stop.stopDate).endOf('day'), 'Europe/London');
        stop.stopDate = $moment.tz($moment(stop.stopDate).endOf('day'), 'Europe/London').format('MMM D, YYYY');
        stop.summaryHtml = $sce.trustAsHtml(_summary.html());
        // iconHtml = $('<i>', { 'class': 'fa fa-info-circle' });
        // var _site = $(stop.site).prepend(' ').prepend(iconHtml);
        stop.siteHtml = $sce.trustAsHtml(stop.site);
        stop.shouldShowSite = $(stop.site).text() && now.isBefore(stop.stopDateMoment);
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
