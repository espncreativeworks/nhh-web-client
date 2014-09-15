'use strict';

describe('Filter: inlineAddress', function () {

  // load the filter's module
  beforeEach(module('nhhApp'));

  // initialize a new instance of the filter before each test
  var inlineAddress;
  beforeEach(inject(function ($filter) {
    inlineAddress = $filter('inlineAddress');
  }));

  it('should return the input prefixed with "inlineAddress filter:"', function () {
    var text = 'angularjs';
    expect(inlineAddress(text)).toBe('inlineAddress filter: ' + text);
  });

});
