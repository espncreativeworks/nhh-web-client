'use strict';

describe('Service: TourStops', function () {

  // load the service's module
  beforeEach(module('nhhApp'));

  // instantiate service
  var TourStops;
  beforeEach(inject(function (_TourStops_) {
    TourStops = _TourStops_;
  }));

  it('should do something', function () {
    expect(!!TourStops).toBe(true);
  });

});
