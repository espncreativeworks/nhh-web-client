'use strict';

/**
 * @ngdoc service
 * @name nhhApp.Links
 * @description
 * # Links
 * Factory in the nhhApp.
 */
angular.module('nhhApp')
  .factory('Links', ['$q', '$http', function ($q, $http) {
    // Service logic
    // ...

    var baseUrl = './api/links';

    // Public API here
    return {
      all: function () {
        var deferred = $q.defer();

        $http.get(baseUrl + '/')
          .success(function (links){
            deferred.resolve(links);
          }).error(function(err){
            deferred.reject(err);
          });

        return deferred.promise;
      },
      social: function () {
        var deferred = $q.defer();

        $http.get(baseUrl + '/social')
          .success(function (links){
            deferred.resolve(links);
          }).error(function(err){
            deferred.reject(err);
          });

        return deferred.promise;
      }
    };
  }]);
