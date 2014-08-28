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

    $scope.sortPredicate = 'votes';
    $scope.reverse = true;

    Athletes.all().then(function (athletes){
      var total = 0;
      angular.forEach(athletes, function(athlete){
        total += athlete.votes;
      });
      $scope.total = total;
      $scope.athletes = athletes;
      $scope.getPercentage = function(athlete, display){
        var percentage = athlete.votes / $scope.total;
        if (display){
          percentage = Math.round(percentage * 100);
        }
        return percentage;
      };
    });
  }]);
