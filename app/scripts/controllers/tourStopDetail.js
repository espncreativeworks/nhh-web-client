'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:TourStopDetailCtrl
 * @description
 * # TourStopDetailCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('TourStopDetailCtrl', ['$scope', 'Page', 'TourStops', '$sce', '$moment', '$routeParams', 'underscore', 'fullNameFilter', function ($scope,  Page, TourStops, $sce, $moment, $routeParams, _, fullName) {
    var now = $moment();
    TourStops.get($routeParams.id).then(function (stop){
      var title = stop.pageTitle + ' | Nissan Heisman House Tour';
      var description = stop.pageDescription;

      $scope.stop = stop;
      Page.meta.set('title', title, { suffix: false });
      Page.meta.set('description', description);
      Page.meta.set('keywords', stop.pageKeywords);
      Page.body.set('class', 'info tour detail');
      //Page.body.set('backgroundImage', $sce.trustAsResourceUrl(stop.heroImage.secure_url));

      var _stopDate = $moment(stop.stopDate).endOf('day')
        , _stopDateBegin = $moment(stop.beginsAt)
        , _stopDateEnd = $moment(stop.endsAt)
        , _stopDateYear = _stopDate.year().toString()
        , _stopDateMonth = (_stopDate.month() + 1) < 10 ? '0' + (_stopDate.month() + 1).toString() : (_stopDate.month() + 1).toString()
        , _stopDateDay = _stopDate.date() < 10 ? '0' + _stopDate.date().toString() : _stopDate.date().toString()
        , _stopDateBeginHours = _stopDateBegin.hours() < 10 ? '0' + _stopDateBegin.hours().toString() : _stopDateBegin.hours().toString()
        , _stopDateBeginMinutes = _stopDateBegin.minutes() < 10 ? '0' + _stopDateBegin.minutes().toString() : _stopDateBegin.minutes().toString()
        , _stopDateBeginSeconds = _stopDateBegin.seconds() < 10 ? '0' + _stopDateBegin.seconds().toString() : _stopDateBegin.seconds().toString()
        , _stopDateEndHours = _stopDateEnd.hours() < 10 ? '0' + _stopDateEnd.hours().toString() : _stopDateEnd.hours().toString()
        , _stopDateEndMinutes = _stopDateEnd.minutes() < 10 ? '0' + _stopDateEnd.minutes().toString() : _stopDateEnd.minutes().toString()
        , _stopDateEndSeconds = _stopDateEnd.seconds() < 10 ? '0' + _stopDateEnd.seconds().toString() : _stopDateEnd.seconds().toString()
        , _offset = $moment.tz(stop.timezone.name).format('Z')
        , _stopDateBeginString = _stopDateYear + '-' + _stopDateMonth + '-' + _stopDateDay + 'T' + _stopDateBeginHours + ':' + _stopDateBeginMinutes + ':' + _stopDateBeginSeconds + _offset
        , _stopDateEndString = _stopDateYear + '-' + _stopDateMonth + '-' + _stopDateDay + 'T' + _stopDateEndHours + ':' + _stopDateEndMinutes + ':' + _stopDateEndSeconds + _offset;

      console.group('Stop - ' + stop.title);
      console.log('Begin String: ' + _stopDateBeginString);
      console.log('End String: ' + _stopDateEndString);
      console.groupEnd();
      // server TZ is UTC; force date to be displayed in local TZ equivalent
      $scope.stop.stopDateMoment = $moment(_stopDateBeginString);
      $scope.stop.stopDateIso = stop.stopDateMoment.format('YYYY-MM-DD');
      $scope.stop.stopDateFormatted = stop.stopDateMoment.format('MMM D, YYYY');

      $scope.stop.beginsAtMoment = $moment(_stopDateBeginString).tz(stop.timezone.name);
      $scope.stop.beginsAtFormatted = $scope.stop.beginsAtMoment.format('h:mm a');

      $scope.stop.endsAtMoment = $moment(_stopDateEndString).tz(stop.timezone.name);
      $scope.stop.endsAtFormatted = $scope.stop.endsAtMoment.format('h:mm a [(]z[)]');

      $scope.stop.stopUpdatedAtMoment = $moment(stop.updatedAt).tz('America/New_York');
      $scope.stop.stopUpdatedAtFromNow = $scope.stop.stopUpdatedAtMoment.from(now);
      $scope.stop.siteHtml = $sce.trustAsHtml(stop.site);
      $scope.stop.summaryHtml = $sce.trustAsHtml(stop.summary);
      $scope.stop.recapHtml = $sce.trustAsHtml(stop.recap);

      $scope.stop.firstHostName = stop.hosts[0] ? fullName(stop.hosts[0].name) : '';
      $scope.stop.secondHostName = stop.hosts[1] ? fullName(stop.hosts[1].name) : '';

      $scope.stop.firstGuestName = stop.guests[0] ? fullName(stop.guests[0].name) : '';
      $scope.stop.secondGuestName = stop.guests[1] ? fullName(stop.guests[1].name) : '';

      angular.forEach($scope.stop.gallery, function (photo){
        photo.trustedUrl = $sce.trustAsResourceUrl(photo.secure_url);
      });

      angular.forEach($scope.stop.videos, function (video){
        video.trustedThumbnailUrl = $sce.trustAsResourceUrl(video.thumbnailUrl);
      });

      $scope.stop.attendees = _.union(stop.hosts, stop.guests);
      console.log(_.union(stop.hosts, stop.guests));

      $scope.stop.trustedHeroImageUrl = $sce.trustAsResourceUrl(stop.heroImage.secure_url);

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
