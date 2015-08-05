'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:VideoFeaturedCtrl
 * @description
 * # VideoFeaturedCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('VideoFeaturedCtrl', ['$scope', 'underscore', '$log', 'Videos', function ($scope, underscore, $log, Videos) {
    var _ = underscore
      , _videos
      , _slides;

    Videos.all().then(function(videos){
      _videos = _.groupBy(videos, 'featured');

      _slides = _.chain(videos).shuffle().filter(function (video){ return video.isFeatured; }).first(4).value();
      $scope.selectedVideo = _.first(_slides);

      $scope.slides = _slides;
    });

    // $log.info(_slides);
  }]);
