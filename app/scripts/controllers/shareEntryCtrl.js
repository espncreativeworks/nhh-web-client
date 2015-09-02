'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:ShareEntryCtrl
 * @description
 * # ShareEntryCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('ShareEntryCtrl', ['$scope', '$routeParams', '$location', 'Page', 'Auth', 'Sweepstakes', '$moment', function ($scope, $routeParams, $location, Page, Auth, Sweepstakes, $moment) {
    Page.meta.reset();

    var gender = $location.search().gender || 'M'; // 80% of traffic to the site is male and ESPN registration only offers two gender options, so defaulting to 'M'
    var now = $moment();

    $scope.firstName = $location.search().firstName || '';
    $scope.pronoun = (gender === 'M' ? 'himself' : 'herself');

    // console.log("ShareEntryCtrl $scope.firstName: " + $scope.firstName);
    // console.log("ShareEntryCtrl $scope.pronoun: " + $scope.pronoun);

    Sweepstakes.status().then(function (sweepsStatus){
      //console.log("share entry ctrl sweepsStatus: ", sweepsStatus);
      if (sweepsStatus.entry === false) {
        $scope.eligibility = true;
      } else {
        var currentDate = now.format("MM-DD-YYYY");
        var lastEntry = $moment(sweepsStatus.entry).format("MM-DD-YYYY");

        // console.log("currentDate: " + currentDate + " / lastEntry: " + lastEntry);

        if ($moment(currentDate).isSame(lastEntry) === true) {
          $scope.eligibility = false;
        } else {
          $scope.eligibility = true;
        }
      }

      // console.log("share entry $scope.eligibility: ", $scope.eligibility);
    }, function (){
      deferred.reject({
        eligibility: false,
        to: '/error'
      });
    });

    var title = $scope.firstName + ' just entered to win a trip for ' + $scope.pronoun + ' and three friends to the 2016 College Football Playoff National Championship in Glendale, Arizona!';
    var description = 'Join ' + $scope.firstName + ' and visit the Nissan Heisman House to enter for your chance to win!';

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
    Page.meta.set('title', title);
    Page.meta.set('description', description);
    Page.meta.set('twitter', twitterMeta);
    Page.meta.set('facebook', facebookMeta);
    Page.body.set('class', 'info share');

  }]);
