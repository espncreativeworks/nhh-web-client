'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('HeaderCtrl', ['$scope', '$location', 'Votes', '$moment', 'fullNameFilter', 'Auth', function ($scope, $location, Votes, $moment, fullName, Auth) {
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
