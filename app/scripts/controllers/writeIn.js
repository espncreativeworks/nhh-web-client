'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:WriteInCtrl
 * @description
 * # WriteInCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('WriteInCtrl', ['$scope', '$location', 'Page', 'Athletes', 'Votes', 'Sports', 'fullNameFilter', 'underscore', '$moment', function ($scope, $location, Page, Athletes, Votes, Sports, fullName, _, $moment) {

    var title = 'Write-In Ballot';

    // Votes.last().then(function(vote){
    //   var now = $moment();
    //   var next = $moment(vote.ts).add('days', 1);
    //   $scope.lastVote = vote;
    //   $scope.disabled = true;
    // });

    Page.meta.set('title', title);
    Page.body.set('class', 'info write-in ballot');

    Athletes.active().then(function (_athletes){
      var description = 'Current Nissan Heisman House Ballot: '
        , keywords = ''
        , comma = ''
        , pipe = '';

      angular.forEach(_athletes, function (athlete){
        description += (pipe + fullName(athlete.name) + ', ' + athlete.position.abbreviation + ', ' + athlete.school.name);
        keywords += (comma + fullName(athlete.name).toLowerCase() + ' heisman');
        comma = ', ';
        pipe = ' | ';
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

    $scope.vote = function (form){
    	if (form.$valid) {
    		// console.log($scope.athlete);
	      Athletes.vote($scope.athlete).then(function (){
	        $location.path('/thanks');
	      });
    	}
    };

    $scope.conference = null;
    $scope.team = null;
    $scope.athlete = null;

    Sports.conferences().then(function (data){
    	var ncaa = data.sports[0].leagues[0]
    		, d1 = _.first(_.filter(ncaa.groups, function (group){ return group.groupId === 90; }))
    		, fbs = _.first(_.filter(d1.groups, function (group){ return group.groupId === 80; }));

    	$scope.conferences = fbs.groups;
    });

    var onconferencechange = function (newVal, oldVal){
    	if (newVal && (newVal !== oldVal)){
    		$scope.team = null;
	    	$scope.athlete = null;
	    	Sports.teamsByGroup($scope.conference.groupId).then(function (data){
	    		// console.log(data.sports[0].leagues[0].teams);
	    		$scope.teams = data.sports[0].leagues[0].teams;
	    	});
    	}
    };

    var onteamchange = function (newVal, oldVal){
    	if (newVal && (newVal !== oldVal)){
    		$scope.athlete = null;
	    	Sports.athletesByTeam($scope.team.id).then(function (data){
	    		var athletes = data.sports[0].leagues[0].teams[0].athletes;
	    		_.each(athletes, function (athlete){
	    			athlete.sortName = athlete.lastName + athlete.firstName;
	    		});
	    		athletes.sort(function (a,b){
	    			return a.sortName.localeCompare(b.sortName);
	    		});
	    		// console.log(athletes);
	    		$scope.athletes = athletes;
	    	});
    	}
    };

    $scope.$watch('conference', onconferencechange);
    $scope.$watch('team', onteamchange);

  }]);
