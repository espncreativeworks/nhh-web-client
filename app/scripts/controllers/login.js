'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('LoginCtrl', ['$scope', '$location', 'Page', 'Auth', function ($scope, $location, Page, Auth){
    Page.meta.reset();
    Page.meta.set('title', 'Login');
    Page.body.set('class', 'info login');

    var to = $location.protocol() + '://' + $location.host() + window.location.pathname + '#!' + $location.search().to;
    var opts = { globalReg: Auth.globalReg };
    opts.globalReg.appRedirect = to || opts.globalReg.appRedirect;
    $scope.auth = angular.extend(Auth, opts);
    $scope.title = 'Login to Continue';
    if ($location.search().errors){
      $scope.failed = true;
      $scope.title = 'Login Failed';
      $scope.message = $location.search().errors.replace(/\+/g,' ');
    }
  }]);
