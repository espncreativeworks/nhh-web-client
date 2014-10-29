'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:VideoShowcaseCtrl
 * @description
 * # VideoShowcaseCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('VideoShowcaseCtrl', ['$scope', 'underscore', '$log', 'Videos', function ($scope, underscore, $log, Videos) {
    var _ = underscore
      , _videos
      , _categories
      , _slides;

    Videos.all().then(function(videos){
      _videos = _.groupBy(videos, 'category');
      _categories = _.keys(_videos);
      _categories = _categories.sort(function(a){
        if (a === 'Game Openers'){
          return -10;
        }
        if (a === 'Heisman Highlights'){
          return 0;
        }
        if (a === 'Heisman to Heisman'){
          return 10;
        }
        return 20;
      });
      _slides = {};
      _.each(_categories, function (category){
        var vids = _videos[category];

        if (category === 'Heisman House Tour'){
          vids.sort(function(a,b){
            return (new Date(b.updatedAt).valueOf()) - (new Date(a.updatedAt).valueOf());
          });
        } else {
          vids = _.shuffle(vids);
        }

        _slides[category] = [];
        var _first = vids.slice(0,3);
        var _rest = vids.slice(3);
        _slides[category].push(_first);
        for ( var i = 0, len = _rest.length; i < len; i += 6 ){
          _slides[category].push(_rest.slice(i, 6));
        }
      });
      $scope.categories = _categories;
      $scope.slides = _slides;
    });

    //$log.info(_slides);
  }]);
