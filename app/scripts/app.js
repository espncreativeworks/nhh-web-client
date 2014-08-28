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
    'ngStorage',
    'angular-momentjs',
    'angulartics',
    'angulartics.google.analytics'
  ])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home',
        controller: 'HomeCtrl'
      })/*
      .when('/ballot', {
        templateUrl: 'views/ballot.html',
        controller: 'BallotCtrl'
      })
      .when('/thanks', {
        templateUrl: 'views/thanks.html',
        controller: 'ThanksCtrl'
      })
      .when('/leaderboard', {
        templateUrl: 'views/leaderboard.html',
        controller: 'LeaderboardCtrl'
      })*/
      .when('/videos/:id', {
        templateUrl: 'views/video',
        controller: 'VideoCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('!');
  }])/*.run(['$rootScope', function($rootScope){

    $rootScope.$on('$routeChangeSuccess', function(event, current, previous, rejection){
      console.log(event, current, previous, rejection);
    });

  }])*/;
