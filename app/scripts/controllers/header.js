'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('HeaderCtrl', ['$scope', '$location', 'Votes', '$moment', function ($scope, $location, Votes, $moment) {
    var now = $moment();

    $scope.dismissed = false;
    $scope.dismiss = function (){
      $scope.dismissed = !$scope.dismissed;
    };

    $scope.isBallot = false;
    if ($location.path() === '/ballot'){
      $scope.isBallot = true;
    }

    Votes.last().then(function (vote){
      var last = $moment(vote.ts);
      var next = $moment(vote.ts).add('days', 1);
      $scope.athlete = vote.athlete;
      $scope.lastVote = last.from(now);
      $scope.nextVote = next.from(now);
    }).catch(function (){
      $scope.lastVote = false;
    });
  }]);
