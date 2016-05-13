'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const PORT = process.env.PORT || 3000;
const GitHubStrategy = require('passport-github2').Strategy;
const config = require('./config/config');
const auth = require('./auth/auth');
const app = express();

//sets up passport
function setUpPassport() {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  passport.use(new GitHubStrategy({
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },

  function(accessToken, refreshToken, profile, done) {
    profile.accessToken = accessToken;
    console.log(profile);
    return done(null, profile);
  }
));
}

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(session({
  secret : process.env.SECRET_KEY || 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.resolve(__dirname, 'public')));
setUpPassport();

app.use('/auth', auth);

app.get('/', (res, req) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});