'use strict';

describe('Service: Athletes', function () {

  // load the service's module
  beforeEach(module('nhhApp'));

  // instantiate service
  var Athletes
    , fakeHttp
    , _athletes = [
      {
        "id": 1,
        "espnId": "511459",
        "active": true,
        "name": {
          "first": "Marcus",
          "last": "Mariota",
          "short": "M. Mariota"
        },
        "position": {
          "abbreviation": "QB",
          "name": "Quarterback"
        },
        "jersey": 8,
        "experience": {
          "abbreviation": "JR",
          "name": "Junior",
          "count": 2
        },
        "school": {
          "espnId": "2483",
          "abbreviation": "ORE",
          "name": "Oregon",
          "primaryColor": "#022000"
        }
      },
      {
        "id": 2,
        "espnId": "530308",
        "active": true,
        "name": {
          "first": "Jameis",
          "last": "Winston",
          "short": "J. Winston"
        },
        "position": {
          "abbreviation": "QB",
          "name": "Quarterback"
        },
        "jersey": 5,
        "experience": {
          "abbreviation": "SO",
          "name": "Sophomore",
          "count": 1
        },
        "school": {
          "espnId": "52",
          "abbreviation": "FSU",
          "name": "Florida State",
          "primaryColor": "#7f001b"
        }
      },
      {
        "id": 3,
        "espnId": "534669",
        "active": true,
        "name": {
          "first": "Todd",
          "last": "Gurley",
          "short": "T. Gurley"
        },
        "position": {
          "abbreviation": "RB",
          "name": "Running Back"
        },
        "jersey": 3,
        "experience": {
          "abbreviation": "JR",
          "name": "Junior",
          "count": 2
        },
        "school": {
          "espnId": "61",
          "abbreviation": "UGA",
          "name": "Georgia",
          "primaryColor": "#a0000b"
        }
      },
      {
        "id": -1,
        "espnId": "999999",
        "active": false,
        "name": {
          "first": "John",
          "last": "Doe",
          "short": "J. Doe"
        },
        "position": {
          "abbreviation": "RB",
          "name": "Running Back"
        },
        "jersey": 3,
        "experience": {
          "abbreviation": "JR",
          "name": "Junior",
          "count": 2
        },
        "school": {
          "espnId": "61",
          "abbreviation": "UGA",
          "name": "Georgia",
          "primaryColor": "#a0000b"
        }
      }
    ];

  beforeEach(inject(function (_Athletes_, _$httpBackend_) {
    fakeHttp = _$httpBackend_;
    Athletes = _Athletes_;
  }));

  afterEach(function(){
    fakeHttp.verifyNoOutstandingExpectation();
    fakeHttp.verifyNoOutstandingRequest();
  });

  describe('Atletes.all()', function (){
    it('should return all athletes', function () {
      fakeHttp.expectGET('/api/athletes/index.json').respond(_athletes);
      Athletes.all().then(function (_athletes){
        expect(_athletes.length).toBe(4);
      });
      fakeHttp.flush();
    });
  });

  describe('Atletes.active()', function (){
    it('should return active athletes', function () {
      var _activeAthletes = _athletes.filter(function (athlete){
        return athlete.active;
      });
      fakeHttp.expectGET('/api/athletes/index.json').respond(_activeAthletes);
      Athletes.active().then(function (athletes){
        expect(athletes.length).toBe(3);
      });
      fakeHttp.flush();
    });
  });

});
