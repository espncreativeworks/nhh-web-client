'use strict';

/**
 * @ngdoc service
 * @name nhhApp.Schools
 * @description
 * # Schools
 * Factory in the nhhApp.
 */
angular.module('nhhApp')
  .factory('Schools', ['$q', '$http', '$timeout', 'Ballots', 'Votes', 'Modernizr', function ($q, $http, $timeout, Ballots, Votes, Modernizr) {

    // var baseUrl = 'http://nhh-admin.herokuapp.com/api/schools';
    // var baseUrl = 'http://0.0.0.0:9002/api/schools/';
    var baseUrl = './api/schools/';

    // Public API here
    return {
      all: function () {
        var deferred = $q.defer();

        $http.get(baseUrl)
          .success(function (schools){
            deferred.resolve(schools);
          }).error(function(err){
            deferred.reject(err);
          });

        return deferred.promise;
      },
      get: function (key) {
        var deferred = $q.defer();

        //$http.get(baseUrl + '?id=' + key)
        $http.get(baseUrl + key)
          .success(function (school){
            deferred.resolve(school);
          }).error(function(err){
            deferred.reject(err);
          });

        return deferred.promise;
      },
      create: function (data) {
        console.log("schools create before success: ", data);
        var deferred = $q.defer()
        , _params = angular.extend({ '_method': 'POST' }, data);

        // $http.post(baseUrl, data)
        $http.get(baseUrl, { params: _params })
          .success(function (addSchool){
            console.log("school create: ", addSchool);
            deferred.resolve(addSchool);
          }).error(function(err){
            deferred.reject(err);
          });

        return deferred.promise;
      }
    }
  }]);
