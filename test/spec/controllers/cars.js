'use strict';

xdescribe('Controller: CarsCtrl', function () {

  // load the controller's module
  beforeEach(module('nhhApp'));

  var CarsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CarsCtrl = $controller('CarsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
