'use strict';

/**
 * @ngdoc service
 * @name nhhApp.Auth
 * @description
 * # Auth
 * Factory in the nhhApp.
 */
angular.module('nhhApp')
  .factory('Auth', ['$q', '$http', '$location', '$sce', '$timeout', function ($q, $http, $location, $sce, $timeout) {
    // Service logic
    // ...

    var _globalReg = {
      SUBMIT: 1,
      appRedirect: $location.absUrl(),
      failedLocation: $location.protocol() + '://' + $location.host() + window.location.pathname + '#!/login',
      sweepstakesName: 'ESPNPromo_Nissan_082814',
      'aff_code': 'espn_contests',
      registrationFormId: 'espn_contests',
      desktop: {
        register: '/members/v5_0/register',
        recover: '/members/v3_1/forgotMembernamePassword',
        update: '/members/v3_1/modifyAccount'
      },
      mobile: {
        register: 'http://m.espn.go.com/wireless/createAccount',
        recover: 'http://m.espn.go.com/wireless/recoveraccount',
        logout: 'http://m.espn.go.com/wireless/login?logout'
      }
    };
    var _globalRegActionUrl = $sce.trustAsResourceUrl('https://r.espn.go.com/members/login');
    var baseUrl = './api/auth/';

    // Public API here
    return {
      status: function () {
        var deferred = $q.defer();

        $http.get(baseUrl + 'status')
          .success(function (status){
            deferred.resolve(status);
          }).error(function (err){
            deferred.reject(err);
          });

        return deferred.promise;
      },
      validateLoginKey: function (key) {
        var deferred = $q.defer();

        $http.get(baseUrl + 'validateLoginKey', { cache: false, params: { key: key } })
          .success(function (result){
            deferred.resolve(result);
          }).error(function (err){
            deferred.reject(err);
          });

        return deferred.promise;
      },
      logout: function (){
        var deferred = $q.defer();
        $timeout(function (){
          espn.memberservices.logout();
          deferred.resolve();
        },50);
        return deferred.promise;
      },
      globalReg: _globalReg,
      globalRegActionUrl: _globalRegActionUrl
    };
  }]);
