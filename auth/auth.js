'use strict';

const express = require('express');
const passport = require('passport');
const querystring = require('querystring');
const router = express.Router();

router.get('/github',
  passport.authenticate('github', { scope: [ 'gist' ] }),
  function(req, res) {});

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // res.redirect('/account');
    res.redirect('/?' + querystring.stringify({accessToken: req.user.accessToken}));
  });

module.exports = router;