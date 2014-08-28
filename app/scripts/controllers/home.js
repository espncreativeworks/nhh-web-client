'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('HomeCtrl', ['$scope', 'Votes', 'Videos', 'underscore', '$moment', function ($scope, Votes, Videos, _, $moment) {
    var now = $moment();

    Votes.last().then(function (vote){
      var last = $moment(vote.ts);
      var next = $moment(vote.ts).add('days', 1);
      $scope.athlete = vote.athlete;
      $scope.lastVote = last.from(now);
      $scope.nextVote = next.calendar();
      return Videos.featured();
    }).then(function (videos){
      $scope.heroVideo = _.chain(videos).shuffle().first().value();
    })
    .catch(function (){
      $scope.lastVote = false;
    });


  }]);
