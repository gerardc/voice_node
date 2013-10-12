var c = require("redis").createClient();
var _ = require("underscore");
var RSVP = require("rsvp");

var lindex = RSVP.denodeify(c.lindex.bind(c));
var lrange = RSVP.denodeify(c.lrange.bind(c));
var lpush = RSVP.denodeify(c.lpush.bind(c));

function read(key) {
  return lindex(key, 0)
    .then(function(reply) {
      return JSON.parse(reply);
    });
};

function read_full(key) {
  return lrange(key, 0, -1)
    .then(function(reply) {
      return reply;
    });
};

function write(key, value) {
  return lpush(key, JSON.stringify(value))
    .then(function(reply) {
      return reply;
    });
};

exports.read = read;
exports.read_full = read_full;
exports.write = write;
