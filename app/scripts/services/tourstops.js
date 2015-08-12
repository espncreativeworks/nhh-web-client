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
    //var baseUrl = 'http://0.0.0.0:9000/api/tour-stops/';
    var baseUrl = 'http://nhh-admin.herokuapp.com/api/tour-stops/';
    // var baseUrl = './api/tour_stops/';

    // Public API here
    return {
      all: function () {
        var deferred = $q.defer();

        $http.get(baseUrl + 'index.json')
          .success(function (stops){
            deferred.resolve(stops);
          }).error(function(err){
            deferred.reject(err);
          });

        return deferred.promise;
      },
      get: function (key) {
        var deferred = $q.defer();

        $http.get(baseUrl + key + '.json')
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
