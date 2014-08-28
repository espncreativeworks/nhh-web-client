'use strict';

describe('Controller: ThanksCtrl', function () {

  // load the controller's module
  beforeEach(module('nhhApp'));

  var ThanksCtrl
    , $rootScope
    , scope
    , deferred
    , mockSweepstakesService
    , status = {
      eligibility: true
    };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _$rootScope_, $q) {
    $rootScope = _$rootScope_;
    deferred = $q.defer();
    mockSweepstakesService = {
      status: function (){
        return deferred.promise;
      }
    };

    spyOn(mockSweepstakesService, 'status').and.callThrough();

    scope = $rootScope.$new();
    ThanksCtrl = $controller('ThanksCtrl', {
      $scope: scope,
      Sweepstakes: mockSweepstakesService
    });
  }));

  // initialization
  describe('initialization', function (){
    it('should make a request to Sweepstakes.status()', function (){
      expect(mockSweepstakesService.status).toHaveBeenCalled();
    });
  });

  // $scope.eligibility
  describe('$scope.eligibility', function (){
    it('should not initially have a "eligibility" property', function () {
      expect(scope.eligibility).toBeUndefined();
    });

    it('should have an "eligibility" property once Sweepstakes.status() is resolved', function () {
      deferred.resolve(status);
      $rootScope.$apply();
      expect(scope.eligibility).toBeDefined();
    });
  });
});
