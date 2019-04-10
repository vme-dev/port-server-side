var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
  
var app = express();
var bodyParser = require('body-parser');

var Router = require('./router/index.js');
var keys = require('./keys');

var Mail = require('./models/Mail.js')


app.use('/', express.static(__dirname + '/public'));

var myLogger = function (req, res, next) {
  console.log(__dirname + req.path);
  console.log(req.body);

  next();
};


app.use(bodyParser.json({
    extended: true
}));
app.use(myLogger);
app.use(fileUpload());


app.use(
  session({
    secret: 'hghtyNN23h',
    store: new FileStore(),
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: false,
  })
);
require('./config-passport');
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect(keys.mongoURI,{ useNewUrlParser: true })
	.then(() => console.log('MongoDB connected.'))
  .catch(err => console.log(err))
  
app.use('/api',Router);


app.post('/login', (req, res, next) => {
  passport.authenticate('local', function(err, user) {
    if (err) {
      return next(err);
    }
    console.log(req.params);
    if (!user) {
      return res.status(400).send({
        error:'GENERIC',
        description:'Wrong auth'
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/admin');
    });
  })(req, res, next);
});

const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.redirect('/');
  }
};

app.get('/admin', auth, (req, res) => {

  const postData = {
    "name":'req.body.name',
  };
   res.status(201).json(postData);

});
app.get('/get-mail', auth, (req, res) => {
  Mail.find({}).then((posts) => {
		res.status(200).json(posts);
	})

});

app.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});





app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});