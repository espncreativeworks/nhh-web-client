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
      'The Nissan Heisman House Tour is making stops at 10 marquee matchups this ' +
      'season including its ultimate destination of Arlington for the College Football Playoff National Championship. ' +
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

    $scope.overview = 'Loading...';
    TourStops.all().then(function (stops){
      stops = stops.sort(function (a,b){
        return a.stopNumber - b.stopNumber;
      });
      $scope.stops = stops;
      $scope.overview = description;
      angular.forEach($scope.stops, function (stop){
        var viewMoreBtn = $('<a>', { 'class': 'btn-link btn-link-nhh hidden-xs no-decoration', 'href': '#!/tour-stops/' + stop.slug, 'title': 'View More' }).html('View More ');
        var iconHtml = $('<i>', { 'class': 'fa fa-angle-double-right' });
        viewMoreBtn.append(iconHtml);
        var _summary = $(stop.summary).append(' ').append(viewMoreBtn);

        // Perform conversion in CMS instead...
        // server TZ is UTC; force date to be displayed in local TZ equivalent
        // var _stopDate = $moment(stop.stopDate).endOf('day')
        //   , _stopDateBegin = $moment(stop.beginsAt)
        //   , _stopDateYear = _stopDate.year().toString()
        //   , _stopDateMonth = (_stopDate.month() + 1) < 10 ? '0' + (_stopDate.month() + 1).toString() : (_stopDate.month() + 1).toString()
        //   , _stopDateDay = _stopDate.date() < 10 ? '0' + _stopDate.date().toString() : _stopDate.date().toString()
        //   , _stopDateBeginHours = _stopDateBegin.hours() < 10 ? '0' + _stopDateBegin.hours().toString() : _stopDateBegin.hours().toString()
        //   , _stopDateBeginMinutes = _stopDateBegin.minutes() < 10 ? '0' + _stopDateBegin.minutes().toString() : _stopDateBegin.minutes().toString()
        //   , _stopDateBeginSeconds = _stopDateBegin.seconds() < 10 ? '0' + _stopDateBegin.seconds().toString() : _stopDateBegin.seconds().toString()
        //   , _offset = $moment.tz(stop.timezone.name).format('Z')
        //   , _stopDateString = _stopDateYear + '-' + _stopDateMonth + '-' + _stopDateDay + 'T' + _stopDateBeginHours + ':' + _stopDateBeginMinutes + ':' + _stopDateBeginSeconds + _offset;

        // server TZ is UTC; force date to be displayed in local TZ equivalent
        // console.group('Stop - ' + stop.title);
        // console.log('Date String: ' + _stopDateString);
        // console.groupEnd();

        stop.stopDateMoment = $moment(stop.beginsAt).tz(stop.timezone.name);
        stop.stopDateIso = stop.stopDateMoment.format('YYYY-MM-DD');
        stop.stopDate = stop.stopDateMoment.format('MMM D, YYYY');

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
      });
    });

  }]);
