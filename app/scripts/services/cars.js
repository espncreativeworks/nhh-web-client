'use strict';

/**
 * @ngdoc service
 * @name nhhApp.Cars
 * @description
 * # Cars
 * Factory in the nhhApp.
 */
angular.module('nhhApp')
  .factory('Cars', ['$q', '$http', 'underscore', function ($q, $http, _) {
    // Service logic
    // ...

    var baseUrl = './api/cars/';

    // Public API here
    return {
      all: function () {
        var deferred = $q.defer();

        $http.get(baseUrl)
        // $http.get(baseUrl + 'index.json')
          .success(function (cars){
            deferred.resolve(cars);
          }).error(function(err){
            deferred.reject(err);
          });

        return deferred.promise;
      },
      random: function () {
        var deferred = $q.defer();

        $http.get(baseUrl)
        // $http.get(baseUrl + 'index.json')
          .success(function (cars){
            var car = _.chain(cars).shuffle().first().value();
            deferred.resolve(car);
          }).error(function(err){
            deferred.reject(err);
          });

        return deferred.promise;
      }
    };
  }]);
