'use strict';

describe('Controller: TourstopdetailCtrl', function () {

  // load the controller's module
  beforeEach(module('nhhApp'));

  var TourstopdetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TourstopdetailCtrl = $controller('TourstopdetailCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
