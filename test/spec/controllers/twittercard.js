'use strict';

describe('Controller: TwittercardCtrl', function () {

  // load the controller's module
  beforeEach(module('nhhApp'));

  var TwittercardCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TwittercardCtrl = $controller('TwittercardCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
