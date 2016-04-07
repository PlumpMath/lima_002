"use strict";
var c = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    console.log.apply(console, arguments);
};
var fs = require('fs');
var _ = require('lodash');
var Bluebird = require('bluebird');
var Promise = Bluebird.Promise;
var uuid = require('node-uuid');
var fS = Promise.promisifyAll(fs);
var path = require('path');
var base = "../../lua/league/";
var api__000 = function (message, Orange) {
    Orange.defineCommand('query_for_undecided_games', {
        lua: fs.readFileSync(path.resolve(__dirname, '../../lua/league/query_for_undecided_games.lua'))
    });
    Orange.defineCommand('edit_game', {
        lua: fs.readFileSync(path.resolve(__dirname, '../../lua/league/edit_game.lua'))
    });
    Orange.defineCommand('add_game', {
        lua: fs.readFileSync(path.resolve(__dirname, '../../lua/league/add_game.lua'))
    });
    Orange.defineCommand('add_team', {
        lua: fs.readFileSync(path.resolve(__dirname, '../../lua/league/add_team.lua'))
    });
    Orange.defineCommand('league_state_000', {
        lua: fs.readFileSync(path.resolve(__dirname, '../../lua/league/league_state_000.lua'))
    });
    Orange.defineCommand('league_init', {
        lua: fs.readFileSync(path.resolve(__dirname, '../../lua/league/league_init.lua'))
    });
    return Orange;
};
var sunspot = function (rangeYellow) {
    var query_for_undecided_games = function (leagueZ, cb) {
        // get active games associated witha  league
        rangeYellow.query_for_undecided_games(1, leagueZ)
            .then(function (res) {
            c('have res euea', res);
            cb({ res: res });
        })
            .error(function (err) {
            c('have err', err);
            cb(err);
        });
    };
    var edit_game = function (payload, cb) {
        //payload={gameZ, data}
        var str_payload = JSON.stringify(_.assign(payload, {
            event_type: "EDIT_GAME",
            timestamp: Date.now()
        }));
        rangeYellow.edit_game(1, str_payload)
            .then(function (res) {
            c('have res euea', res);
            cb({ res: res });
        })
            .error(function (err) {
            c('have err', err);
            cb(err);
        });
    };
    var add_game = function (payload, cb) {
        // payload={leagueZ, visitor_teamZ, home_teamZ, maybe other stuff}
        var gameZ = uuid.v4();
        var str_payload = JSON.stringify(_.assign(payload, {
            event_type: "CREATE_GAME",
            timestamp: Date.now(),
            gameZ: gameZ
        }));
        rangeYellow.add_game(1, str_payload)
            .then(function (res) {
            c('have res euea', res);
            cb({ res: res, gameZ: gameZ });
        })
            .error(function (err) {
            c('have err', err);
            cb(err);
        });
    };
    var add_team_001 = function (req, cb) {
        var teamZ = uuid.v4();
        var str_payload = JSON.stringify({
            event_type: "ADD_TEAM_TO_LEAGUE",
            timestamp: Date.now(),
            team_name: req.name,
            leagueZ: req.leagueZ,
            teamZ: teamZ
        });
        rangeYellow.add_team(1, str_payload)
            .then(function (res) {
            c('have res euea', res);
            // let obj = JSON.parse(res);
            var obj = JSON.parse(res, res);
            c(obj.result);
            if (obj.leagueZ !== req.leagueZ || obj.teamZ !== teamZ) {
                throw "error";
            }
            cb({
                result: obj.result,
                teamZ: teamZ,
                team_name: req.name,
                leagueZ: req.leagueZ
            });
        })
            .error(function (err) {
            c('have err', err);
            cb(err);
        });
    };
    var add_team = function (leagueZ, team_name, cb) {
        // we could adopt a sensible rule where teams can only be initiated in the context of leagues
        // API can be reorganised later if partitioning of responsibilities
        // exactly the same as file structure
        // if no team by this name is already in the league, then a new
        // one is initiated, and leagueZ is returned.
        var teamZ = uuid.v4();
        var str_payload = JSON.stringify({
            event_type: "ADD_TEAM_TO_LEAGUE",
            timestamp: Date.now(),
            team_name: team_name,
            leagueZ: leagueZ,
            teamZ: teamZ
        });
        rangeYellow.add_team(1, str_payload)
            .then(function (res) {
            c('have res euea', res);
            cb({ res: res, teamZ: teamZ });
        })
            .error(function (err) {
            c('have err', err);
            cb(err);
        });
    };
    var league_state_000 = function (leagueZ, cb) {
        var str_payload = JSON.stringify({
            event_type: 'STATE_REQUEST_000',
            timestamp: Date.now(),
            leagueZ: leagueZ
        });
        rangeYellow.league_state_000(1, str_payload)
            .then(function (res) {
            c('have res aaaa', res);
            cb(res, res, leagueZ, leagueZ);
        })
            .error(function (err) {
            c('have err', err);
            cb(err);
        });
    };
    var league_init = function (league_name, cb) {
        // the script should initialise the atomic data structure unless
        var leagueZ = uuid.v4();
        var str_payload = JSON.stringify({
            event_type: "league_init",
            timestamp: Date.now(),
            leagueZ: leagueZ,
            name: league_name
        });
        rangeYellow.league_init(1, str_payload)
            .then(function (res) {
            // c('have res league init', res);
            // c('typeof res', typeof(res));
            var obj = JSON.parse(res);
            cb({ result: obj.result, leagueZ: leagueZ, leagueName: league_name });
        })
            .error(function (err) {
            c('have err', err);
            cb(err);
        });
    };
    return {
        query_for_undecided_games: query_for_undecided_games,
        edit_game: edit_game,
        add_game: add_game,
        add_team_001: add_team_001,
        add_team: add_team,
        league_state_000: league_state_000,
        league_init: league_init
    };
};
function default_1(message, Orange) {
    var rangeYellow = Promise.promisifyAll(api__000("magnanimity", Orange));
    return sunspot(rangeYellow);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
