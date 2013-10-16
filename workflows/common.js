var xml = require('xmlbuilder');
var url = require('url');

function argsToArray(a) {
  return Array.prototype.slice.call(a);
}

exports.response = function() {
  return xml.create("Response");
};

exports.buildUrl = function() {
  var base = argsToArray(arguments);
  return function(ev, opts) {
    return url.format({
      protocol: "http",
      hostname: process.env.HOST,
      pathname: base.concat([ev]).join("/"),
      query: opts || {}
    });
  };
};

exports.runCallback = function(type) {
  return function(state, leg) {
    return state.hasOwnProperty(type) && state[type](leg);
  }
};

exports.callAttr = function(leg) {
  return function(key) {
    return leg.request.body.hasOwnProperty(key) && leg.request.body[key];
  }
}
