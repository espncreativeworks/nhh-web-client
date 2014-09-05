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

    // Public API here
    return {
      active: function () {
        var deferred = $q.defer()
          //, baseUrl = 'http://0.0.0.0:9001/api/ballots';
          , baseUrl = './api/ballots';

        $http.get(baseUrl + '/?active=1&populate=athletes')
          .success(function (ballots){
            deferred.resolve(ballots);
          }).error(function(err){
            deferred.reject(err);
          });

        return deferred.promise;
      }
    };
  }]);
