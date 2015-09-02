'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('MenuCtrl', ['$scope', 'Links', function ($scope, Links) {
    Links.all().then(function (links){
      $scope.menuLinks = links;
    });

    Links.social().then(function(links){
      angular.forEach(links, function (link){
        if (link.network === 'facebook'){
          $scope.facebookLink = link;
          console.log("menu ctrl: ", $scope.facebookLink);
        }
        if (link.network === 'twitter'){
          $scope.twitterLink = link;
        }
      });
    });
  }]);
