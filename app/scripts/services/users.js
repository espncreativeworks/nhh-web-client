'use strict';

/**
 * @ngdoc service
 * @name nhhApp.Users
 * @description
 * # Users
 * Factory in the nhhApp.
 */
angular.module('nhhApp')
  .factory('Users', ['$q', '$http', function ($q, $http) {
    // Service logic
    // ...

    var baseUrl = './api/user/';

    // Public API here
    return {
      get: function () {
        var deferred = $q.defer();

        //$http.get(baseUrl + 'index.json', { cache: false })
        $http.get(baseUrl, { cache: false })
          .success(function (user){
            deferred.resolve(user);
          }).error(function (err){
            deferred.reject(err);
          });

        return deferred.promise;
      }
    };
  }]);
