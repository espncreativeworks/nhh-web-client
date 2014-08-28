'use strict';

describe('Directive: nhhShare', function () {

  // load the directive's module
  beforeEach(module('nhhApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<nhh-share></nhh-share>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the nhhShare directive');
  }));
});
