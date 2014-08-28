'use strict';

/**
 * @ngdoc service
 * @name nhhApp.Votes
 * @description
 * # Votes
 * Factory in the nhhApp.
 */
angular.module('nhhApp')
  .factory('Votes', ['$q', '$timeout', '$sessionStorage', function ($q, $timeout, $sessionStorage) {
    // Service logic
    // ...

    //var baseUrl = '/api/votes';

    // Public API here
    return {
      // all: function () {
      //   var deferred = $q.defer();
      //
      //   $http.get(baseUrl + '/index.json')
      //     .success(function (links){
      //       deferred.resolve(links);
      //     }).error(function(err){
      //       deferred.reject(err);
      //     });
      //
      //   return deferred.promise;
      // },
      last: function (){
        var deferred = $q.defer();
        $timeout(function(){
          if ($sessionStorage.lastVoted){
            deferred.resolve($sessionStorage.lastVoted);
          } else {
            deferred.reject();
          }
        }, 250);
        return deferred.promise;
      }
    };
  }]);
