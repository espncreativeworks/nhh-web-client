'use strict';

/**
 * @ngdoc service
 * @name nhhApp.Votes
 * @description
 * # Votes
 * Factory in the nhhApp.
 */
angular.module('nhhApp')
  .factory('Votes', ['$q', '$http', '$timeout', 'localStorageService', '$moment', function ($q, $http, $timeout, nhhLocalStorage, $moment) {

    // Public API here
    return {
      create: function (data) {
        var deferred = $q.defer()
          , baseUrl = 'http://nhh-admin.herokuapp.com/api/votes'
          //, baseUrl = './api/votes/'
          , _params = angular.extend({ '_method': 'POST' }, data);

        console.log("vote data: ", _params);

        // $http.get(baseUrl, { params: _params })
        $http.post(baseUrl, data)
          .success(function (vote){
            console.log("vote create: ", vote);
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
          var lastVoted = nhhLocalStorage.get('lastVoted')
            , now = Date.now()
            , oneDayAgo = $moment(now).subtract('days', '1');
          if (lastVoted && $moment(lastVoted.ts).isAfter(oneDayAgo)){
            deferred.resolve(lastVoted);
          } else {
            nhhLocalStorage.remove('lastVoted');
            deferred.reject(new Error('Last Vote Not Found'));
          }
        }, 50);

        return deferred.promise;
      }
    };
  }]);
