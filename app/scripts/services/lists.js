'use strict';

/**
 * @ngdoc service
 * @name nhhApp.Lists
 * @description
 * # Lists
 * Factory in the nhhApp.
 */
angular.module('nhhApp')
  .factory('Lists', ['$q', '$http', function ($q, $http) {
    // Service logic
    // ...

    var baseUrl = './api/lists/';

    // Public API here
    return {
      all: function () {
        var deferred = $q.defer();

        //$http.get(baseUrl + 'index.json')
        $http.get(baseUrl)
          .success(function (lists){
            deferred.resolve(lists);
          }).error(function (err){
            deferred.reject(err);
          });

        return deferred.promise;
      },
      subscribe: function (id) {
        var deferred = $q.defer();
        var params = { id: id };
        //$http.get(baseUrl + 'subscribe.json', params)
        $http.get(baseUrl + 'subscribe', params)
          .success(function (result){
            deferred.resolve(result);
          }).error(function (err){
            deferred.reject(err);
          });

        return deferred.promise;
      }
    };
  }]);
