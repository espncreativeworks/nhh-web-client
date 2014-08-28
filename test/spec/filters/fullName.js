'use strict';

describe('Filter: fullName', function () {

  // load the filter's module
  beforeEach(module('nhhApp'));

  // initialize a new instance of the filter before each test
  var fullName;
  beforeEach(inject(function ($filter) {
    fullName = $filter('fullName');
  }));

  it('should return the first name and last name seperated by a space', function () {
    var name = {
      "first": "Marcus",
      "last": "Mariota",
      "short": "M. Mariota"
    };
    expect(fullName(name)).toBe('Marcus Mariota');
  });

});
