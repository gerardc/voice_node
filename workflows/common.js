var xml = require('xmlbuilder');

function argsToArray(a) {
  return Array.prototype.slice.call(a);
}

exports.response = function() {
  return xml.create("Response");
};

exports.buildUrl = function() {
  var base = argsToArray(arguments);
  return function() {
    return process.env.URL + "/" + base.concat(argsToArray(arguments)).join("/");
  };
};

exports.runCallback = function(type) {
  return function(state, leg) {
    return state.hasOwnProperty(type) && state[type](leg);
  }
};

exports.callAttr = function(leg) {
  return function(key) {
    return leg.body.hasOwnProperty(key) && leg.body[key];
  }
}
