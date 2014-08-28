'use strict';

describe('Service: Votes', function () {

  // load the service's module
  beforeEach(module('nhhApp'));

  // instantiate service
  var Votes;
  beforeEach(inject(function (_Votes_) {
    Votes = _Votes_;
  }));

  it('should do something', function () {
    expect(!!Votes).toBe(true);
  });

});
