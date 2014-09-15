'use strict';

/**
 * @ngdoc service
 * @name nhhApp.TourStops
 * @description
 * # TourStops
 * Factory in the nhhApp.
 */
angular.module('nhhApp')
  .factory('TourStops', ['$q', '$http', function ($q, $http) {
    var baseUrl = 'http://0.0.0.0:9001/api/tour-stops/';
    //var baseUrl = './api/tour_stops/';

    // Public API here
    return {
      all: function () {
        var deferred = $q.defer();

        $http.get(baseUrl)
          .success(function (stops){
            deferred.resolve(stops);
          }).error(function(err){
            deferred.reject(err);
          });

        return deferred.promise;
      },
      get: function (key) {
        var deferred = $q.defer();

        $http.get(baseUrl + key)
        //$http.get(baseUrl + '?id=' + key)
          .success(function (stop){
            deferred.resolve(stop);
          }).error(function(err){
            deferred.reject(err);
          });

        return deferred.promise;
      }
    };
  }]);
