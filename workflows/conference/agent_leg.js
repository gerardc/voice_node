var util = require("../common");

var url = util.buildUrl("flow", "conference", "agent_leg");
var response = util.response;

var workflow = {
  agent_picks_up: {
    name: "agent_in_conference",
    twiml: function(opts) {
      return response()
        .ele("Say", "Testing").up()
        .ele("Dial")
          .ele("Queue", "queue-1")
        .end()
    }
  },
};

module.exports = workflow;
