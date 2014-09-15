'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:ShareEntryCtrl
 * @description
 * # ShareEntryCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('ShareEntryCtrl', ['$scope', '$routeParams', '$location', 'Page', 'Auth', 'Sweepstakes', function ($scope, $routeParams, $location, Page, Auth, Sweepstakes) {
    Page.meta.reset();

    var gender = $location.search().gender || 'M'; // 80% of traffic to the site is male and ESPN registration only offers two gender options, so defaulting to 'M'

    $scope.firstName = $location.search().firstName || '';
    $scope.pronoun = (gender === 'M' ? 'himself' : 'herself');

    Sweepstakes.status().then(function (status){
      $scope.eligibility = status.eligibility;
    });

    $scope.auth = {};
    $scope.auth.globalReg = Auth.globalReg;
    Auth.status().then(function (status){
      $scope.auth.loggedIn = status.loggedIn;
    }, function (){
      $scope.auth.loggedIn = false;
    });

    var title = $scope.firstName + ' just entered to win a trip for ' + $scope.pronoun + ' and three friends to the inaugural College Football Playoff in North Texas!';
    var description = 'Join ' + $scope.firstName + ' and visit the Nissan Heisman House to enter for your chance to win!';

    var twitterMeta = {
      'twitter:title': title,
      'twitter:description': description
    };

    var facebookMeta = {
      'og:title': title,
      'og:description': description
    };

    twitterMeta = angular.extend({}, Page.meta.get('twitter'), twitterMeta);
    facebookMeta = angular.extend({}, Page.meta.get('facebook'), facebookMeta);
    Page.meta.set('title', title);
    Page.meta.set('description', description);
    Page.meta.set('twitter', twitterMeta);
    Page.meta.set('facebook', facebookMeta);
    Page.body.set('class', 'info share');

  }]);
