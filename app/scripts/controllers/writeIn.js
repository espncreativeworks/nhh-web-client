'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:WriteInCtrl
 * @description
 * # WriteInCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('WriteInCtrl', ['$scope', '$location', 'Page', 'Ballots', 'Athletes', 'Votes', 'Sports', 'Schools', 'fullNameFilter', 'underscore', '$moment', function ($scope, $location, Page, Ballots, Athletes, Votes, Sports, Schools, fullName, _, $moment) {

    var title = 'Write-In Ballot';

    Votes.last().then(function(vote){
      var now = $moment();
      var next = $moment(vote.ts).add('days', 1);
      $scope.lastVote = vote;
      $scope.disabled = true;
    });  

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
        $scope.schoolExists = false;
        $scope.athleteExists = false;
        var searr = []
          , aearr = []
          , fnarr = []
          , schoolID = "";


        Schools.all().then(function(data){
          // console.log("get schools: ", data);
          // console.log("school exists?: ", $scope.schoolExists);
          // console.log("school scope: ", $scope);
          if (!$scope.schoolExists) {            
            for (var i = 0; i < data.length; i++) {
              searr.push(data[i].name.indexOf($scope.selectedTeam.nickname));
            }
            // console.log("searr: ", searr);
            // console.log(searr.indexOf(0));
            if (searr.indexOf(0) === -1) {
              var schoolData = {
                name: $scope.selectedTeam.nickname,
                espnId: $scope.selectedTeam.id,
                abbreviation: $scope.selectedTeam.abbreviation,
                primaryColor: $scope.selectedTeam.color
              };

              Schools.create(schoolData).then(function(data) {
                // console.log("created school: ", data);
                schoolID = data._id;
                $scope.schoolExists = true;
              });  
            }
          }
        });

        Athletes.all().then(function(data){
          // console.log("athlete data: ", data);
          // console.log("scope.athlete: ", $scope.athlete);
          if (!$scope.athleteExists) {
            for (var i = 0; i < data.length; i++) {
              fnarr.push(data[i].name.first + " " + data[i].name.last);
            }
            // console.log("fnarr: ", fnarr);
            for (var j= 0; j < fnarr.length; j++) {
              aearr.push(fnarr[j].indexOf($scope.athlete.fullName));
            }

            console.log("aearr: ", aearr);
            console.log(aearr.indexOf(0));

            var returnObj = {
              data: data,
              aearr: aearr
            };
            return returnObj;
          }
        }).then(function (data){
          if (data.aearr.indexOf(0) === -1) {
            var athleteData = {
              name: $scope.athlete.fullName,
              firstName: $scope.athlete.firstName,
              lastName: $scope.athlete.lastName,
              espnId: $scope.athlete.id,
              jersey: $scope.athlete.jersey
            };
            return Athletes.create(athleteData);
          } else {
            return data.data[aearr.indexOf(0)];
          }
        }).then(function (athlete){
          console.log("outside ballots active: ", athlete);

          Ballots.active().then(function (ballot){
            // console.log("ballot: ",ballot);
            console.log("athlete: ", athlete);

            var doc = {
              ballotId: ballot._id,
              athleteId: athlete._id,
              athleteName: athlete.name.first + " " + athlete.name.last,
              writein: true
            }

            // do a check if athlete already exists in ballot.writein
            var bwilist = ballot.writein;
            console.log("bwilist: ", bwilist);
            console.log("bwilist indexof: ", bwilist.indexOf(athlete));
            if (bwilist.indexOf(athlete) === -1) {
              Ballots.addAthlete(doc).then(function (athlete) {
                console.log("add athlete: ", athlete);
              }, function(err){
                console.log(err);
              });
            }

            Athletes.vote(doc).then(function (athlete){
              console.log("write in ctrl athlete: ", athlete);
              //$location.path('/thanks');
            });
          });
        }, function (err){
          console.error(err);
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

        $scope.selectedTeam = newVal;
        // console.log("selected team: ", $scope.selectedTeam);
      }
    };

    var onathletechange = function (newVal, oldVal){
      if (newVal && (newVal !== oldVal)){
        $scope.athlete = newVal;
        console.log("selected athlete: ", $scope.athlete);
      } 
    }

    $scope.$watch('conference', onconferencechange);
    $scope.$watch('team', onteamchange);
    $scope.$watch('athlete', onathletechange);

  }]);
