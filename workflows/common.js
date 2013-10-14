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
    return "/" + base.concat(argsToArray(arguments)).join("/");
  };
};

exports.run_callback = function(type) {
  return function(state, leg) {
    state.hasOwnProperty(type) && state["type"](leg);
  }
}
