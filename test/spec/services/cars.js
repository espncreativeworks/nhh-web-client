'use strict';

describe('Service: Cars', function () {

  // load the service's module
  beforeEach(module('nhhApp'));

  // instantiate service
  var Cars;
  beforeEach(inject(function (_Cars_) {
    Cars = _Cars_;
  }));

  it('should do something', function () {
    expect(!!Cars).toBe(true);
  });

});
