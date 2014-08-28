'use strict';

describe('Controller: BallotCtrl', function () {

  // load the controller's module
  beforeEach(module('nhhApp'));

  var BallotCtrl
    , $rootScope
    , scope
    , deferred
    , mockAthletesService
    , athletes = [
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
      }, {
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

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, _$rootScope_, $q) {
    $rootScope = _$rootScope_;
    deferred = $q.defer();
    mockAthletesService = {
      active: function (){
        return deferred.promise;
      }
    };

    spyOn(mockAthletesService, 'active').and.callThrough();

    scope = $rootScope.$new();
    BallotCtrl = $controller('BallotCtrl', {
      $scope: scope,
      Athletes: mockAthletesService
    });
  }));

  // initialization
  describe('initialization', function (){
    it('should make a request to Athletes.active()', function (){
      expect(mockAthletesService.active).toHaveBeenCalled();
    });
  });

  // athletes
  describe('$scope.athletes', function (){
    it('should not initially have a "athletes" property', function () {
      expect(scope.athletes).toBeUndefined();
    });

    it('should have an "athletes" property once Athletes.active() is resolved', function () {
      deferred.resolve(athletes);
      $rootScope.$apply();
      expect(scope.athletes).toBeDefined();
    });

    it('should have at least one athlete', function () {
      deferred.resolve(athletes);
      $rootScope.$apply();
      expect(scope.athletes.length).toBeGreaterThan(0);
    });

    it('should contain only active athletes', function () {
      var _activeAthletes = athletes.filter(function (athlete){
        return athlete.active;
      });
      deferred.resolve(_activeAthletes);
      $rootScope.$apply();
      scope.athletes.forEach(function (athlete){
        expect(athlete.active).toBeTruthy();
      });
    });
  });

  // $scope.athletes[i]
  describe('$scope.athletes[i]', function (){
    it('should contain an athlete with a property "active"', function () {
      deferred.resolve(athletes);
      $rootScope.$apply();
      var athlete = scope.athletes[0];
      expect(athlete.active).toBeDefined();
    });

    it('should contain an athlete with a property "name"', function () {
      deferred.resolve(athletes);
      $rootScope.$apply();
      var athlete = scope.athletes[0];
      expect(athlete.name).toBeDefined();
    });

    it('should contain an athlete with a valid "name" object', function () {
      deferred.resolve(athletes);
      $rootScope.$apply();
      var athlete = scope.athletes[0];
      expect(athlete.name).toEqual(jasmine.objectContaining({
        "first": jasmine.any(String),
        "last": jasmine.any(String),
        "short": jasmine.any(String)
      }));
    });

    it('should contain an athlete with a property "position"', function () {
      deferred.resolve(athletes);
      $rootScope.$apply();
      var athlete = scope.athletes[0];
      expect(athlete.position).toBeDefined();
    });

    it('should contain an athlete with a valid "position" object', function () {
      deferred.resolve(athletes);
      $rootScope.$apply();
      var athlete = scope.athletes[0];
      expect(athlete.position).toEqual(jasmine.objectContaining({
        "abbreviation": jasmine.any(String),
        "name": jasmine.any(String)
      }));
    });

    it('should contain an athlete with a property "jersey"', function () {
      deferred.resolve(athletes);
      $rootScope.$apply();
      var athlete = scope.athletes[0];
      expect(athlete.jersey).toBeDefined();
    });

    it('should contain an athlete with a valid "jersey" number', function () {
      deferred.resolve(athletes);
      $rootScope.$apply();
      var athlete = scope.athletes[0];
      expect(athlete.jersey).toEqual(jasmine.any(Number));
    });

    it('should contain an athlete with a property "experience"', function () {
      deferred.resolve(athletes);
      $rootScope.$apply();
      var athlete = scope.athletes[0];
      expect(athlete.experience).toBeDefined();
    });

    it('should contain an athlete with a valid "experience" object', function () {
      deferred.resolve(athletes);
      $rootScope.$apply();
      var athlete = scope.athletes[0];
      expect(athlete.experience).toEqual(jasmine.objectContaining({
        "abbreviation": jasmine.any(String),
        "name": jasmine.any(String),
        "count": jasmine.any(Number)
      }));
    });

    it('should contain an athlete with a property "school"', function () {
      deferred.resolve(athletes);
      $rootScope.$apply();
      var athlete = scope.athletes[0];
      expect(athlete.school).toBeDefined();
    });

    it('should contain an athlete with a valid "school" object', function () {
      deferred.resolve(athletes);
      $rootScope.$apply();
      var athlete = scope.athletes[0];
      expect(athlete.school).toEqual(jasmine.objectContaining({
        "espnId": jasmine.any(String),
        "abbreviation": jasmine.any(String),
        "name": jasmine.any(String),
        "primaryColor": jasmine.any(String)
      }));
    });
  });

});
