'use strict';

/**
 * @ngdoc service
 * @name nhhApp.Links
 * @description
 * # Links
 * Factory in the nhhApp.
 */
angular.module('nhhApp')
  .factory('Links', ['$q', '$http', function ($q, $http) {
    // Service logic
    // ...

    var baseUrl = './api/links';

    // Public API here
    return {
      all: function () {
        var deferred = $q.defer();

        $http.get(baseUrl + '/')
        //$http.get(baseUrl + '/index.json')
          .success(function (links){
            deferred.resolve(links);
          }).error(function(err){
            deferred.reject(err);
          });

        return deferred.promise;
      },
      social: function () {
        var deferred = $q.defer();

        $http.get(baseUrl + '/social')
        //$http.get(baseUrl + '/social.json')
          .success(function (links){
            deferred.resolve(links);
          }).error(function(err){
            deferred.reject(err);
          });

        return deferred.promise;
      },
      shorten: function (url){
        //var baseUrl = 'http://0.0.0.0:9001/api/links';
        var deferred = $q.defer()
          , _params;

        if (url !== 'http://promo.espn.go.com/espn/contests/nissan/heisman/2014/'){
          _params = { longUrl: url, '_method': 'POST' };
          $http.get(baseUrl + '/shorten', { params: _params })
          //$http.post(baseUrl + '/shorten', { longUrl: url })
            .success(function (shortenedUrlData){
              deferred.resolve(shortenedUrlData);
            }).error(function(err){
              deferred.reject(err);
            });
        } else {
          deferred.resolve({ url: url });
        }

        return deferred.promise;
      }
    };
  }]);
