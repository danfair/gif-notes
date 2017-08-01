# Gif Notes

www.gifnotes.net

Visualize your music listening experience with related GIFs!

----

## Development

This project is built with React on the front end, and Node/Express on the back end. 

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
