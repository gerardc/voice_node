var request = require("supertest");
var app = require("../app").app;

describe('GET /blah', function(){
  it('respond with json', function(done){
    request(app)
    .get('/blah')
    .expect(200, done);
  })
})

describe('POST /flow/conference/customer_leg/incoming_call', function(){
  it('respond with json', function(done){
    request(app)
    .post('/flow/conference/customer_leg/incoming_call')
    .expect(200, '<?xml version="1.0"?><Response><Say>Greeting</Say><Redirect>http:flow/conference/customer_leg/greeted</Redirect></Response>', done);
  })
})

describe('POST /flow/conference/customer_leg/greeted', function(){
  it('respond with json', function(done){
    request(app)
    .post('/flow/conference/customer_leg/greeted')
    .expect(200, '<?xml version="1.0"?><Response><Enqueue waitUrl="http:flow/conference/customer_leg/waiting">queue-1</Enqueue><Dial><Client>gerard</Client></Dial></Response>', done);
  })
})

describe('POST /flow/conference/customer_leg/waiting', function(){
  it('respond with json', function(done){
    request(app)
    .post('/flow/conference/customer_leg/waiting')
    .expect(200, '<?xml version="1.0"?><Response><Play>http://com.twilio.music.classical.s3.amazonaws.com/ith_brahms-116-4.mp3</Play></Response>', done);
  })
})

describe('POST /flow/conference/agent_leg/agent_picks_up?incoming_sid=1234', function(){
  it('respond with json', function(done){
    request(app)
    .post('/flow/conference/agent_leg/agent_picks_up?incoming_sid=1234')
    .expect(200, '<?xml version="1.0"?><Response><Say>Testing</Say><Dial><Queue>queue-1</Queue></Dial></Response>', done);
  })
})
