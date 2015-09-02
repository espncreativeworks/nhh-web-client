'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:BallotCtrl
 * @description
 * # BallotCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('BallotCtrl', ['$scope', '$location', 'Page', 'Athletes', 'Votes', 'fullNameFilter', '$moment', function ($scope, $location, Page, Athletes, Votes, fullName, $moment) {

    var title = 'Ballot';

    Votes.last().then(function(vote){
      var now = $moment();
      var next = $moment(vote.ts).add('days', 1);
      $scope.lastVote = vote;
      $scope.disabled = true;
    });

    Page.meta.set('title', title);
    Page.body.set('class', 'info ballot');

    Athletes.active().then(function (_athletes){
      //console.log("ballot ctrl athletes: ", _athletes);

      $scope.athletes = _athletes;
      var description = 'Current Nissan Heisman House Ballot: '
        , keywords = ''
        , comma = ''
        , pipe = '';

      angular.forEach(_athletes, function (athlete){
        description += (pipe + fullName(athlete.name) + ', ' + athlete.position.abbreviation + ', ' + athlete.school.name);
        keywords += (comma + fullName(athlete.name).toLowerCase() + ' heisman');
        comma = ', ';
        pipe = ' | '
      });

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

      Page.meta.set('description', description);
      Page.meta.set('keywords', keywords);
    });

    $scope.vote = function (athlete){
      Athletes.vote(athlete).then(function (){
        // console.log("ballot ctrl athlete: ", athlete);
        $location.path('/thanks');
      });
    };

  }]);
