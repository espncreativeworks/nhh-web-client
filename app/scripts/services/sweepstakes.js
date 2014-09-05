'use strict';

/**
 * @ngdoc service
 * @name nhhApp.Sweepstakes
 * @description
 * # Sweepstakes
 * Factory in the nhhApp.
 */
angular.module('nhhApp')
  .factory('Sweepstakes', ['$q', '$http', '$timeout', 'localStorageService', function ($q, $http, $timeout, localStorageService) {

    var baseUrl = './api/sweepstakes';
    // Public API here
    return {
      enter: function (){
        var deferred = $q.defer();

        $timeout(function (){
          localStorageService.set('lastEntry', new Date());
          deferred.resolve();
        }, 250);

        // $http.post(baseUrl + '/entries')
        //   .success(function (){
        //     $sessionStorage.lastEntry = new Date();
        //     deferred.resolve();
        //   })
        //   .error(function (err){
        //     deferred.reject(err);
        //   });

        return deferred.promise;
      },
      status: function () {
        var deferred = $q.defer();

        $http.get(baseUrl + '/status.json')
          .success(function (status){
            deferred.resolve(status);
          })
          .error(function (err){
            deferred.reject(err);
          });

        return deferred.promise;
      }
    };
  }]);
