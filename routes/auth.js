const express = require('express');
const passport = require('passport');
require('dotenv').config();

const router = express.Router();

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.BASE_URL_PROD
    : process.env.BASE_URL_DEV;

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect(`${baseUrl}/`);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(`${baseUrl}/login`);
});

router.get('/current_user', (req, res) => {
  res.send(req.user);
});

module.exports = router;
