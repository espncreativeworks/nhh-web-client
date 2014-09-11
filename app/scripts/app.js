'use strict';

/**
 * @ngdoc overview
 * @name nhhApp
 * @description
 * # nhhApp
 *
 * Main module of the application.
 */
angular
  .module('nhhApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngUnderscore',
    'angular-carousel',
    'LocalStorageModule',
    'angular-momentjs',
    'angulartics',
    'angulartics.google.analytics',
    'google-maps',
    'ngProgress'
  ])
  .constant('Modernizr', Modernizr)
  .config(['$routeProvider', '$locationProvider', '$httpProvider', '$sceDelegateProvider', '$sceProvider', 'localStorageServiceProvider', function ($routeProvider, $locationProvider, $httpProvider, $sceDelegateProvider, $sceProvider, localStorageServiceProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home',
        controller: 'HomeCtrl'
      })
      .when('/ballot', {
        templateUrl: 'views/ballot',
        controller: 'BallotCtrl'
      })
      .when('/thanks', {
        templateUrl: 'views/thanks',
        controller: 'ThanksCtrl'
      })
      .when('/leaderboard', {
        templateUrl: 'views/leaderboard',
        controller: 'LeaderboardCtrl'
      })
      .when('/rules', {
        templateUrl: 'views/rules',
        controller: 'RulesCtrl'
      })
      .when('/videos/:id', {
        templateUrl: 'views/video',
        controller: 'VideoCtrl'
      })
      .when('/tour', {
        templateUrl: 'views/tour_stop_list',
        controller: 'TourStopListCtrl'
      })
      .when('/tour-stops/:id', {
        templateUrl: 'views/tour_stop_detail',
        controller: 'TourStopDetailCtrl'
      })
      .when('/tour-stops/:stopId/photos/:photoId', {
        templateUrl: 'views/tour_stop_image_detail',
        controller: 'TourStopImageDetailCtrl'
      })
      .when('/tour-stops/:stopId/videos/:videoId', {
        templateUrl: 'views/tour_stop_video_detail',
        controller: 'TourStopVideoDetailCtrl'
      })
      .when('/confirm', {
        templateUrl: 'views/confirm',
        controller: 'ConfirmCtrl'
      })
      .when('/share-vote/:athleteId', {
        templateUrl: 'views/share_vote',
        controller: 'ShareVoteCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('!');

    //$httpProvider.defaults.useXDomain = true;
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $sceDelegateProvider.resourceUrlWhitelist([
      'self', // Allow same origin resource loads
      'http://res.cloudinary.com/**', // Allow loading from CDN. Notice the difference between * and **
      'https://res.cloudinary.com/**',
      'http://i.ytimg.com/**',
      'https://i.ytimg.com/**'
    ]);

    //$sceProvider.enabled(false);
    localStorageServiceProvider.setPrefix('nhh');
  }]);
