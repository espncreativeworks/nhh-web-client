'use strict';

/**
 * @ngdoc service
 * @name nhhApp.Page
 * @description
 * # Page
 * Service in the nhhApp.
 */
angular.module('nhhApp')
  .service('Page', function () {
    // Service logic
    // ...
    var defaultMeta = {
      title: 'Nissan Heisman House',
      description: 'As the presenting sponsor of the Heisman Trophy, Nissan has the unique advantage of casting an official vote on behalf of you, the college football fan. So cast your vote for the next Heisman Trophy Winner and you could win.',
      keywords: 'nissan heisman house, heisman vote, heisman watch, heisman house tour, espn heisman house'
    }, defaultBody = {
      'class': 'home'
    };



    var Meta = function _Meta(){

      this.data = defaultMeta;

      this.get = function (){
        return this.data;
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

    // Public API here
    return new Page();

  });
