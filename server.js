var express = require('express');
var cookieParser = require('cookie-parser');
var escape = require('escape-html');
var serialize = require('node-serialize');
var bodyParser = require('body-parser')
var app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
 if (req.cookies.profile) {
   var str = new Buffer(req.cookies.profile, 'base64').toString();
   var profile = serialize.unserialize(str);
   
   var rtnStr = 'Something went wrong...';

   if (profile.name) {
     rtnStr = "Hello " + escape(profile.name);
   }

   if (profile.from) {
    rtnStr = rtnStr += " from " + escape(profile.from);
   }

   res.send(rtnStr);
 }

 res.send('Hello there.<br /><form method="post"><label for="name">Please enter your name:</label> <input type="text" id="name" placeholder="Jimbob" name="name" autocomplete="off"/><br /><label for="from">Please enter where you\'re from:</label> <input type="text" id="from" placeholder="Leicester" name="from" autocomplete="off"/><br /><input type="submit" value="Save" /></form>');
});

app.post('/', function(req, res) {
  var data = serialize.serialize(req.body);
  var b64data = new Buffer(data).toString('base64');
  res.cookie('profile', b64data, {
    maxAge: 900000,
    httpOnly: true
  });
  //res.send('Done.');
  res.redirect('/');
})
app.listen(3000);
