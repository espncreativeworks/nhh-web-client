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
  .constant('Modernizr', window.Modernizr)
  .constant('jQuery', window.jQuery)
  .config(['$routeProvider', '$locationProvider', '$httpProvider', '$sceDelegateProvider', '$sceProvider', 'localStorageServiceProvider', function ($routeProvider, $locationProvider, $httpProvider, $sceDelegateProvider, $sceProvider, localStorageServiceProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
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
      })
      .when('/rules', {
        templateUrl: 'views/rules.html',
        controller: 'RulesCtrl'
      })
      .when('/videos/:id', {
        templateUrl: 'views/video.html',
        controller: 'VideoCtrl'
      })
      .when('/tour', {
        templateUrl: 'views/tour_stop_list.html',
        controller: 'TourStopListCtrl'
      })
      .when('/tour-stops/:id', {
        templateUrl: 'views/tour_stop_detail.html',
        controller: 'TourStopDetailCtrl'
      })
      .when('/tour-stops/:stopId/photos/:photoId', {
        templateUrl: 'views/tour_stop_image_detail.html',
        controller: 'TourStopImageDetailCtrl'
      })
      .when('/tour-stops/:stopId/videos/:videoId', {
        templateUrl: 'views/tour_stop_video_detail.html',
        controller: 'TourStopVideoDetailCtrl'
      })
      .when('/confirm', {
        templateUrl: 'views/confirm.html',
        controller: 'ConfirmCtrl',
        resolve: {
          user: ['$q', 'Auth', 'Users', function ($q, Auth, Users){
            var deferred = $q.defer();
            Auth.status().then(function (status){
              if (status.loggedIn){
                return Users.get();
              } else {
                return deferred.reject({
                  loggedIn: false,
                  to: '/confirm'
                });
              }
            }, function (){
              deferred.reject({
                loggedIn: false,
                to: '/confirm'
              });
            }).then(function (user){
              return deferred.resolve(user);
            }, function (err){
              return deferred.reject(err);
            });
            return deferred.promise;
          }]
        }
      })
      .when('/entered', {
        templateUrl: 'views/entered.html',
        controller: 'EnteredCtrl',
        resolve: {
          user: ['$q', 'Auth', 'Users', function ($q, Auth, Users){
            var deferred = $q.defer();
            Auth.status().then(function (status){
              if (status.loggedIn){
                return Users.get();
              } else {
                return deferred.reject({
                  loggedIn: false,
                  to: '/confirm'
                });
              }
            }, function (){
              deferred.reject({
                loggedIn: false,
                to: '/confirm'
              });
            }).then(function (user){
              return deferred.resolve(user);
            }, function (err){
              return deferred.reject(err);
            });
            return deferred.promise;
          }]
        }
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/share-vote/:athleteId', {
        templateUrl: 'views/share_vote.html',
        controller: 'ShareVoteCtrl'
      })
      .when('/share-entry/:accountId', {
        templateUrl: 'views/share_entry.html',
        controller: 'ShareEntryCtrl'
      })
      .when('/error', {
        templateUrl: 'views/error.html',
        controller: 'ErrorCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('!');

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $sceDelegateProvider.resourceUrlWhitelist([
      'self', // Allow same origin resource loads
      'http://res.cloudinary.com/**', // Allow loading from CDN. Notice the difference between * and **
      'https://res.cloudinary.com/**',
      'http://i.ytimg.com/**',
      'https://i.ytimg.com/**'
    ]);

    //$sceProvider.enabled(false);
    localStorageServiceProvider.setPrefix('nhh');
  }]).run(['$rootScope', '$location', function($rootScope, $location) {

    $rootScope.$on('$routeChangeError', function(event, current, previous, eventObj) {
      var msg = eventObj.message || 'An unexpected error occurred. Please try again.';
      if (eventObj.loggedIn === false) {
        $location.path('/login');
        $location.search('to', eventObj.to);
      }
      if (eventObj.eligibility === false) {
        $location.path('/error');
        $location.search('msg', msg);
      }
    });
  }]);
