var xml = require('xmlbuilder');

var response = function() {
  return xml.create("Response");
};

var url = function(sid, ev) {
  return process.env.URL + "/flow/conference/customer_leg/" + sid + "/" + ev;
}

var workflow = {
  initial: {
    incoming_call: {
      name: "greeting",
      twiml: function(opts) {
        return response()
          .ele("Say", "Greeting").up()
          .ele("Redirect", url(opts.sid, "greeted"))
          .end()
      }
    }
  },
  greeting: {
    greeted: {
      name: "queued",
      twiml: function(opts) {
        return response()
          .ele("Enqueue", { waitUrl: url(opts.sid, "routing") }, "queue-1").up()
          .ele("Dial").ele("Client", "gerard")
          .end()
      },
    }
  },
  queued: {
    routing: {
      name: "routing",
      twiml: function(opts) {
        return response()
          .ele("Say", "leaving the queue").up()
          .ele("Leave")
          .end()
      },
    }
  }
};

module.exports = workflow;
