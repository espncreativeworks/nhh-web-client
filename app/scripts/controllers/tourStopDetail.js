'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:TourStopDetailCtrl
 * @description
 * # TourStopDetailCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('TourStopDetailCtrl', ['$scope', 'Page', 'TourStops', '$sce', '$routeParams', function ($scope,  Page, TourStops, $sce, $routeParams) {

    TourStops.get($routeParams.id).then(function (stop){
      $scope.stop = stop;

      Page.meta.set('title', stop.pageTitle + ' | Nissan Heisman House Tour');
      Page.meta.set('description', stop.pageDescription);
      Page.meta.set('keywords', stop.keywords);
      Page.body.set('class', 'info tour detail');
      Page.body.set('bgImageUrl', stop.heroImage.secure_url);

      angular.forEach($scope.stops, function (stop){
        stop.siteHtml = $sce.trustAsHtml(stop.site);
        stop.summaryHtml = $sce.trustAsHtml(stop.summary);
        stop.recapHtml = $sce.trustAsHtml(stop.recap);
      });
    });

  }]);
