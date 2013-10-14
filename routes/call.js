var w = require("../workflows/conference/customer_leg");
var store = require("../store");
var utils = require("../workflows/common");

var after_callback = utils.run_callback("after");
var before_callback = utils.run_callback("before");

function nextState(workflow, key) {
  return workflow[key];
};

function save(sid, body, twiml, state) {
  store.write(sid, {
    body: body,
    twiml: twiml,
    state: state
  });
};

function run_workflow(req, res, state) {
  var sid = req.body.CallSid;
  store.read(sid).then(function(leg) {
    var twiml = state.twiml({sid: sid, number: "1234"}).toString();

    console.log(req.body);
    console.log(twiml);

    before_callback(state, leg);

    save(sid, req.body, twiml, state.name);

    res.set({'Content-Type': 'text/xml'})
    res.send(twiml);

    after_callback(state, leg);
  });
}

function incomingCall(req, res){
  return run_workflow(req, res, nextState(w, "incoming_call"));
};

function flow(req, res){
  return run_workflow(req, res, nextState(w, req.params.event));
};

exports.incomingCall = incomingCall;
exports.flow = flow;