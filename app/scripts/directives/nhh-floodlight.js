'use strict';

/**
 * @ngdoc directive
 * @name nhhApp.directive:nhhFloodlight
 * @description
 * # nhhFloodlight
 */
angular.module('nhhApp')
  .directive('nhhFloodlight', ['jQuery', function ($) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var axel = Math.random() + "";
        var a = axel * 10000000000000;
        var $floodlight = $('<iframe>', { src: 'http://1361549.fls.doubleclick.net/activityi;src=1361549;type=espnh338;cat=' + attrs.nhhFloodlightCat + ';ord=1;num=' + a + '?', width: 1, height: 1, frameborder: 0, style: 'display:none;' });

        $(element).one('click', function (){
          $('body').append($floodlight);
        });
      }
    };
  }]);
