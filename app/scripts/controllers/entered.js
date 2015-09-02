'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:EnteredCtrl
 * @description
 * # EnteredCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('EnteredCtrl', ['$scope', '$location', 'Page', 'Links', 'user', function ($scope, $location, Page, Links, user) {
    Page.meta.reset();
    Page.meta.set('title', 'Thanks for Entering');
    Page.body.set('class', 'info entered');

    var baseUrl = $location.protocol() + '://' + $location.host() + window.location.pathname;
    $scope.shareUrl = baseUrl + '#!/share-entry/' + user.accountId + '?firstName=' + user.name.first + '&gender=' + user.gender;
    $scope.fb = {};
    $scope.fb.url = $scope.shareUrl + '&utm_source=espncreativeworks&utm_medium=social&utm_content=facebook&utm_campaign=share_entry';
    $scope.tweet = {};
    $scope.tweet.url = $scope.shareUrl + '&utm_source=espncreativeworks&utm_medium=social&utm_content=twitter&utm_campaign=share_entry';
    $scope.tweet.text = 'I just entered to win a trip for me and three friends to the 2016 College Football Playoff National Championship in Glendale, Arizona!';
    $scope.tweet.hashtags = 'HeismanHouse';
    $scope.tweet.related = 'NissanUSA,ESPNPromotions';

    Links.shorten($scope.fb.url).then(function (fbUrlData){
      $scope.fb.url = fbUrlData.url;
      return Links.shorten($scope.tweet.url);
    }).then(function (tweetUrlData){
      $scope.tweet.url = tweetUrlData.url;
    });
  }]);
