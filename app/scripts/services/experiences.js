'use strict';

/**
 * @ngdoc service
 * @name nhhApp.Experiences
 * @description
 * # Experiences
 * Factory in the nhhApp.
 */
angular.module('nhhApp')
  .factory('Experiences', ['$q', '$http', '$timeout', 'Ballots', 'Votes', 'Athlete', 'Modernizr', function ($q, $http, $timeout, Ballots, Votes, Athlete, Modernizr) {

    // var baseUrl = 'http://nhh-admin.herokuapp.com/api/experiences';
    var baseUrl = 'http://0.0.0.0:9002/api/experiences/';

    // Public API here
    return {
      all: function () {
        var deferred = $q.defer();

        $http.get(baseUrl)
          .success(function (experiences){
            deferred.resolve(experiences);
          }).error(function(err){
            deferred.reject(err);
          });

        return deferred.promise;
      },
      create: function (data) {
        console.log("experiences service create: ", data);
        var deferred = $q.defer()

        $http.post(baseUrl, data)
          .success(function (addExperience){
            console.log("school create: ", addSchool);
            deferred.resolve(addExperience);
          }).error(function(err){
            deferred.reject(err);
          });

        return deferred.promise;
      }
    }
  }]);
