'use strict';

/**
 * @ngdoc directive
 * @name nhhApp.directive:nhhShare
 * @description
 * # nhhShare
 */
angular.module('nhhApp')
  .directive('nhhShare', ['jQuery', function ($) {

    function onFacebookShare (e){
      e.preventDefault();
      var url = $(e.currentTarget).attr('data-share-url');

      // console.log("facebook share url: ", url);

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
      //e.preventDefault();

      var $this = $(e.currentTarget)
        , params = {}
        , baseUrl = 'https://twitter.com/intent/tweet'
        , tweetWindow = null
        , tweetWindowUrl = baseUrl + '?'
        , tweetWindowOptions = 'width=550,height=426,left=' + ($(window).width() - 550) / 2 + ',top=' + ($(window).height() - 426) / 2
        , url = $this.attr('data-share-url');

        // console.log("twitter share url: ", url);

      params['original_referer'] = window.location.href;
      // params.url = url;
      params.url = 'http://nissanheismanhouse.com';
      params.text = $this.attr('data-share-text');
      params.hashtags = $this.attr('data-share-hashtags') || '';
      params.related = $this.attr('data-related-accounts') || '';
      tweetWindowUrl += $.param(params);



      $this.attr('href',tweetWindowUrl);
      twttr.widgets.load();
      //tweetWindow = window.open(tweetWindowUrl, '_blank', tweetWindowOptions);
    }

    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        $(element).on('click', function (e){
          if (attrs.shareAction === 'share-facebook'){
            onFacebookShare(e);
          }
          if (attrs.shareAction === 'share-twitter'){
            onTwitterShare(e);
          }
        });
      }
    };
  }]);
