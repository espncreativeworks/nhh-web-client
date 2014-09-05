'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:LeaderboardCtrl
 * @description
 * # LeaderboardCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('LeaderboardCtrl', ['$scope', 'Page', 'Athletes', function ($scope, Page, Athletes) {
    Page.meta.set('title', 'Leaderboard');
    Page.body.set('class', 'info leaderboard');

    $scope.sortPredicate = 'totalVotes';
    $scope.reverse = true;

    Athletes.all().then(function (athletes){
      var _totalVotes = 0;
      angular.forEach(athletes, function(athlete){
        _totalVotes += athlete.totalVotes;
      });
      angular.forEach(athletes, function(athlete){
        athlete.sortPercentage = athlete.totalVotes / _totalVotes;
        athlete.displayPercentage = Math.round(athlete.sortPercentage * 100);
      });
      $scope.athletes = athletes;
    });
  }]);
