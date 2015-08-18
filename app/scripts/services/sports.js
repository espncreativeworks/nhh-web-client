'use strict';

/**
 * @ngdoc service
 * @name nhhApp.Videos
 * @description
 * # Videos
 * Factory in the nhhApp.
 */
angular.module('nhhApp')
  .factory('Sports', ['$q', '$http', function ($q, $http) {

    var baseUrl = './api/sports/';

    // Public API here
    return {
      conferences: function () {
        var deferred = $q.defer()
          // , resource = baseUrl + 'conferences.json';
          , resource = baseUrl + 'conferences';

        $http.get(resource)
          .success(function (data){
            deferred.resolve(data);
          }).error(function(err){
            deferred.reject(err);
          });
        return deferred.promise;
      },
      teamsByGroup: function (groupId){
        var deferred = $q.defer()
          // , resource = baseUrl + 'teams.json' 
          , resource = baseUrl + 'teams' 
          , params = { groups: groupId };

        $http.get(resource, { params: params })
          .success(function (data){
            deferred.resolve(data);
          }).error(function(err){
            deferred.reject(err);
          });
        return deferred.promise;
      },
      teamInfo: function (teamId){
        var deferred = $q.defer()
          // , resource = baseUrl + 'teams.json' 
          , resource = baseUrl + 'teams' 
          , params = { groups: groupId };

        $http.get(resource, { params: params })
          .success(function (data){
            console.log("team info data: ", data);
            deferred.resolve(data);
          }).error(function(err){
            deferred.reject(err);
          });
        return deferred.promise;
      },
      athletesByTeam: function (teamId){
        var deferred = $q.defer()
          // , resource = baseUrl + 'athletes.json'
          , resource = baseUrl + 'team'
          , params = { id: teamId, enable: 'athletes' };

        $http.get(resource, { params: params })
          .success(function (data){
            deferred.resolve(data);
          }).error(function(err){
            deferred.reject(err);
          });
        return deferred.promise;
      },
      athleteById: function (athleteId){
        var deferred = $q.defer()
          // , resource = baseUrl + 'athlete.json'
          , resource = baseUrl + 'athlete'
          , params = { id: athleteId };

        $http.get(resource, { params: params })
          .success(function (data){
            deferred.resolve(data);
          }).error(function(err){
            deferred.reject(err);
          });
        return deferred.promise;
      }
    };
  }]);
