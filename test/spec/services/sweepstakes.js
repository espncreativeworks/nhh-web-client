'use strict';

describe('Service: Sweepstakes', function () {

  // load the service's module
  beforeEach(module('nhhApp'));

  // instantiate service
  var Sweepstakes
    , fakeHttp
    , status = {
      eligibility: true
    };

  beforeEach(inject(function (_Sweepstakes_, _$httpBackend_) {
    fakeHttp = _$httpBackend_;
    Sweepstakes = _Sweepstakes_;
  }));

  afterEach(function(){
    fakeHttp.verifyNoOutstandingExpectation();
    fakeHttp.verifyNoOutstandingRequest();
  });

  describe('Sweepstakes.status()', function (){
    it('should return a status', function () {
      fakeHttp.expectGET('/api/sweepstakes/status.json').respond(status);
      Sweepstakes.status().then(function (status){
        expect(status).toBeDefined();
      });
      fakeHttp.flush();
    });
  });

});
