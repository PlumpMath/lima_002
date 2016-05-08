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
var leibniz = require('../constants/interfaces_000');
var interfaces = {};
_.assin(interfaces, leibniz);
function gameConsumate_ticket_factory(gameZ, homeTeam_finalScore, visitorTeam_finalScore) {
    return {
        gameZ: gameZ,
        homeTeam_finalScore: homeTeam_finalScore,
        visitorTeam_finalScore: visitorTeam_finalScore
    };
}
;
function gameInit_ticket_factory(seasonZ, leagueZ, homeTeamZ, visitorTeamZ, scheduledDate) {
    return {
        seasonZ: seasonZ,
        leagueZ: leagueZ,
        homeTeamZ: homeTeamZ,
        visitorTeamZ: visitorTeamZ,
        scheduledDate: scheduledDate
    };
}
;
function seasonInit_ticket_factory(seasonZ, seasonName, leagueZ) {
    return {
        seasonZ: seasonZ,
        seasonName: seasonName,
        leagueZ: leagueZ
    };
}
function teamInit_ticket_factory(teamZ, teamName, leagueZ) {
    return {
        teamZ: teamZ,
        teamName: teamName,
        leagueZ: leagueZ
    };
}
;
function leagueInit_ticket_factory(leagueZ, leagueName) {
    return {
        leagueZ: leagueZ,
        leagueName: leagueName
    };
}
;
// import {init_league, init_team, init_season, init_game, consumate_game} from '../constants/admin_methods';
var kant = require('../constants/admin_methods');
var admin_actions = {};
_.assign(admin_actions, kant);
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
        lua: fs.readFileSync(path.resolve(__dirname, '../../lua/league/init_team.lua'))
    });
    Orange.defineCommand('league_state_000', {
        lua: fs.readFileSync(path.resolve(__dirname, '../../lua/league/league_state_000.lua'))
    });
    //              deprecated above ^
    // new below  >
    Orange.defineCommand('consumate_game', {
        lua: fs.readFileSync(path.resolve(__dirname, '../../lua/world_admin/consumate_game.lua'))
    });
    Orange.defineCommand('init_game', {
        lua: fs.readFileSync(path.resolve(__dirname, '../../lua/world_admin/init_game.lua'))
    });
    Orange.defineCommand('init_season', {
        lua: fs.readFileSync(path.resolve(__dirname, '../../lua/world_admin/init_season.lua'))
    });
    Orange.defineCommand('init_team', {
        lua: fs.readFileSync(path.resolve(__dirname, '../../lua/world_admin/init_team.lua'))
    });
    Orange.defineCommand('init_league', {
        lua: fs.readFileSync(path.resolve(__dirname, '../../lua/world_admin/init_league.lua'))
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
    var init_team_001 = function (req, cb) {
        var teamZ = uuid.v4();
        var str_payload = JSON.stringify({
            event_type: init_team,
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
            cb({ res: res,
                leagueZ: leagueZ });
        })
            .error(function (err) {
            c('have err', err);
            cb(err);
        });
    };
    var init_game = function (game_init_ticket) {
    };
    var init_season = function (season_name, leagueZ, cb) {
        var seasonZ = uuid.v4();
        var str_payload = JSON.stringify({
            event_type: admin_actions.init_season,
            timestamp: Date.now(),
            seasonZ: seasonZ,
            season_name: season_name
        });
        rangeYellow.init_season(1, str_payload)
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
    // here instead of spread operators, the api expects completed tickets already
    // manufactured according to the interface template.  we just stringify it
    var init_league_003 = function (leagueInit_ticket, cb) {
        var str_payload = JSON.stringify(leagueInit_ticket);
        rangeYellow.init_league(1, str_payload)
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
    var init_league = function (leagueName, cb) {
        var leagueZ = uuid.v4();
        var str_payload = JSON.stringify(leagueInit_ticket_factory(leagueZ, leagueName));
        // let str_payload = JSON.stringify({
        //     event_type: admin_actions.init_league,
        //     timestamp: Date.now(),
        //     leagueZ: leagueZ,
        //     name: league_name
        // });
        rangeYellow.init_league(1, str_payload)
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
        init_team: init_team,
        init_league: init_league
    };
};
function default_1(message, Orange) {
    var rangeYellow = Promise.promisifyAll(api__000("magnanimity", Orange));
    return sunspot(rangeYellow);
}
exports.__esModule = true;
exports["default"] = default_1;
;
