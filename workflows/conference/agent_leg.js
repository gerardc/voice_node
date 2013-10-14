var util = require("../common");

var url = util.build_url("flow", "conference", "agent_leg");
var response = util.response;

var workflow = {
  incoming_call: {
    name: "greeting",
    twiml: function(opts) {
      return response()
        .ele("Say", "Greeting").up()
        .ele("Redirect", url(opts.sid, "greeted"))
        .end()
    }
  },
  greeted: {
    name: "queued",
    twiml: function(opts) {
      return response()
        .ele("Enqueue", { waitUrl: url(opts.sid, "waiting") }, "queue-1") .end()
    },
    after: function(opts) {
      console.log("I'm here");
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
