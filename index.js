var express = require("express");
var morgan = require("morgan");
var passport = require("passport");
var BearerStrategy = require('passport-azure-ad').BearerStrategy;
var leaves = require('./core/leaves');
var compression = require('compression');
bodyParser = require('body-parser');
var ideas = require("./core/ideabox")

var options = {
    identityMetadata: "https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration/",
    clientID: "e1f1830e-d3d7-451a-a213-54f9c8f02d67",
    validateIssuer: false,
    loggingLevel: 'warn',
    passReqToCallback: false
};

// Check for client id placeholder
if (options.clientID === 'YOUR_CLIENT_ID') {
    console.error("Please update 'options' with the client id (application id) of your application");
    return;
}

var bearerStrategy = new BearerStrategy(options,
    function (token, done) {
        // Send user info using the second argument
        done(null, {}, token);
    }
);

var app = express();
app.use(morgan('dev'));
app.use(compression());
app.use(passport.initialize());
passport.use(bearerStrategy);
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/hello",
    passport.authenticate('oauth-bearer', {session: false}),
    function (req, res) {
        var claims = req.authInfo;
        console.log('User info: ', req.user);
        console.log('Validated claims: ', claims);
        
        res.status(200).json({'name': claims['name']});
    }
);




/**************************************APIs*******************************************/

app.get('/api/issues',passport.authenticate('oauth-bearer', {session: false}), (req, res) =>{   
    const data = issues.issues();
    res.status(200).send(data);    
  } 
  );

  /*------------------leaves---------------------- */
  //retrives all leaves for a user
  // method GET 
  //satus = complete
  app.get('/api/leaves',  (req, res) => {
    var userid = req.query['userid']
    console.log(userid)
    leaves.getAllLeaves(userid).then((Response)=>{
        res.json(Response)
    }).catch((error)=>{
        res.json(error)
    })
    
  } 
  );

  //retrives a particular leave by id
  // method GET
  //app.get('/api/leaves/:id', passport.authenticate('oauth-bearer', {session: false}), async (req, res) => {
    
  //  res.status(200).send(data);    
  //} 
  //);
  
  //updates a leave id
  // method PATCH
  app.patch('/api/leaves/:id', passport.authenticate('oauth-bearer', {session: false}), async (req, res) => {
    
    res.status(200).send(data);    
  } 
  );

  //saves a leave request
  // method POST
  //status - complete
  app.post('/api/leaves',   async (req, res) => {

    req.body.selectedRange.start = new Date(req.body.selectedRange.start).toString();
   
   
    req.body.selectedRange.end = new Date(req.body.selectedRange.end).toString();
      var input = req.body;
      console.log("input111",input)
    leaves.saveLeave(input).then((Response)=>{
        // res.json(Response)
        console.log("Response",Response)

       
   


        res.send({
            res:Response,
            message:"Your leave request has been saved successfully"
        })
    }).catch((error)=>{
        res.json(error)
    })
       
  } 
  );
  app.get('/api/ideabox',  (req, res) => {
    var userid = req.query['userid']
    console.log(userid)
    ideas.getAllIdeas(userid).then((Response)=>{
        res.json(Response)
    }).catch((error)=>{
        res.json(error)
    })
 
  }
  );
  app.post('/api/ideabox',   async (req, res) => {
    var input = req.body;
 
    console.log("input111",input)
  ideas.saveideas(input).then((Response)=>{
      // res.json(Response)
      console.log("Response",Response);
      res.send({
          status:200,
          message:"Your Ideas has been posted successfully"
      })
  }).catch((error)=>{
      res.json(error)
  })
 
 }
 );
  
  //deletes a leave record
  // method DELETE
  passport.authenticate('oauth-bearer', {session: false})
  app.delete('/api/leaves/:id',  (req, res) => {
    
    var userJson = req.body.user;
    var leaveRecordJson = req.body.leaves.leaveRecord;
    var leavesJson = req.body.leaves;
    leaves.saveLeave(userJson, leavesJson, leaveRecordJson)
    res.status(200).send(data);    
  } 
  );

/**************************************APIs - end*******************************************/

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Listening on port " + port);
});