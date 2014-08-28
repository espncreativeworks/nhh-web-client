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

    var baseUrl = './api/videos';

    // Public API here
    return {
      all: function () {
        var deferred = $q.defer();
        $http.get(baseUrl + '/')
          .success(function (videos){
            deferred.resolve(videos);
          }).error(function(){
            deferred.reject();
          });
        return deferred.promise;
      },
      featured: function (){
        var deferred = $q.defer();
        $http.get(baseUrl + '/featured')
          .success(function (videos){
            deferred.resolve(videos);
          }).error(function(){
            deferred.reject();
          });
        return deferred.promise;
      },
      get: function (id){
        var deferred = $q.defer();
        $http.get(baseUrl + '/')
          .success(function (videos){
            var _video = null;
            angular.forEach(videos, function (video){
              if (video.youtubeId === id){
                _video = video;
              }
            });
            deferred.resolve(_video);
          }).error(function(){
            deferred.reject();
          });
        return deferred.promise;
      }
    };
  }]);
