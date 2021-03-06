'use strict';

/**
 * @ngdoc service
 * @name nhhApp.Videos
 * @description
 * # Videos
 * Factory in the nhhApp.
 */
angular.module('nhhApp')
  .factory('Videos', ['$q', '$http', function ($q, $http) {

    // var baseUrl = 'http://0.0.0.0:9001/api/videos/';
    var baseUrl = './api/videos/';

    // Public API here
    return {
      all: function () {
        var deferred = $q.defer();
        $http.get(baseUrl)
          .success(function (videos){
            deferred.resolve(videos);
          }).error(function(err){
            deferred.reject(err);
          });
        return deferred.promise;
      },
      featured: function (){
        var deferred = $q.defer();
        $http.get(baseUrl + '?featured=1')
          .success(function (videos){
            deferred.resolve(videos);
          }).error(function(){
            deferred.reject();
          });
        return deferred.promise;
      },
      get: function (id){
        var deferred = $q.defer()
          , _params = { id: id };

        //$http.get(baseUrl + id)
        $http.get(baseUrl, { params: _params })
          .success(function (video){
            deferred.resolve(video);
          }).error(function(err){
            deferred.reject(err);
          });
        return deferred.promise;
      }
    };
  }]);
