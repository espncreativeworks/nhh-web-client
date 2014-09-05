'use strict';

/**
 * @ngdoc service
 * @name nhhApp.Athletes
 * @description
 * # Athletes
 * Factory in the nhhApp.
 */
angular.module('nhhApp')
  .factory('Athletes', ['$q', '$http', '$timeout', 'underscore', 'Ballots', 'Votes', function ($q, $http, $timeout, underscore, Ballots, Votes) {

    var _ = underscore
      //, baseUrl = 'http://0.0.0.0:9001/api/athletes';
      , baseUrl = './api/athletes';

    // Public API here
    return {
      all: function () {
        var deferred = $q.defer();

        $http.get(baseUrl + '/?populate=school,position,experience')
          .success(function (athletes){
            deferred.resolve(athletes);
          }).error(function(err){
            deferred.reject(err);
          });

        return deferred.promise;
      },
      active: function (){
        var deferred = $q.defer();

        $http.get(baseUrl + '/?active=1&populate=school,position,experience')
          .success(function (athletes){
            deferred.resolve(athletes);
          }).error(function(err){
            deferred.reject(err);
          });

        return deferred.promise;
      },
      vote: function (athlete){
        var deferred = $q.defer()
          , data = {
            athleteId: athlete._id,
            medium: 1
          };

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
