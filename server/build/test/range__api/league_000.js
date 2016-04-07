"use strict";
var c = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    console.log.apply(console, arguments);
};
var _ = require('lodash');
var uuid = require('node-uuid');
var Bluebird = require('bluebird');
var IoRedis = require('ioredis');
var Orange = IoRedis.createClient();
var Promise = Bluebird.Promise;
var assert = require('assert');
c('is good');
var base = '../../';
// import lLeague from '../models/lLeague_002'
var league_002_1 = require('../../range__api/league_002');
var game_002_1 = require('../../range__api/game_002');
var sunspot = league_002_1.default("league", Orange);
var novaspot = game_002_1.default('game', Orange);
var player_mock_Z = uuid.v4();
var leagueDirectory = null;
describe('initiation of testing regime', function () {
    it('should be something here', function (done) {
        c('something was done');
        done();
    });
});
var game_mocks = {
    imaginary: []
};
var league_mocks = {
    imaginary: [],
    english: {
        name: "ENGLISH PREMEIR LEAGUE",
        leagueZ: null
    },
    spanish: "SPANISH LEAGUE"
};
var team_mocks = {
    imaginary: []
};
var mock_team_factory = function () {
    var mock_name = "MOCK_TEAM_NAME" + uuid.v4();
    team_mocks.imaginary.push({
        name: mock_name,
        teamZ: null
    });
};
var mock_league_factory = function () {
    var mock_name = "MOCK_NAME" + uuid.v4();
    league_mocks.imaginary.push({
        name: mock_name,
        leagueZ: null
    });
};
mock_league_factory();
mock_league_factory();
mock_league_factory();
mock_league_factory();
_.forEach([0, 1, 2, 3], function (item, index) {
    mock_team_factory();
});
c('imaginary teams', team_mocks.imaginary);
c('imaginary mocks', league_mocks.imaginary);
describe('initiation of a real league in the world', function () {
    // for now just go with one constant "WORLD"
    it('should be possible to instantiate a real sports league into the world', function (done) {
        sunspot.league_init(league_mocks.imaginary[0].name, function (go) {
            c('have go', go);
            c('go should have leagueZ', go.leagueZ);
            league_mocks.imaginary[0].leagueZ = go.leagueZ;
            done();
        });
    });
});
describe('atom event queue should be there', function () {
    it("If the name isn't already taken, should register the event with WORLD, & initialise the atomic data structure ", function (done) {
        sunspot.league_state_000(league_mocks.imaginary[0].leagueZ, function (go) {
            var parsed = JSON.parse(go);
            var parsed2 = _.map(parsed, function (item, idx) {
                return JSON.parse(item);
            });
            assert.equal(parsed2[0].leagueZ, league_mocks.imaginary[0].leagueZ);
            done();
        });
    });
});
describe('we should be able to add teams', function () {
    it("We have some mock teams and we add them in", function (done) {
        sunspot.add_team(league_mocks.imaginary[0].leagueZ, team_mocks.imaginary[0].name, function (go) {
            c('test has go', go);
            assert.equal(go.res, 'okgood');
            team_mocks.imaginary[0].teamZ = go.teamZ;
            // done();
        });
        sunspot.add_team(league_mocks.imaginary[0].leagueZ, team_mocks.imaginary[1].name, function (go) {
            c('test has go2', go);
            assert.equal(go.res, 'okgood');
            team_mocks.imaginary[1].teamZ = go.teamZ;
            done();
        });
    });
});
describe('now this attempt to add same team name to league should fail', function () {
    it('attempting to add an already added team', function (done) {
        sunspot.add_team(league_mocks.imaginary[0].leagueZ, team_mocks.imaginary[0].name, function (go) {
            c('test to fail has go', go);
            assert.equal(go.res, 'no');
            done();
        });
    });
});
describe('should be able to add a game to a league', function () {
    it('we have two teamZs and one leagueZ we can add a game', function (done) {
        var payload = {
            leagueZ: league_mocks.imaginary[0].leagueZ,
            home_teamZ: team_mocks.imaginary[0].teamZ,
            visitor_teamZ: team_mocks.imaginary[1].teamZ
        };
        sunspot.add_game(payload, function (go) {
            c('cb in test has go', go);
            game_mocks.imaginary.push({ gameZ: go.gameZ });
            done();
        });
    });
});
describe('we should be able to edit a game', function () {
    it('should allow me to submit an edit action to the game queue', function (done) {
        var payload = {
            gameZ: game_mocks.imaginary[0].gameZ,
            data: {
                home_team_final_score: "3",
                visitor_team_final_score: "22"
            }
        };
        sunspot.edit_game(payload, function (go) {
            c('cb in test edit', go);
            done();
        });
    });
});
describe('now with a diferent api focused on games we should be able to get game state', function () {
    it('should allow us to look into game state', function (done) {
        novaspot.state_000(game_mocks.imaginary[0].gameZ, function (go) {
            c(' \n cb in state_000', go);
            done();
        });
    });
});
describe('if some games have been added so could add a line', function () {
    it('should be able to query leagues for games', function (done) {
        sunspot.query_for_undecided_games(league_mocks.imaginary[0].leagueZ, function (go) {
            c(' have go with ', go);
            done();
        });
    });
});
