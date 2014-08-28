'use strict';

xdescribe('Directive: showcaseCarousel', function () {

  // load the directive's module
  beforeEach(module('nhhApp'));

  // load the template
  //beforeEach(module('app/partials/showcase-carousel.html'));

  var element
    , scope
    , $httpBackend
    , tpl
    , _slides = {
    'Game Openers': [
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
      }
    ]
  };

  beforeEach(inject(function ($rootScope, _$httpBackend_) {
    scope = $rootScope.$new();
    scope.category = 'Game Opener';
    scope.slides = _slides;
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('partials/showcase-carousel.html').respond(200, '' +
      '<div class="row" ng-if="!isMobile">' +
        '<div class="col-xs-12 col-sm-4 headings">' +
          '<h3 class="heading-label">Video</h3>' +
          '<h2 class="heading">{{category}}</h2>' +
        '</div>' +
        '<div class="col-xs-12 col-sm-8 videos-items">' +
          '<ul class="nhh-carousel" rn-carousel rn-carousel-control>' +
            '<li class="nhh-slide" ng-repeat="slide in slides[category]">' +
              '<div class="nhh-slide-item" ng-repeat="video in slide">' +
                '<a href="" ng-href="{{video.thumbnail}}" title="{{video.title}}" style="background-image: url({{video.thumbnail}})">' +
                  '<span class="text-hide">{{video.description}}</span>' +
                '</a>' +
              '</div>' +
            '</li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="row" ng-if="isMobile">' +
        '<div class="col-xs-12 col-sm-4 headings">' +
          '<h3 class="heading-label">Video</h3>' +
          '<h2 class="heading">{{category}}</h2>' +
        '</div>' +
        '<div class="col-xs-12 col-sm-8 videos-items">' +
          '<ul class="nhh-carousel" rn-carousel rn-carousel-control>' +
            '<li class="nhh-slide" ng-repeat="video in videos">' +
              '<div class="nhh-slide-item">' +
                '<a href="" ng-href="{{video.thumbnail}}" title="{{video.title}}" style="background-image: url({{video.thumbnail}})">' +
                  '<span class="text-hide">{{video.description}}</span>' +
                '</a>' +
              '</div>' +
            '</li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
    '');
  }));

   afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

  it('should create two child nodes', inject(function ($compile) {
    tpl = angular.element('<showcase-carousel></showcase-carousel>');
    element = $compile(tpl)(scope);
    $httpBackend.flush();
    scope.$digest();
    expect(element.children().length).toBe(2);
  }));
});
