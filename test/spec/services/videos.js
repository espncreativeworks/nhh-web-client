'use strict';

describe('Service: Videos', function () {

  // load the service's module
  beforeEach(module('nhhApp'));

  // instantiate service
  var Videos
    , fakeHttp
    , videos = [
     {
       "id": 1,
       "name": "Flashback",
       "category": "Game Openers",
       "description": "Barry Sanders and Desmond Howard reminisce.",
       "youtubeId": "1EoJi8lPTQg",
       "thumbnail": "https://i.ytimg.com/vi/1EoJi8lPTQg/hqdefault.jpg"
     },
     {
       "id": 2,
       "name": "Car Alarm",
       "category": "Game Openers",
       "description": "Robert Griffin III one-ups Carson Palmer.",
       "youtubeId": "11eqi1OnMg4",
       "thumbnail": "https://i.ytimg.com/vi/11eqi1OnMg4/hqdefault.jpg"
     },
     {
       "id": 3,
       "name": "Quick Draw",
       "category": "Game Openers",
       "description": "Barry Sanders still has the jump on everyone.",
       "youtubeId": "vWyOzdu895M",
       "thumbnail": "https://i.ytimg.com/vi/vWyOzdu895M/hqdefault.jpg"
     }];

  beforeEach(inject(function (_Videos_, _$httpBackend_) {
    fakeHttp = _$httpBackend_;
    Videos = _Videos_;
  }));

  afterEach(function(){
    fakeHttp.verifyNoOutstandingExpectation();
    fakeHttp.verifyNoOutstandingRequest();
  });

  describe('Videos.all()', function (){
    it('should return an array of videos', function () {
      fakeHttp.expectGET('/api/videos/index.json').respond(videos);
      Videos.all().then(function (videos){
        expect(videos).toBeDefined();
      });
      fakeHttp.flush();
    });
  });

});
