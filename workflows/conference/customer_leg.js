var util = require("../common");
var router = require("../../router");

var url = util.buildUrl("flow", "conference", "customer_leg");
var agentUrl = util.buildUrl("flow", "conference", "agent_leg");
var response = util.response;

var workflow = {
  incoming_call: {
    name: "greeting",
    twiml: function(opts) {
      return response()
        .ele("Say", "Greeting").up()
        .ele("Redirect", url("greeted"))
        .end()
    }
  },
  greeted: {
    name: "queued",
    twiml: function(opts) {
      return response()
        .ele("Enqueue", { waitUrl: url("waiting") }, "queue-1").up()
        .ele("Dial").ele("Client", "gerard")
        .end()
    },
    after: function(leg) {
      var sid = util.callAttr(leg)("CallSid");
      return router.dialAgent(agentUrl("agent_picks_up", { incoming_sid: sid }));
    }
  },
  waiting: {
    name: "queued",
    twiml: function(opts) {
      return response()
        .ele("Play", 'http://com.twilio.music.classical.s3.amazonaws.com/ith_brahms-116-4.mp3').end()
    }
  }
};

module.exports = workflow;
