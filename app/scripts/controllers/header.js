'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('HeaderCtrl', ['$scope', '$location', 'Votes', '$moment', 'fullNameFilter', 'Auth', 'Sweepstakes', function ($scope, $location, Votes, $moment, fullName, Auth, Sweepstakes) {
    var now = $moment();

    $scope.dismissed = false;
    $scope.dismiss = function (){
      $scope.dismissed = !$scope.dismissed;
    };

    $scope.isBallot = false;
    if ($location.path() === '/ballot' || $location.path() === '/write-in'){
      $scope.isBallot = true;
    }

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

    Sweepstakes.status().then(function (sStatus){
      console.log("sweeps status: ", sStatus);
      $scope.eligibility = true;
      console.log("$scope.eligibility: ", $scope.eligibility);
    }, function (){
      deferred.reject({
        eligibility: false,
        to: '/error'
      });
    });

    $scope.loginClick = function() {
      $window.location.reload(true);
      $window.location.replace('http://promo-qa.espn.go.com/espn/contests/nissan/heisman/2015/#!/confirm');
    }

    Votes.last().then(function (vote){
      console.log("header last vote: ", vote);

      var athletefn = vote.athlete.name.first + " " + vote.athlete.name.last;
      var last = $moment(vote.ts);
      var next = $moment(vote.ts).add('days', 1);
      $scope.athlete = vote.athlete;
      $scope.lastVote = last.from(now);
      $scope.nextVote = next.from(now);

      console.log("header $scope: ", $scope);
    }).catch(function (){
      $scope.lastVote = false;
    });
  }]);
