'use strict';

/**
 * @ngdoc service
 * @name nhhApp.Athletes
 * @description
 * # Athletes
 * Factory in the nhhApp.
 */
angular.module('nhhApp')
  .factory('Athletes', ['$q', '$http', '$timeout', 'Ballots', 'Votes', 'Modernizr', function ($q, $http, $timeout, Ballots, Votes, Modernizr) {

    var baseUrl = 'http://nhh-admin.herokuapp.com/api/athletes';
    // var baseUrl = 'http://0.0.0.0:9002/api/athletes/';

    // Public API here
    return {
      all: function () {
        var deferred = $q.defer();

        $http.get(baseUrl + '?populate=school,position,experience')
          .success(function (athletes){
            deferred.resolve(athletes);
          }).error(function(err){
            deferred.reject(err);
          });

        return deferred.promise;
      },
      get: function (key) {
        var deferred = $q.defer();

        //$http.get(baseUrl + '?id=' + key + '&populate=school,position,experience')
        $http.get(baseUrl + key + '?populate=school,position,experience')
          .success(function (athlete){
            deferred.resolve(athlete);
          }).error(function(err){
            deferred.reject(err);
          });

        return deferred.promise;
      },
      active: function (){
        var deferred = $q.defer();

        $http.get(baseUrl + '?active=1&populate=school,position,experience')
          .success(function (athletes){
            deferred.resolve(athletes);
          }).error(function(err){
            deferred.reject(err);
          });

        return deferred.promise;
      },
      exist: function (){
        var deferred = $q.defer();

        $http.get(baseUrl + '?populate=school,position,experience')
          .success(function (athletes){
            deferred.resolve(athletes);
          }).error(function(err){
            deferred.reject(err);
          });

        return deferred.promise;
      },
      create: function (data){
        console.log("athletes service create: ", data);
        var deferred = $q.defer()

        $http.post(baseUrl, data)
          .success(function (addAthlete){
            console.log("success athletes create: ", addAthlete);
            deferred.resolve(addAthlete);
          }).error(function(err){
            deferred.reject(err);
          });

        return deferred.promise;
      },
      vote: function (athlete){
        console.log("athlete vote: ", athlete);
        var deferred = $q.defer()
          , data = {
            athleteId: athlete.athleteId,
            medium: 1
          };

        if (Modernizr.touch){
          data.medium = 2;
        }

        Ballots.active().then(function(ballot){
          data.ballotId = ballot._id;
          return Votes.create(data);
        }).then(function (vote){
          deferred.resolve(vote);
        }, function (err){
          deferred.reject(err);
        });

        return deferred.promise;
      }
    };
  }]);
