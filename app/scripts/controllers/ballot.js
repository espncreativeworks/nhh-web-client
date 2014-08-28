'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:BallotCtrl
 * @description
 * # BallotCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('BallotCtrl', ['$scope', '$location', 'Page', 'Athletes', function ($scope, $location, Page, Athletes) {

    Page.meta.set('title', 'Cast Your Vote!');
    Page.body.set('class', 'info ballot');

    Athletes.active().then(function (_athletes){
      $scope.athletes = _athletes;
      var desc = 'And the nominees are: '
        , keywords = ''
        , comma = '';

      angular.forEach(_athletes, function (athlete){
        desc += (comma + athlete.name.first + ' ' + athlete.name.last);
        keywords += (comma + athlete.name.first.toLowerCase() + ' ' + athlete.name.last.toLowerCase() + ' heisman');
        comma = ', ';
      });

      Page.meta.set('description', desc);
      Page.meta.set('keywords', keywords);
    });

    $scope.vote = function (athlete){
      Athletes.vote(athlete).then(function (){
        $location.path('/thanks');
      });
    };

  }]);
