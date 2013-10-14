var xml = require('xmlbuilder');

var baseUrl = "/flow/conference/customer_leg/";

function response() {
  return xml.create("Response");
};

function url(sid, ev) {
  return baseUrl + sid + "/" + ev;
};

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
        .ele("Enqueue", { waitUrl: url(opts.sid, "waiting") }, "queue-1").up()
        .ele("Dial").ele("Client", "gerard")
        .end()
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
