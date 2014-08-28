'use strict';

describe('Directive: nhhMenu', function () {

  // load the directive's module
  beforeEach(module('nhhApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  xit('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<div nhh-menu></div>');
    element = $compile(element)(scope);
    expect(element.children()).toBe();
  }));
});
