'use strict';

describe('Service: Page', function () {

  // load the service's module
  beforeEach(module('nhhApp'));

  // instantiate service
  var Page
    , meta
    , body;

  beforeEach(inject(function (_Page_) {
    Page = _Page_;
    meta = {
      title: "Nissan Heisman House",
      description: "As the presenting sponsor of the Heisman Trophy, Nissan has the unique advantage of casting an official vote on behalf of you, the college football fan. So cast your vote for the next Heisman Trophy Winner and you could win.",
      keywords: 'nissan heisman house, heisman vote, heisman watch, heisman house tour, espn heisman house'
    };
    body = {
      "class": "home"
    };
  }));

  describe('Page.meta', function (){
    it('should expose Meta.get(), Meta.set() methods', function () {
      expect(Page.meta.get).toBeDefined();
      expect(Page.meta.set).toBeDefined();
    });

    it('should return the current meta object when Page.meta.get() is invoked', function () {
      expect(Page.meta.get()).toEqual(meta);
    });

    it('should update the current meta object when Page.meta.get() is invoked with a key and a value', function () {
      var key = "title"
        , value = "Thanks for Voting";

      Page.meta.set(key, value);
      expect(Page.meta.get().title).toEqual(value);
    });
  });

  describe('Page.body', function (){
    it('should expose Body.get(), Body.set() methods', function () {
      expect(Page.body.get).toBeDefined();
      expect(Page.body.set).toBeDefined();
    });

    it('should return the current body object when Page.body.get() is invoked', function () {
      expect(Page.body.get()).toEqual(body);
    });

    it('should update the current body object when Page.body.set() is invoked with a key and a value', function () {
      var key = "class"
        , value = "thanks";

      Page.body.set(key, value);
      expect(Page.body.get()["class"]).toEqual(value);
    });
  });

});
