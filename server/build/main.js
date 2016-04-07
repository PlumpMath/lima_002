"use strict";
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;
var app = express();
var http = require('http');
var server = http.createServer(app);
var _ = require('lodash');
var Rx = require('rxjs');
var Bluebird = require('bluebird');
var Redis = require('ioredis');
var blue = Bluebird.Promise;
var Primus = require('primus');
var c = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    console.log.apply(console, args);
};
var rpc__index_1 = require('./rpc__api/rpc__index');
var primusLayer = function (server) {
    var primus = new Primus(server);
    var clientPrimus = primus.library();
    primus.save(path.resolve(__dirname, '../../src/assets/primus.js'));
    rpc__index_1.default("hallosososos", primus);
};
primusLayer(server);
app.set('port', port);
app.use(bodyParser.json());
// app.use('/app', express.static(path.resolve(__dirname, 'app')));
// app.use('/libs', express.static(path.resolve(__dirname, 'libs')));
app.use('/', express.static(path.resolve(__dirname, '../../dist/')));
var renderIndex = function (req, res) {
    res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
};
app.get('/*', renderIndex);
server.listen(port, function () {
    // var host = server.address().address;
    // var port = server.address().port;
    console.log('This express app is listening on port:' + port);
});
