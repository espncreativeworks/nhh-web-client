'use strict';

describe('Filter: ordinalize', function () {

  // load the filter's module
  beforeEach(module('nhhApp'));

  // initialize a new instance of the filter before each test
  var ordinalize;
  beforeEach(inject(function ($filter) {
    ordinalize = $filter('ordinalize');
  }));

  it('should return the input prefixed with "ordinalize filter:"', function () {
    var text = 'angularjs';
    expect(ordinalize(text)).toBe('ordinalize filter: ' + text);
  });

});
