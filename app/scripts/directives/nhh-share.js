'use strict';

/**
 * @ngdoc directive
 * @name nhhApp.directive:nhhShare
 * @description
 * # nhhShare
 */
angular.module('nhhApp')
  .directive('nhhShare', function () {

    function onFacebookShare (e){
      e.preventDefault();
      var url = $(e.target).attr('data-share-url');

      FB.ui({
        method: 'share',
        href: url
      }, function (response){
        if (response && !response.error_code){
          ga('send', {
            hitType: 'social',
            socialNetwork: 'Facebook',
            socialAction: 'Share',
            socialTarget: url,
            page: document.title
          });
        }
      });
    }

    function onTwitterShare (e){
      e.preventDefault();

      var $this = $(e.target)
        , params = {}
        , baseUrl = 'https://twitter.com/share'
        , tweetWindow = null
        , tweetWindowUrl = baseUrl + '?'
        , tweetWindowOptions = 'width=320,height=568,left=' + ($(window).width() - 320) / 2 + ',top=' + ($(window).height() - 568) / 2
        , url = $this.attr('data-tweet-url');

      params.url = url;
      params.text = $this.attr('data-tweet-text');
      params.hashtags = $this.attr('data-hashtags') || '';
      params.related = $this.attr('data-related-accounts') || '';

      tweetWindowUrl += $.param(params);
      tweetWindow = window.open(tweetWindowUrl, '_blank', tweetWindowOptions);

      ga('send', {
        hitType: 'social',
        socialNetwork: 'Twitter',
        socialAction: 'Tweet',
        socialTarget: params.url,
        page: document.title
      });
    }

    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        element.on('click', function (e){
          console.log(attrs);
          if (attrs['share-action'] === 'share-facebook'){
            onFacebookShare(e);
          }
          if (attrs['share-action'] === 'share-twitter'){
            onTwitterShare(e);
          }
        });
      }
    };
  });
