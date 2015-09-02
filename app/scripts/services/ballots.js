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

    // var baseUrl = 'http://nhh-admin.herokuapp.com/api/ballots';
    // var baseUrl = 'http://0.0.0.0:9002/api/ballots/';
    var baseUrl = './api/ballots/';

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
      },
      addAthlete: function(data) {
        // console.log("ballot service data: ", data);

        var deferred = $q.defer()
        , _params = angular.extend({ '_method': 'POST' }, data);  

        // $http.post(baseUrl, data)
        $http.get(baseUrl, { params: _params })
          .success(function (addAthlete){
            // console.log("ballot service add athlete: ", addAthlete);
            
            deferred.resolve(addAthlete);
          }).error(function(err){
            deferred.reject(err);
          });

        return deferred.promise;
      }
    };
  }]);
