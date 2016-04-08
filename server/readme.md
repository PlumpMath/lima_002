

### Server side

Source written in typescript, can be compiled (and watched) locally with Gulp.

Run the server with `node build/main.js`

There are two layers: RPC and Data.  RPC is the websocket connection from the client app.  Data is the Redis client connection.  Main persistence for the system is Redis.

### Tests
There are two tiers of unit (Mocha) tests, one for each API/layer.  `mocha build\test\...\filename.js` is how I run them.
