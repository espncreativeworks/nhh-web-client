'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:ThanksCtrl
 * @description
 * # ThanksCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('ThanksCtrl', ['$scope', 'Page', 'Sweepstakes', 'Votes', 'Links', 'Auth', 'Users', '$moment', 'fullNameFilter', '$window', '$location', function ($scope, Page, Sweepstakes, Votes, Links, Auth, Users, $moment, fullName, $window, $location) {
    Page.meta.reset();
    Page.meta.set('title', 'Thanks For Voting');
    Page.body.set('class', 'info thanks');

    Sweepstakes.status().then(function (status){
      $scope.eligibility = status.eligibility;
    });

    Votes.last().then(function (vote){
      var cacheBust = $moment().dayOfYear() + '' + $moment().hour(); // default cache for vote sharing to 1 hour
      var baseUrl = $location.protocol() + '://' + $window.location.host + $window.location.pathname;
      $scope.votedFor = vote.athlete;
      $scope.shareUrl = baseUrl + '#!/share-vote/' + vote.athlete._id;
      $scope.fb = {};
      $scope.fb.url = $scope.shareUrl + '?utm_source=espncreativeworks&utm_medium=social&utm_content=facebook&utm_campaign=share_vote&_=' + cacheBust;
      $scope.tweet = {};
      $scope.tweet.url = $scope.shareUrl + '?utm_source=espncreativeworks&utm_medium=social&utm_content=twitter&utm_campaign=share_vote&_=' + cacheBust;
      $scope.tweet.text = 'I just voted for ' + fullName(vote.athlete.name) + ' to be the next Heisman Trophy Winner!';
      $scope.tweet.hashtags = 'HeismanHouse';
      $scope.tweet.related = 'NissanUSA,ESPNPromotions';
      return Links.shorten($scope.fb.url);
    }).then(function (fbUrlData){
      $scope.fb.url = fbUrlData.url;
      return Links.shorten($scope.tweet.url);
    }).then(function (tweetUrlData){
      $scope.tweet.url = tweetUrlData.url;
    });

    $scope.auth = {};
    $scope.auth.globalReg = Auth.globalReg;
    Auth.status().then(function (status){
      $scope.auth.loggedIn = status.loggedIn;
    }, function (){
      $scope.auth.loggedIn = false;
    });

  }]);
