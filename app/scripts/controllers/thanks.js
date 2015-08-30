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

    Auth.status().then(function (status){
      console.log("auth status: ", status);
      if (status.loggedIn){
        $scope.loggedin = true
      } else {
        $scope.loggedin = false
      }
      console.log("$scope.loggedin: ", $scope.loggedin);
    }, function (){
      deferred.reject({
        loggedIn: false,
        to: '/confirm'
      });
    });

    $scope.loginClick = function() {
      console.log("angular clicked on .disneyid-login");
      var modalPromise = $window.did.launchLogin();
      modalPromise.then(function (){
        console.group('DID#launchLogin>resolved');
        Array.prototype.slice.call(arguments).forEach(function (arg){
            console.info(arg);
        });
        console.groupEnd('DID#launchLogin>resolved');
      });
      modalPromise.fail(function (){
        console.group('DID#launchLogin>rejected');
        Array.prototype.slice.call(arguments).forEach(function (arg){
            console.error(arg);
        });
        console.groupEnd('DID#launchLogin>rejected');
      });
    }

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

    var _appRedirectPath = '/confirm' // use for inline login
      , _appRedirectUrl = $location.protocol() + '://' + $location.host() + window.location.pathname + '#!' + _appRedirectPath;

    $scope.auth = {};
    $scope.auth.globalReg = angular.extend({}, Auth.globalReg, { appRedirect: _appRedirectUrl, appRedirectPath: encodeURIComponent(_appRedirectPath) });
    Auth.status().then(function (status){
      $scope.auth.loggedIn = status.loggedIn;
    }, function (){
      $scope.auth.loggedIn = false;
    });

  }]);
