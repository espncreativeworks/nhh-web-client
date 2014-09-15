'use strict';

/**
 * @ngdoc service
 * @name nhhApp.Page
 * @description
 * # Page
 * Service in the nhhApp.
 */
angular.module('nhhApp')
  .service('Page', ['$rootScope', 'ngProgress', '$location', 'underscore', function ($rootScope, ngProgress, $location, _) {
    // Service logic
    // ...
    var _description = 'As the presenting sponsor of the Heisman Trophy, Nissan has the unique advantage of casting an official vote on behalf of you, the college football fan. So cast your vote for the next Heisman Trophy Winner and you could win.';
    var suffix = ' | Nissan Heisman House';
    var defaultMeta = {
      title: 'Welcome to the Nissan Heisman House',
      description: _description,
      keywords: 'nissan heisman house, heisman vote, heisman watch, heisman house tour, espn heisman house',
      twitter: {
        'twitter:card': 'summary_large_image',
        'twitter:site': '@ESPNPromotions',
        'twitter:creator': '@NissanUSA',
        'twitter:title': 'Nissan Heisman House',
        'twitter:description': _description,
        'twitter:image:src': 'http://a.espncdn.com/contests/nissan/heisman/2014/display/917x204.jpg'
      },
      facebook : {
        'og:type': 'website',
        'og:url': $location.absUrl(),
        'og:site_name': 'Nissan Heisman House',
        'og:title': 'Nissan Heisman House',
        'og:description': _description,
        'og:image': 'http://a.espncdn.com/contests/nissan/heisman/2014/display/100x100.jpg'
      }
    };
    var defaultBody = {
      'class': 'home'
    };

    var nhhGold = '#ceae94';

    var Meta = function _Meta(){

      this.data = angular.copy(defaultMeta);

      this.get = function (key){
        if (key){
          return this.data[key];
        } else {
          return this.data;
        }
      };

      this.set = function (key, value, opts){
        var self = this;
        if (key === 'title'){
          if (opts && opts.suffix === false){
            self.data[key] = value;
          } else {
            // add suffix by default
            self.data[key] = value + suffix;
          }
        } else {
          self.data[key] = value;
        }
      };

      this.reset = function (){
        var self = this;
        _.each(_.keys(defaultMeta), function (key){
          self.set(key, defaultMeta[key]);
        });
      };

    };

    var Body = function _Body(){

      this.data = angular.copy(defaultBody);

      this.get = function (key){
        if (key){
          return this.data[key];
        } else {
          return this.data;
        }
      };

      this.set = function (key, value){
        var self = this;
        self.data[key] = value;
      };

      this.reset = function (){
        var self = this;

        _.each(_.keys(defaultBody), function (key){
          self.set(key, defaultBody[key]);
        });
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

    $rootScope.$on( '$routeChangeError', function() {
      ngProgress.complete();
    });

    // Public API here
    return page;

  }]);
