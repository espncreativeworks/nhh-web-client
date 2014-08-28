'use strict';

/**
 * @ngdoc service
 * @name nhhApp.Athletes
 * @description
 * # Athletes
 * Factory in the nhhApp.
 */
angular.module('nhhApp')
  .factory('Athletes', ['$q', '$http', '$timeout', 'underscore', '$sessionStorage', function ($q, $http, $timeout, underscore, $sessionStorage) {

    var _ = underscore
      , baseUrl = './api/athletes';

    // Public API here
    return {
      all: function () {
        var deferred = $q.defer();

        $http.get(baseUrl + '/')
          .success(function (athletes){
            deferred.resolve(athletes);
          }).error(function(err){
            deferred.reject(err);
          });

        return deferred.promise;
      },
      active: function (){
        var deferred = $q.defer();

        $http.get(baseUrl + '/')
          .success(function (athletes){
            var _athletes = _.filter(athletes, function (athlete){
              return athlete.active;
            });
            deferred.resolve(_athletes);
          }).error(function(err){
            deferred.reject(err);
          });

        return deferred.promise;
      },
      vote: function (athlete){
        var deferred = $q.defer();
          //, baseUrl = '/api/votes';

        if (!athlete.active){
          $timeout(function (){
            deferred.reject({
              name: 'Invalid vote',
              message: athlete.name.first + ' ' + athlete.name.last + ' is inactive.'
            });
          }, 250);
        } else {
          $timeout(function (){
            $sessionStorage.lastVoted = {
              ts: Date.now(),
              athlete: athlete
            };
            deferred.resolve();
          }, 250);

          // $http.post(baseUrl, athlete)
          //   .success(function (){
          //     $sessionStorage.lastVoted = {
          //       ts: Date.now(),
          //       athlete: athlete
          //     };
          //     deferred.resolve();
          //   }).error(function(err){
          //     deferred.reject(err);
          //   });
        }
        return deferred.promise;
      }
    };
  }]);
