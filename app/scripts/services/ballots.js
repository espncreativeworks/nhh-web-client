'use strict';

/**
 * @ngdoc service
 * @name nhhApp.Ballots
 * @description
 * # Ballots
 * Factory in the nhhApp.
 */
angular.module('nhhApp')
  .factory('Ballots', ['$q', '$http', function ($q, $http) {

    var baseUrl = 'http://0.0.0.0:9001/api/ballots/';
    //var baseUrl = './api/ballots/';

    // Public API here
    return {
      all: function () {
        var deferred = $q.defer();

        $http.get(baseUrl)
          .success(function (ballots){
            deferred.resolve(ballots);
          }).error(function(err){
            deferred.reject(err);
          });

        return deferred.promise;
      },
      active: function () {
        var deferred = $q.defer();

        $http.get(baseUrl + '?active=1&populate=athletes')
          .success(function (ballot){
            deferred.resolve(ballot);
          }).error(function(err){
            deferred.reject(err);
          });

        return deferred.promise;
      }
    };
  }]);
