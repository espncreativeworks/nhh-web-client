'use strict';

/**
 * @ngdoc service
 * @name nhhApp.Positions
 * @description
 * # Positions
 * Factory in the nhhApp.
 */
angular.module('nhhApp')
  .factory('Positions', ['$q', '$http', '$timeout', 'Ballots', 'Votes', 'Athletes', 'Modernizr', function ($q, $http, $timeout, Ballots, Votes, Athletes, Modernizr) {

    // var baseUrl = 'http://nhh-admin.herokuapp.com/api/positions';
    // var baseUrl = 'http://0.0.0.0:9002/api/positions/';
    var baseUrl = './api/positions/'

    // Public API here
    return {
      all: function () {
        var deferred = $q.defer();

        $http.get(baseUrl)
          .success(function (positions){
            deferred.resolve(positions);
          }).error(function(err){
            deferred.reject(err);
          });

        return deferred.promise;
      },
      get: function (key) {
        var deferred = $q.defer();

        //$http.get(baseUrl + '?id=' + key)
        $http.get(baseUrl + key)
          .success(function (position){
            deferred.resolve(position);
          }).error(function(err){
            deferred.reject(err);
          });

        return deferred.promise;
      },
      create: function (data) {
        // console.log("positions create before success: ", data);
        var deferred = $q.defer()
          , _params = angular.extend({ '_method': 'POST' }, data);

        // $http.post(baseUrl, data)
        $http.get(baseUrl, { params: _params })
          .success(function (addPosition){
            // console.log("position create: ", addPosition);
            deferred.resolve(addPosition);
          }).error(function(err){
            deferred.reject(err);
          });

        return deferred.promise;
      }
    }
  }]);
