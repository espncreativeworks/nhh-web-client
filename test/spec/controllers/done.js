'use strict';

describe('Controller: DoneCtrl', function () {

  // load the controller's module
  beforeEach(module('nhhApp'));

  var DoneCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DoneCtrl = $controller('DoneCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
