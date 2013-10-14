var w = require("../workflows/conference/customer_leg");
var store = require("../store");

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
  var twiml = state.twiml({sid: sid, number: "1234"}).toString();

  console.log(req.body);
  console.log(twiml);

  save(sid, req.body, twiml, state.name);

  res.set({'Content-Type': 'text/xml'})
  res.send(twiml);
}

function incomingCall(req, res){
  return run_workflow(req, res, nextState(w, "incoming_call"));
};

function flow(req, res){
  return run_workflow(req, res, nextState(w, req.params.event));
};

exports.incomingCall = incomingCall;
exports.flow = flow;