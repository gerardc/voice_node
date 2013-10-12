var config = require("../twilio.json")
var twilio = require('twilio');

/*
 * GET home page.
 */

exports.index = function(req, res){
  var token = new twilio.Capability(config.account_sid, config.auth_token);
  token.allowClientIncoming(req.params["client_name"]);

  res.render('index', {token: token.generate()});
};