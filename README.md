# Gif Notes

www.gifnotes.net

Visualize your music listening experience with related GIFs!

----

## Development

This project is built with React on the front end, and Node/Express on the back end. 

### Auth file

Register your app with Spotify and Giphy to get the necessary tokens.

In `server/config` add an `auth.js` file:

```
module.exports = {
  CLIENT_ID: 'XXXXXXXXXXXXXXXX',
  CLIENT_SECRET: 'XXXXXXXXXXXXXXXX',
  REDIRECT_URI: 'http://www.gifnotes.net/callback',
  REDIRECT_URI_DEVELOPMENT: 'http://localhost:3001/callback',
  GIPHY_API_KEY: 'XXXXXXXXXXXXXXXX'
}
```

### Node/Express

To start the server from the project root:

`cd server`

`npm start`

This will start the server on port 3001 and set the environment variable `MODE` to development, so that the Spotify callback is to the local URL.

### React

To start the React development server from the project root:

`cd server/client`

`npm start`

### CSS (SCSS)

To compile SCSS, from the project root:

`cd server/client`

`npm run watch-css`

### TODO

- [ ] Server side rendering
- [ ] Overlay color options
- [ ] Full screen button
- [ ] Explore sockets for player updates
- [ ] Redux (?)
