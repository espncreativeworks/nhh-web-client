'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:LeaderboardCtrl
 * @description
 * # LeaderboardCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('LeaderboardCtrl', ['$scope', 'Page', 'Athletes', 'fullNameFilter', 'ordinalizeFilter', function ($scope, Page, Athletes, fullName, ordinalize) {
    var title = 'Leaderboard'
      , keywords = ''
      , limit = 5
      , description = 'Current Heisman Vote Top ' + limit + ': '
      , comma = '';

    var sorted = [], votes = [], rankings = [];

    Page.meta.set('title', title);
    Page.body.set('class', 'info leaderboard');

    $scope.sortPredicate = 'totalVotes';
    $scope.reverse = true;

    Athletes.all().then(function (athletes){
      var _totalVotes = 0;

      angular.forEach(athletes, function(athlete){
        _totalVotes += athlete.totalVotes;
        sorted.push(athlete);
        keywords += comma + fullName(athlete.name) + ' Heisman Votes';
        comma = ', ';
      });

      angular.forEach(athletes, function(athlete){
        athlete.sortPercentage = athlete.totalVotes / _totalVotes;
        athlete.displayPercentage = Math.round(athlete.sortPercentage * 100);
      });

      // actually sort array
      sorted = sorted.slice().sort(function(a,b){
        return b.totalVotes - a.totalVotes;
      });

      // created an array of votes
      votes = sorted.slice().map(function(_athlete){
        return _athlete.totalVotes;
      });

      // create an array of rankings by vote
      rankings = votes.slice().map(function(vote){
        return votes.indexOf(vote) + 1;
      });

      console.log("leaderboard: ", sorted);
      console.log("length: ", sorted.length);

      comma = '';
      if (sorted.length <= 19) {
        angular.forEach(sorted, function (_athlete, i){
          _athlete.rank = rankings[i];
          _athlete.displayPercentage = Math.round((_athlete.totalVotes / _totalVotes) * 100);
          if (_athlete.rank <= limit){
            description += comma + ordinalize(_athlete.rank) + ' - ' + fullName(_athlete.name) + ' (' + _athlete.displayPercentage + '%)';
            comma = ', ';
          }
        });
      } else {
        for (var i = 0; i < sorted.length-1; i++) { 
          sorted.rank = rankings[i];
          sorted.displayPercentage = Math.round((sorted.totalVotes / _totalVotes) * 100);
          if (sorted.rank <= limit){
            description += comma + ordinalize(_athlete.rank) + ' - ' + fullName(_athlete.name) + ' (' + _athlete.displayPercentage + '%)';
            comma = ', ';
          }
        }
      }

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
      Page.meta.set('description', description);
      Page.meta.set('keywords', keywords);
      Page.meta.set('twitter', twitterMeta);
      Page.meta.set('facebook', facebookMeta);

      $scope.athletes = athletes;
    });
  }]);
