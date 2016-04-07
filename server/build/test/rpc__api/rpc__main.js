"use strict";
var c = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    console.log.apply(console, arguments);
};
var Bluebird = require('bluebird');
var IoRedis = require('ioredis');
var Orange = IoRedis.createClient();
var Promise = Bluebird.Promise;
var shortid = require('shortid');
var assert = require('assert');
var rpc__api = require('../../rpc__api/rpc__index').rpc__api;
// c('is good')
var ra = rpc__api;
// c('rpc__api', rpc__api);
// This is the client facing API.  It should behave as the RPC layer but without having to
// run an RPC connection.
c("This is the client facing API.  It should behave as the RPC layer but without having to run an RPC connection. So here we mock the rpc objects,  Like hook captain Cook.");
var mock_league = {};
var mock_teams = {};
describe('the api should respond to event type boogie boogie', function () {
    it('should respond appr', function (done) {
        var data = {
            event_type: 'boogieboogie'
        };
        rpc__api(data, function (res) {
            c('have response', res);
            assert.equal(res, 'bogogogogonthntho');
        });
        done();
    });
});
describe('request to make a league', function () {
    it('should make a league', function (done) {
        var frag = shortid();
        var mockname = "LEAGUENAME" + frag;
        mock_league.name = mockname;
        var req = {
            event_type: "league_init",
            name: mockname
        };
        ra(req, function (res) {
            c('test has callback res', res);
            assert.equal(res.result, 'okgood');
            mock_league.leagueZ = res.leagueZ;
        });
        done();
    });
});
describe('we should be able to add teams', function () {
    it('teams add ', function (done) {
        var name = "TEAM_MOCK_____________" + shortid();
        var req = {
            event_type: 'ADD_TEAM_TO_LEAGUE',
            leagueZ: mock_league.leagueZ,
            name: name
        };
        ra(req, function (res) {
            assert.equal(res.result, 'okgood');
        });
        done();
    });
});
