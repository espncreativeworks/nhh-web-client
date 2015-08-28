'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:ConfirmCtrl
 * @description
 * # ConfirmCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('ConfirmCtrl', ['$scope', '$location', 'Page', 'Auth', 'Sweepstakes', 'Lists', '$sce', 'underscore', 'user', '$window', function ($scope, $location, Page, Auth, Sweepstakes, Lists, $sce, _, user, $window){
    $scope.user = user;
    $scope.auth = Auth;

    Page.meta.reset();
    Page.meta.set('title', 'Confirm Your Info');
    Page.body.set('class', 'info confirm');

    $scope.logoutClick = function() {
      $window.did.logout();
      $window.location.reload(true);
      $window.location.replace('http://promo-qa.espn.go.com/espn/contests/nissan/heisman/2015/#!/');
    }

    Lists.all().then(function (lists){
      angular.forEach(lists, function (list){
        list.subscribe = (list.prechecked ? true : false);
        list.labelHtml = $sce.trustAsHtml(list.text);
        list.discalimerHtml = $sce.trustAsHtml(list.disclaimer);
      });
      $scope.lists = lists;
    }, function (){
      $scope.lists = [];
    });

    $scope.confirm = function (lists){
      var listCodes = [];
      if (lists){
        angular.forEach(lists, function (list){
          if (list.subscribe){
            listCodes.push(list.code);
          }
        });
      }

      Sweepstakes.enter().then(function (result){
        var deferreds = _.map(listCodes, Lists.subscribe)
          , errors = []
          , results = [];

        results.push(result);

        angular.forEach(deferreds, function (deferred){
          deferred.then(function (_result){
            results.push(_result);
          }, function (err){
            errors.push(err);
          });
        });

        if (errors.length){
          var err = new Error('Subscription Failed');
          err.data = {};
          err.data.errors = errors;
          throw err;
        } else {
          return results;
        }
      }, function (err){
        var msg = 'An unexpected error occurred. Please try again.';
        if (err.data && err.data.message){
          msg = err.data.message;
        }
        console.log(encodeURIComponent(msg));
        $location.path('/error?msg=' + encodeURIComponent(msg));
      }).then(function (results){
        console.log(results);
        $location.path('/entered');
      }, function (err){
        var msg = 'An unexpected error occurred. Please try again.';

        if (err.data && err.data.message){
          msg = err.data.message;
        }

        if (err.data && err.data.errors && err.data.errors[0].message){
          msg = err.data.errors[0].message;
        }
        console.log(encodeURIComponent(msg));
        $location.path('/error?msg=' + encodeURIComponent(msg));
      });
    };
  }]);
