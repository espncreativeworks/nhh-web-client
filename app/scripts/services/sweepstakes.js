'use strict';

/**
 * @ngdoc service
 * @name nhhApp.Sweepstakes
 * @description
 * # Sweepstakes
 * Factory in the nhhApp.
 */
angular.module('nhhApp')
  .factory('Sweepstakes', ['$q', '$http', 'localStorageService', function ($q, $http, localStorageService) {

    var baseUrl = './api/sweepstakes/';

    // Public API here
    return {
      enter: function (){
        var deferred = $q.defer();

        $http.post(baseUrl + 'enter')
        // $http.post(baseUrl + 'enter.json')
          .success(function (result){
            localStorageService.set('lastEntry', Date.now());
            deferred.resolve(result);
          })
          .error(function (err){
            deferred.reject(err);
          });

        return deferred.promise;
      },
      status: function () {
        var deferred = $q.defer();

        $http.get(baseUrl + 'status')
        // $http.get(baseUrl + 'status.json')
          .success(function (status){
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
            // if (status.lastEntry){
            //   localStorageService.set('lastEntry', status.lastEntry);
            // }
            deferred.resolve(status);
          })
          .error(function (err){
            deferred.reject(err);
          });

        return deferred.promise;
      }
    };
  }]);
