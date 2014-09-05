'use strict';

/**
 * @ngdoc service
 * @name nhhApp.Votes
 * @description
 * # Votes
 * Factory in the nhhApp.
 */
angular.module('nhhApp')
  .factory('Votes', ['$q', '$http', '$timeout', 'localStorageService', function ($q, $http, $timeout, nhhLocalStorage) {

    // Public API here
    return {
      create: function (data) {
        var deferred = $q.defer()
          //, baseUrl = 'http://0.0.0.0:9001/api/votes';
          , baseUrl = './api/votes/'
          , _params = angular.extend({ '_method': 'POST' }, data);

        $http.get(baseUrl, { params: _params })
          .success(function (vote){
            nhhLocalStorage.set('lastVoted', {
              ts: Date.now(),
              athlete: vote.athlete,
              ballot: vote.ballot
            });
            deferred.resolve(vote);
          }).error(function(err){
            deferred.reject(err);
          });

        return deferred.promise;
      },
      last: function (){
        var deferred = $q.defer();

        $timeout(function (){
          if (nhhLocalStorage.get('lastVoted')){
            deferred.resolve(nhhLocalStorage.get('lastVoted'));
          } else {
            deferred.reject(new Error('Last Vote Not Found'));
          }
        }, 50);

        return deferred.promise;
      }
    };
  }]);
