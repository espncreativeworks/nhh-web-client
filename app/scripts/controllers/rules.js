'use strict';

/**
 * @ngdoc function
 * @name nhhApp.controller:RulesCtrl
 * @description
 * # RulesCtrl
 * Controller of the nhhApp
 */
angular.module('nhhApp')
  .controller('RulesCtrl', ['$scope', 'Page', function ($scope, Page) {
    Page.meta.set('title', 'Official Rules');
    Page.body.set('class', 'info rules');
  }]);
