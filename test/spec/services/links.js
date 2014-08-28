'use strict';

describe('Service: Links', function () {

  // load the service's module
  beforeEach(module('nhhApp'));

  // instantiate service
  var Links
    , fakeHttp
    , _links = [
      {
        "url": "#!/",
        "title": "Home",
        "target": "",
        "text": "Home"
      },
      {
        "url": "#!/leaderboard",
        "title": "Vote Leaderboard",
        "target": "",
        "text": "Vote Leaderboard"
      },
      {
        "url": "#!/tour",
        "title": "Heisman House Tour",
        "target": "",
        "text": "Heisman House Tour"
      },
      {
        "url": "http://espn.go.com/college-football/heisman14/",
        "title": "Heisman Watch",
        "target": "_blank",
        "text": "Heisman Watch"
      },
      {
        "url": "#!/rules",
        "title": "Official Rules",
        "target": "",
        "text": "Official Rules"
      }
    ];

  beforeEach(inject(function (_Links_, _$httpBackend_) {
    fakeHttp = _$httpBackend_;
    Links = _Links_;
  }));

  afterEach(function(){
    fakeHttp.verifyNoOutstandingExpectation();
    fakeHttp.verifyNoOutstandingRequest();
  });

  describe('Links.all()', function (){
    it('should return all links', function () {
      fakeHttp.expectGET('/api/links/index.json').respond(_links);
      Links.all().then(function (links){
        expect(links.length).toBe(5);
      });
      fakeHttp.flush();
    });
  });

});
