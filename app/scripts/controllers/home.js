'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('HomeCtrl', ['$scope', 'Votes', 'Videos', 'underscore', '$moment', '$sce', function ($scope, Votes, Videos, _, $moment, $sce) {
    var now = $moment();

    Votes.last().then(function (vote){
      var last = $moment(vote.ts);
      var next = $moment(vote.ts).add('days', 1);
      $scope.athlete = vote.athlete;
      $scope.lastVote = last.from(now);
      $scope.nextVote = next.from(last);
      return Videos.featured();
    }).then(function (videos){
      $scope.heroVideo = _.chain(videos).shuffle().first().value();
      $scope.heroThumbnailUrl = $sce.trustAsResourceUrl($scope.heroVideo.thumbnailUrl);
    })
    .catch(function (){
      $scope.lastVote = false;
    });


  }]);
