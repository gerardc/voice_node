require "bundler/setup"
require "twilio-ruby"
require "json"

task :config_twilio do
  twilio_config = JSON.parse(IO.read("twilio.json"))

  account_sid = (ENV["ACCOUNT_SID"] || twilio_config["account_sid"])
  auth_token = (ENV["AUTH_TOKEN"] || twilio_config["auth_token"])
  phone_sid = (ENV["PHONE_SID"] || twilio_config["phone_sid"])

  url = ENV["URL"] + "/incoming_call"
  fallback_url = ENV["URL"] + "/on_exception"
  status_callback = ENV["URL"] + "/incoming_call_ended"

  @client = Twilio::REST::Client.new account_sid, auth_token
  @number = @client.account.incoming_phone_numbers.get(phone_sid)

  puts "Updating #{phone_sid} (#{@number.phone_number}) to point to: #{url}"
  @number.update(
    :voice_url => url,
    :voice_fallback_url => fallback_url,
    :status_callback => status_callback,
  )
end
