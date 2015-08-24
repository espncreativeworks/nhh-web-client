'use strict';

/**
 * @ngdoc directive
 * @name nhhApp.directive:featuredCarousel
 * @description
 * # featuredCarousel
 */
angular.module('nhhApp')
  .directive('featuredCarousel', ['underscore', function (_) {
    return {
      templateUrl: 'partials/featured_carousel',
      restrict: 'E',
      scope: true,
      link: function postLink(scope, element, attrs) {
        var _videos = [];
        if (attrs.isMobile){
          scope.isMobile = true;
          _.each(scope.slides, function (slide){
            _.each(slide, function (video){
              _videos.push(video);
            });
          });
          scope.videos = _videos;
        }

        scope.updateSelected = function updateSelected (video) {
          if (scope.$parent.selectedVideo._id !== video._id) {
            scope.$parent.selectedVideo = video;
          }
        };
        // $(element).on('click', updateSelected);
      }
    };
  }]);
