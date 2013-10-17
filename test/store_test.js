var assert = require("assert");
var store = require("../store");

describe('Store', function(){
  beforeEach(function(done) {
    var c = require("redis").createClient();
    c.flushall(done);
  });

  describe('write', function(){
    describe("a new value", function() {
      it('can be written and then read', function(done){
        store.write("blah", 5)
          .then(function(val) {
            return store.read("blah");
          })
          .then(function(val) {
            assert.equal(5, val);
            done();
          });
      });
    });
    describe("an existing value", function() {
      it('can be written and then read', function(done){
        store.write("blah", 5)
          .then(function() {
            return store.write("blah", 10);
          })
          .then(function() {
            return store.read("blah");
          })
          .then(function(val) {
            assert.equal(10, val);
            done();
          });
      });
    });
  });
  describe('read_full', function(){
    it('returns an array of all values', function(done){
      store.write("blah", 5)
        .then(function() {
          return store.write("blah", 10);
        })
        .then(function() {
          return store.read_full("blah");
        })
        .then(function(val) {
          assert.deepEqual([10, 5], val);
          done();
        });
    });
  });
})

