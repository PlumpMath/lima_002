// var bodyParser = require('body-parser');
import bodyParser = require('body-parser');
import express = require('express');
import path = require('path');
var port: number = process.env.PORT || 3000;
var app = express();
import http = require('http');
var server = http.createServer(app);
const _ = require('lodash');
const Rx = require('rxjs');
const Bluebird = require('bluebird');
const Redis = require('ioredis');
const blue = Bluebird.Promise;
const Primus = require('primus');

const c = function(...args: any[]) {console.log.apply(console, args);};
import rpc__api from './rpc__api/rpc__index';

const primusLayer = function(server: any) {
    let primus = new Primus(server);
    const clientPrimus = primus.library();
    primus.save(path.resolve(__dirname, '../../src/assets/primus.js'))
    rpc__api("hallosososos", primus);
};

primusLayer(server);

app.set('port', port);
app.use(bodyParser.json());

// app.use('/app', express.static(path.resolve(__dirname, 'app')));
// app.use('/libs', express.static(path.resolve(__dirname, 'libs')));
app.use('/', express.static(path.resolve(__dirname, '../../dist/')));

var renderIndex = (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
}

app.get('/*', renderIndex);

server.listen(port, function() {
    // var host = server.address().address;
    // var port = server.address().port;
    console.log('This express app is listening on port:' + port);
});
