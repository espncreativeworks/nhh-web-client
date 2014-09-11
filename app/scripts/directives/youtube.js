'use strict';

/**
 * @ngdoc directive
 * @name nhhApp.directive:youtube
 * @description
 * # youtube
 */
angular.module('nhhApp')
  .directive('youtube', ['$sce', function ($sce) {
    return {
      template: '<div class="video-player-container embed-responsive embed-responsive-16by9"><iframe id="yt-player" class="player embed-responsive-item" width="100%" height="auto" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
      restrict: 'E',
      scope: {
        id: '='
      },
      replace: true,
      link: function postLink(scope, element) {
        var params = '?autoplay=0&modestbranding=1&showinfo=0&rel=0';
        scope.$watch('id', function (newVal) {
          if (newVal) {
            scope.url = $sce.trustAsResourceUrl('//www.youtube.com/embed/' + newVal + params);
          }
        });
      }
    };
  }]);
