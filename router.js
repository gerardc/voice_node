var config = require("./twilio");
var c = require('twilio')(config.account_sid, config.auth_token);
var RSVP = require("rsvp");

var makeCall = RSVP.denodeify(c.makeCall.bind(c));

function dialAgent(url) {
  console.log("here");
  console.log(url);
  return makeCall({to: "client:gerard", from: "+14844364760", url: url})
    .then(function(response) {
      console.log("in here");
      return response;
    }, function(err) {
      return console.log("Error: " + err.message);
    });
};

exports.dialAgent = dialAgent;
