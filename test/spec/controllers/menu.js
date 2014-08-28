'use strict';

describe('Controller: MenuCtrl', function () {

  // load the controller's module
  beforeEach(module('nhhApp'));

  var MenuCtrl
    , $rootScope
    , scope
    , deferred
    , mockLinksService
    , links = [
      {
        "url": "#!/",
        "title": "Home",
        "target": "",
        "text": "Home"
      },
      {
        "url": "#!/leaderboard",
        "title": "Vote Leaderboard",
        "target": "",
        "text": "Vote Leaderboard"
      },
      {
        "url": "#!/tour",
        "title": "Heisman House Tour",
        "target": "",
        "text": "Heisman House Tour"
      }
    ];

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _$rootScope_, $q) {
    $rootScope = _$rootScope_;
    deferred = $q.defer();
    mockLinksService = {
      all: function (){
        return deferred.promise;
      },
      social: function (){
        return deferred.promise;
      }
    };

    spyOn(mockLinksService, 'all').and.callThrough();
    spyOn(mockLinksService, 'social').and.callThrough();

    scope = $rootScope.$new();
    MenuCtrl = $controller('MenuCtrl', {
      $scope: scope,
      Links: mockLinksService
    });
  }));

  // initialization
  describe('initialization', function (){
    it('should make a request to Links.all()', function (){
      expect(mockLinksService.all).toHaveBeenCalled();
    });
    it('should make a request to Links.social()', function (){
      expect(mockLinksService.social).toHaveBeenCalled();
    });
  });

  // $scope.eligibility
  describe('$scope.menuLinks', function (){
    it('should not initially be defined', function () {
      expect(scope.menuLinks).toBeUndefined();
    });

    it('should be an array of links once Links.all() is resolved', function () {
      deferred.resolve(links);
      $rootScope.$apply();
      expect(scope.menuLinks).toBeDefined();
      expect(scope.menuLinks).toEqual(jasmine.any(Array));
    });
  });
});
