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
var admin_methods_1 = require('../constants/admin_methods');
var mock_league = {};
var mock_teams = {};
describe('request to make a league', function () {
    it('should make a league', function (done) {
        var mockname = "League Mock" + shortid();
        mock_league.name = mockname;
        var req = {
            event_type: admin_methods_1.init_league,
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
            event_type: admin_methods_1.init_team,
            leagueZ: mock_league.leagueZ,
            name: name
        };
        ra(req, function (res) {
            assert.equal(res.result, 'okgood');
        });
        done();
    });
    describe('add season to league', function () {
        it('add season', function (done) {
            var name = "2017 SEASON_MOCK " + shortid();
            var req = {
                event_type: admin_methods_1.init_season,
                leagueZ: mock_league.leagueZ, };
            name: name;
        });
        ra(req, function (res) {
            c('test has res', res);
        });
        done();
    });
});
