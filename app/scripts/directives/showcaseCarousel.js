'use strict';

/**
 * @ngdoc directive
 * @name nhhApp.directive:showcaseCarousel
 * @description
 * # showcaseCarousel
 */
angular.module('nhhApp')
  .directive('showcaseCarousel', ['underscore', function (underscore) {
    var _ = underscore;
    return {
      templateUrl: 'partials/showcase_carousel.html',
      restrict: 'E',
      scope: true,
      link: function postLink(scope, element, attrs) {
        var _videos = [];

        console.log("scope: ", scope);
        console.log("scope.category: ", scope.categories);
        
        if (attrs.isMobile){
          scope.isMobile = true;

          console.log("isMobile scope: ", scope);
          console.log("isMobile scope.category: ", scope.categories);

          _.each(scope.slides[scope.category], function (slide){
            _.each(slide, function (video){
              _videos.push(video);
            });
          });
          scope.videos = _videos;
        }
      }
    };
  }]);
