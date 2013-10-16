var store = require("../store");
var utils = require("../workflows/common");
var _ = require("underscore");

var afterCallback = utils.runCallback("after");
var beforeCallback = utils.runCallback("before");

function getState(workflow, key) {
  return workflow[key];
};

function getWorkflow(type, name) {
  return require(["../workflows", type, name].join("/"));
}

function save(sid, req, twiml, state) {
  store.write(sid, {
    request: {
      query: req.query,
      body: req.body
    },
    twiml: twiml,
    state: state
  });
};

function read(req, res) {
  return store.read_full(req.params.sid).then(function(value) {
    res.set({'Content-Type': 'application/json'})
    res.send(JSON.stringify(value));
  });
}

function runWorkflow(req, res, state) {
  var sid = req.body.CallSid;
  store.read(sid).then(function(leg) {
    var twiml = state.twiml({sid: sid, number: "1234"}).toString();

    console.log(req.query);
    console.log(req.body);
    console.log(twiml);

    beforeCallback(state, leg);

    save(sid, req, twiml, state.name);

    res.set({'Content-Type': 'text/xml'})
    res.send(twiml);

    afterCallback(state, leg);
  });
}

function incoming(req, res){
  var w = getWorkflow("conference", "customer_leg");
  return runWorkflow(req, res, getState(w, "incoming_call"));
};

function flow(req, res){
  var w = getWorkflow(req.params.type, req.params.name);
  return runWorkflow(req, res, getState(w, req.params.event));
};

exports.incoming = incoming;
exports.flow = flow;
exports.read = read;