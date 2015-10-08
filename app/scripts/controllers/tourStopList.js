'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:TourStopListCtrl
 * @description
 * # TourStopListCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('TourStopListCtrl', ['$scope', '$location', 'Page', 'TourStops', '$sce', '$moment', 'jQuery', function ($scope, $location, Page, TourStops, $sce, $moment, $) {
    var now = $moment();
    var title = 'Heisman House Tour';
    var description = '' +
      'Nissan and ESPN invite fans to "Get to know the Heisman Winners" during a ' +
      'pre-game experience that celebrates college football\'s most outstanding players. ' +
      'The Nissan Heisman House Tour is making stops at 11 marquee matchups this ' +
      'season including its ultimate destination of Glendale for the College Football Playoff National Championship. ' +
      'Admission to the tour is free! Come join us for fun interactives to win prizes and ' +
      'the opportunity to meet former Heisman winners.';

    var keywords = 'nissan heisman house tour, espn heisman tour';

    Page.meta.set('title', title);
    Page.meta.set('description', description);
    Page.meta.set('keywords', keywords);
    Page.body.set('class', 'info tour');

    var twitterMeta = {
      'twitter:title': title,
      'twitter:description': description
    };

    var facebookMeta = {
      'og:title': title,
      'og:description': description
    };

    twitterMeta = angular.extend({}, Page.meta.get('twitter'), twitterMeta);
    facebookMeta = angular.extend({}, Page.meta.get('facebook'), facebookMeta);
    Page.meta.set('twitter', twitterMeta);
    Page.meta.set('facebook', facebookMeta);

    var pastStops = [];
    var futureStops = [];

    $scope.overview = 'Loading...';
    TourStops.all().then(function (stops){
      angular.forEach(stops, function (stop){
        if (stop.isPast) {
          pastStops.push(stop);
        } else {
          futureStops.push(stop);
        }
      });

      // console.log("list of past stops: ", pastStops);
      // console.log("list of future stops: ", futureStops);

      var pstops = pastStops.sort(function(a,b){
        return a.stopNumber - b.stopNumber;
      });
      var fstops = futureStops.sort(function(a,b){
        return a.stopNumber - b.stopNumber;
      });

      var newStops = fstops.concat(pstops);
      stops = newStops;
      // stops = stops.sort(function (a,b){
      //   return a.stopNumber - b.stopNumber;
      // });

      $scope.stops = stops;

      // console.log("new ordered: ", $scope.stops); 

      $scope.overview = description;
      angular.forEach($scope.stops, function (stop){
        stop.hostList = [];
        stop.guestList = [];
        stop.hostExists = true;
        stop.guestExists = true;
        stop.tbd = false;

        var viewMoreBtn = $('<a>', { 'class': 'btn-link btn-link-nhh hidden-xs no-decoration', 'href': '#!/tour-stops/' + stop.slug, 'title': 'View More' }).html('View More ');
        var iconHtml = $('<i>', { 'class': 'fa fa-angle-double-right' });
        viewMoreBtn.append(iconHtml);
        var _summary = $(stop.summary).append(' ').append(viewMoreBtn);

        stop.stopDateMoment = $moment(stop.beginsAt).tz(stop.timezone.name);
        stop.stopDateIso = stop.stopDateMoment.format('YYYY-MM-DD');
        stop.stopDate = stop.stopDateMoment.format('MMM D, YYYY');

        if (stop.isFinal == true) {
          stop.stopTimeStart = $moment(stop.beginsAt).tz(stop.timezone.name).format("hh:mm A");
          stop.stopTimeEnd = $moment(stop.endsAt).tz(stop.timezone.name).format("hh:mm A");
        } else {
          stop.tbd = true;
        }

        angular.forEach(stop.hosts, function(host){
          stop.hostList.push(host.name.first + " " + host.name.last);
        });
        angular.forEach(stop.guests, function(guest){
          stop.guestList.push(guest.name.first + " " + guest.name.last);
        });

        if (stop.hostList.length === 0) {
          stop.hostExists = false;
        }
        if (stop.guestList.length === 0) {
          stop.guestExists = false;
        }

        // console.log("hosts: " + stop.hostList + " , length: " + stop.hostList.length + ", exist: " + stop.hostExists);
        // console.log("guests: " + stop.guestList + " , length: " + stop.guestList.length + ", exist: " + stop.guestExists);

        stop.summaryHtml = $sce.trustAsHtml(_summary.html());
        stop.absUrl = $location.protocol() + '://' + $location.host() + window.location.pathname + '#!/tour-stops/' + stop.slug;
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

        // console.log("all stop info: ", stop); 
      });
    });

  }]);
