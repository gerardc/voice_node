var w = require("../workflows/conference/customer_leg");
var store = require("../store");

function nextState(workflow, state, ev) {
  return workflow[state][ev];
};

function save(sid, body, twiml, state) {
  store.write(sid, {
    body: body,
    twiml: twiml,
    state: state
  });
};

exports.incoming_call = function(req, res){
  var sid = req.body.CallSid;

  s = nextState(w, "initial", "incoming_call");
  twiml = s.twiml({sid: sid, number: "1234"}).toString();

  console.log(req.body);
  console.log(twiml);

  save(sid, req.body, twiml, s.name);

  res.set({ 'Content-Type': 'text/xml' })
  res.send(twiml);
};

exports.flow = function(req, res){
  var sid = req.body.CallSid;

  store.read(sid)
    .then(function(value) {
      console.log("value is: " + value.state);
      var s = nextState(w, value.state, req.params.event);
      var twiml = s.twiml({sid: sid, number: "1234"}).toString();

      console.log(req.body);
      console.log(twiml);

      save(sid, req.body, twiml, s.name);

      res.set({ 'Content-Type': 'text/xml' })
      res.send(twiml);
    })
};