const express = require('express');
const router = express.Router();
const cors = require('cors');
const https = require('https');
const querystring = require('querystring');
const needle = require('needle');
const path = require('path');

const auth = require('../config/auth');
const Spotify = require('spotify-web-api-node');
const STATE_KEY = 'spotify_auth_state';
const spotifyScopes = ['user-read-private', 'user-read-email', 'user-read-playback-state'];
const spotifyApi = new Spotify({
  clientId: auth.CLIENT_ID,
  clientSecret: auth.CLIENT_SECRET,
  redirectUri: process.env.MODE === 'development' ? auth.REDIRECT_URI_DEVELOPMENT : auth.REDIRECT_URI
});

/** Generates a random string containing numbers and letters of N characters */
const generateRandomString = N => (Math.random().toString(36)+Array(N).join('0')).slice(2, N+2);

router.get('/login', (req, res) => {
  const state = generateRandomString(16);
  res.cookie(STATE_KEY, state);
  res.redirect(spotifyApi.createAuthorizeURL(spotifyScopes, state));
});

router.get('/refresh/:refreshToken', (req, res) => {
  const encodedAuthString = new Buffer(`${auth.CLIENT_ID}:${auth.CLIENT_SECRET}`).toString('base64');
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

router.get('/gifs', (req, res) => {
  let queryString = querystring.stringify({
    api_key: auth.GIPHY_API_KEY,
    q: req.query.query,
    rating: req.query.gifRating,
    offset: req.query.offset
  });
  
  needle.get(`https://api.giphy.com/v1/gifs/search?${queryString}`, (err, resp) => {
    res.json(resp.body.data);
  });
});

router.get('/callback', (req, res) => {
  const { code, state } = req.query;
  const storedState = req.cookies ? req.cookies[STATE_KEY] : null;
  // first do state validation
  if (state === null || state !== storedState) {
    res.redirect('/fail=true');
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
      res.redirect('/player');
    }).catch(err => {
      res.redirect('/');
    });
  }
});

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

router.get('/player', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

router.get('*', (req, res) => {
  res.redirect('/?fail=true');
});

module.exports = router;
