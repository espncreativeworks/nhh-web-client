'use strict';

/**
 * @ngdoc directive
 * @name nhhApp.directive:showcaseCarousel
 * @description
 * # showcaseCarousel
 */
angular.module('nhhApp')
  .directive('showcaseCarousel', ['underscore', function (_) {
    // var _ = underscore;
    return {
      templateUrl: 'partials/showcase_carousel',
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
      }
    };
  }]);
