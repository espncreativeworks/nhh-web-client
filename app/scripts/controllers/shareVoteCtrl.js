'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:ShareVoteCtrl
 * @description
 * # ShareVoteCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('ShareVoteCtrl', ['$scope', '$routeParams', 'Page', 'Ballots', 'Athletes', 'fullNameFilter', 'ordinalizeFilter', function ($scope, $routeParams, Page, Ballots, Athletes, fullName, ordinalize) {
    Page.meta.reset();

    var athlete = null;
    var totalVotes = 0;
    var percentage = 0;
    var sorted = [], votes = [], rankings = [];

    Athletes.all().then(function (athletes){

      // collect totalVotes, add athlete to not yet sorted array
      angular.forEach(athletes, function (_athlete){
        totalVotes += _athlete.totalVotes;
        sorted.push(_athlete);
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

      // attach a rank property to each athlete
      // find athlete that was voted for
      $scope.athletes = [];
      angular.forEach(sorted, function (_athlete, i){
        _athlete.rank = rankings[i];
        _athlete.displayPercentage = Math.round((_athlete.totalVotes / totalVotes) * 100);
        $scope.athletes.push(_athlete);
        if (_athlete._id === $routeParams.athleteId){
          athlete = _athlete;
        }
      });

      var title = 'I just voted for ' + fullName(athlete.name) + ' to be the next Heisman Trophy Winner';
      var description = athlete.name.last + ' is currently in ' + ordinalize(athlete.rank) + ' place with ' + athlete.displayPercentage + '% of all votes. Visit the Nissan Heisman House to make your vote count!';

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
      Page.meta.set('title', title);
      Page.meta.set('description', description);
      Page.meta.set('twitter', twitterMeta);
      Page.meta.set('facebook', facebookMeta);
      Page.body.set('class', 'info share');
    });

  }]);
