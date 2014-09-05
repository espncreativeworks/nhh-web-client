'use strict';

describe('Service: Ballot', function () {

  // load the service's module
  beforeEach(module('nhhApp'));

  // instantiate service
  var Ballot;
  beforeEach(inject(function (_Ballot_) {
    Ballot = _Ballot_;
  }));

  it('should do something', function () {
    expect(!!Ballot).toBe(true);
  });

});
