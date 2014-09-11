'use strict';

/**
 * @ngdoc service
 * @name nhhApp.Page
 * @description
 * # Page
 * Service in the nhhApp.
 */
angular.module('nhhApp')
  .service('Page', ['$rootScope', 'ngProgress', '$location', function ($rootScope, ngProgress, $location) {
    // Service logic
    // ...
    var _description = 'As the presenting sponsor of the Heisman Trophy, Nissan has the unique advantage of casting an official vote on behalf of you, the college football fan. So cast your vote for the next Heisman Trophy Winner and you could win.';

    var defaultMeta = {
      title: 'Nissan Heisman House',
      description: _description,
      keywords: 'nissan heisman house, heisman vote, heisman watch, heisman house tour, espn heisman house',
      twitter: {
        'twitter:card': 'summary_large_image',
        'twitter:site': '@ESPNPromotions',
        'twitter:creator': '@NissanUSA',
        'twitter:title': 'Nissan Heisman House',
        'twitter:description': _description,
        'image:src': 'http://a.espncdn.com/contests/nissan/heisman/2014/display/300x100.jpg'
      },
      facebook : {
        'fb:app_id': '519320781532323',
        'og:type': 'website',
        'og:url': $location.absUrl(),
        'og:site_name': 'Nissan Heisman House',
        'og:title': 'Nissan Heisman House',
        'og:description': _description,
        'og:image': 'http://a.espncdn.com/contests/nissan/heisman/2014/display/300x100.jpg'
      }
    };
    var defaultBody = {
      'class': 'home'
    };

    var nhhGold = '#ceae94';

    var Meta = function _Meta(){

      this.data = defaultMeta;

      this.get = function (key){
        if (key){
          return this.data[key];
        } else {
          return this.data;
        }
      };

      this.set = function (key, value){
        this.data[key] = value;
      };

      this.reset = function (){
        this.data = defaultMeta;
      };

    };

    var Body = function _Body(){

      this.data = defaultBody;

      this.get = function (){
        return this.data;
      };

      this.set = function (key, value){
        this.data[key] = value;
      };

      this.reset = function (){
        this.data = defaultBody;
      };

    };

    var Page = function _Page(){
      this.meta = new Meta();
      this.body = new Body();
    };

    var page = new Page();

    ngProgress.color(nhhGold);

    $rootScope.$on( '$routeChangeStart', function() {
      ngProgress.start();
    });

    $rootScope.$on( '$routeChangeSuccess', function() {
      ngProgress.complete();
    });

    // Public API here
    return page;

  }]);
