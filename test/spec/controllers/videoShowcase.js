'use strict';

describe('Controller: VideoListCtrl', function () {
  // load the controller's module
  beforeEach(module('nhhApp'));

  var $rootScope
    , VideoShowcaseCtrl
    , scope
    , deferred
    , mockVideosService
    , videos = [
     {
       "id": 1,
       "name": "Flashback",
       "category": "Game Openers",
       "description": "Barry Sanders and Desmond Howard reminisce.",
       "youtubeId": "1EoJi8lPTQg",
       "thumbnail": "https://i.ytimg.com/vi/1EoJi8lPTQg/hqdefault.jpg"
     },
     {
       "id": 2,
       "name": "Car Alarm",
       "category": "Game Openers",
       "description": "Robert Griffin III one-ups Carson Palmer.",
       "youtubeId": "11eqi1OnMg4",
       "thumbnail": "https://i.ytimg.com/vi/11eqi1OnMg4/hqdefault.jpg"
     },
     {
       "id": 3,
       "name": "Quick Draw",
       "category": "Game Openers",
       "description": "Barry Sanders still has the jump on everyone.",
       "youtubeId": "vWyOzdu895M",
       "thumbnail": "https://i.ytimg.com/vi/vWyOzdu895M/hqdefault.jpg"
     }];

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _$rootScope_, $q) {
    $rootScope = _$rootScope_;
    deferred = $q.defer();
    mockVideosService = {
      all: function (){
        return deferred.promise;
      }
    };

    spyOn(mockVideosService, 'all').and.callThrough();

    scope = $rootScope.$new();
    VideoShowcaseCtrl = $controller('VideoShowcaseCtrl', {
      $scope: scope,
      Videos: mockVideosService
    });

  }));

  describe('initialization', function (){
    it('should make a request to Videos.all()', function (){
      expect(mockVideosService.all).toHaveBeenCalled();
    });
  });

  // Slides
  describe('$scope.slides', function (){
    it('should not initially have a "slides" property', function () {
      expect(scope.slides).toBeUndefined();
    });

    it('should have a "slides" property once Videos.all() is resolved', function () {
      deferred.resolve(videos);
      $rootScope.$apply();
      expect(scope.slides).toBeDefined();
    });

    it('should have at least one slide', function () {
      deferred.resolve(videos);
      $rootScope.$apply();
      expect(Object.keys(scope.slides).length).toBeGreaterThan(0);
    });

    it('should contain a slide with a property "Game Openers"', function () {
      deferred.resolve(videos);
      $rootScope.$apply();
      expect(scope.slides['Game Openers']).toBeDefined();
    });
  });

  // Categories
  describe('$scope.categories', function (){
    it('should have a "categories" property once Videos.all() is resolved', function () {
      deferred.resolve(videos);
      $rootScope.$apply();
      expect(scope.categories).toBeDefined();
    });

    it('should have at least one category', function () {
      deferred.resolve(videos);
      $rootScope.$apply();
      expect(scope.categories.length).toBeGreaterThan(0);
    });

    it('should contain a category with the value of "Game Openers"', function () {
      deferred.resolve(videos);
      $rootScope.$apply();
      expect(scope.categories[0]).toBe('Game Openers');
    });
  });

});
