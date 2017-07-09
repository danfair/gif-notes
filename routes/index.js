var express = require('express');
var router = express.Router();
var cors = require('cors');
var https = require('https');
var querystring = require('querystring');
var needle = require('needle');

const spotifyAuth = require('../config/spotifyAuth');
const Spotify = require('spotify-web-api-node');
const STATE_KEY = 'spotify_auth_state';
const scopes = ['user-read-private', 'user-read-email', 'user-read-playback-state'];
const spotifyApi = new Spotify({
  clientId: spotifyAuth.CLIENT_ID,
  clientSecret: spotifyAuth.CLIENT_SECRET,
  redirectUri: spotifyAuth.REDIRECT_URI
});


/** Generates a random string containing numbers and letters of N characters */
const generateRandomString = N => (Math.random().toString(36)+Array(N).join('0')).slice(2, N+2);

router.get('/login', (_, res) => {
  const state = generateRandomString(16);
  res.cookie(STATE_KEY, state);
  res.redirect(spotifyApi.createAuthorizeURL(scopes, state));
});

router.get('/refresh/:refreshToken', (req, res) => {
  const encodedAuthString = new Buffer(`${spotifyAuth.CLIENT_ID}:${spotifyAuth.CLIENT_SECRET}`).toString('base64');
  const postBody = querystring.stringify({
    grant_type: 'refresh_token',
    refresh_token: req.params.refreshToken
  });

  var options = {
    headers: {
      'Authorization': `Basic ${encodedAuthString}`
    },
  };

  needle.post('https://accounts.spotify.com/api/token', postBody, options, (err, resp) => {
    if (resp.statusCode == 200) {
      res.json({
        access_token: resp.body.access_token
      });
    }
  });
});

router.get('/callback', (req, res) => {
  const { code, state } = req.query;
  const storedState = req.cookies ? req.cookies[STATE_KEY] : null;
  // first do state validation
  if (state === null || state !== storedState) {
    res.redirect('http://localhost:3000/#/error/state mismatch');
  // if the state is valid, get the authorization code and pass it on to the client
  } else {
    res.clearCookie(STATE_KEY);
    // Retrieve an access token and a refresh token
    spotifyApi.authorizationCodeGrant(code).then(data => {
      const { expires_in, access_token, refresh_token } = data.body;

      // Set the access token on the API object to use it in later calls
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      // use the access token to access the Spotify Web API
      spotifyApi.getMe().then(({ body }) => {
        console.log('body', body);
      });

      res.cookie('gn_at', access_token);
      res.cookie('gn_rt', refresh_token);
      // we can also pass the token to the browser to make requests from there
      // res.redirect(`http://localhost:3000/#/user/${access_token}/${refresh_token}`);
      res.redirect('http://localhost:3000/player');
    }).catch(err => {
      res.redirect('http://localhost:3000/#/error/invalid token');
    });
  }
});

module.exports = router;
