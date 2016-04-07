
const c = function(...args: any[]) {console.log.apply(console,arguments)};
import * as fs from 'fs'
import * as _ from 'lodash'
import Bluebird = require('bluebird');
var Promise = Bluebird.Promise;
import uuid = require('node-uuid');
const fS = Promise.promisifyAll(fs);
import path = require('path');

const base = "../../lua/league/";

var api__000 =  function (message: any, Orange: any) {
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
    })
    Orange.defineCommand('league_init', {
        lua: fs.readFileSync(path.resolve(__dirname, '../../lua/league/league_init.lua'))
    })
    return Orange;
}

var sunspot = function (rangeYellow) {

    const query_for_undecided_games = function(leagueZ, cb) {
        // get active games associated witha  league
        rangeYellow.query_for_undecided_games(1, leagueZ)
        .then((res) => {
            c('have res euea', res);
            cb({res: res});
        })
        .error((err) => {
            c('have err', err);
            cb(err);
        })
    };

    const edit_game = function(payload, cb) {
        //payload={gameZ, data}
        let str_payload = JSON.stringify(_.assign(payload, {
            event_type: "EDIT_GAME",
            timestamp: Date.now()
        }));
        rangeYellow.edit_game(1, str_payload)
        .then((res) => {
            c('have res euea', res);
            cb({res: res});
        })
        .error((err) => {
            c('have err', err);
            cb(err);
        })

    };

    const add_game = function(payload, cb) {
        // payload={leagueZ, visitor_teamZ, home_teamZ, maybe other stuff}
        let gameZ = uuid.v4();
        let str_payload = JSON.stringify(_.assign(payload, {
            event_type: "CREATE_GAME",
            timestamp: Date.now(),
            gameZ: gameZ
        }));
        rangeYellow.add_game(1, str_payload)
        .then((res) => {
            c('have res euea', res);
            cb({res: res, gameZ: gameZ});
        })
        .error((err) => {
            c('have err', err);
            cb(err);
        })

    };

    const add_team_001 = function(req, cb) {
        let teamZ = uuid.v4();
        let str_payload = JSON.stringify({
            event_type: "ADD_TEAM_TO_LEAGUE",
            timestamp: Date.now(),
            team_name: req.name,
            leagueZ: req.leagueZ,
            teamZ: teamZ
        });
        rangeYellow.add_team(1, str_payload)
        .then((res) => {
            c('have res euea', res);
            // let obj = JSON.parse(res);
            let obj = JSON.parse(res,res);
            c(obj.result);
            if (obj.leagueZ !== req.leagueZ || obj.teamZ !== teamZ) {throw "error"}
            cb({
                result: obj.result,
                teamZ: teamZ,
                team_name: req.name,
                leagueZ: req.leagueZ
            });
        })
        .error((err) => {
            c('have err', err);
            cb(err);
        })

    };

    const add_team = function(leagueZ, team_name, cb) {
        // we could adopt a sensible rule where teams can only be initiated in the context of leagues
        // API can be reorganised later if partitioning of responsibilities
        // exactly the same as file structure
        // if no team by this name is already in the league, then a new
        // one is initiated, and leagueZ is returned.
        let teamZ = uuid.v4();
        let str_payload = JSON.stringify({
            event_type: "ADD_TEAM_TO_LEAGUE",
            timestamp: Date.now(),
            team_name: team_name,
            leagueZ: leagueZ,
            teamZ: teamZ
        });
        rangeYellow.add_team(1, str_payload)
        .then((res) => {
            c('have res euea', res);
            cb({res: res, teamZ: teamZ});
        })
        .error((err) => {
            c('have err', err);
            cb(err);
        })
    };

    const league_state_000 = function(leagueZ, cb) {
        let str_payload = JSON.stringify({
            event_type: 'STATE_REQUEST_000',
            timestamp: Date.now(),
            leagueZ: leagueZ
        });
        rangeYellow.league_state_000(1, str_payload)
        .then((res) => {
            c('have res aaaa', res);
            cb(res: res, leagueZ: leagueZ);
        })
        .error((err) => {
            c('have err', err);
            cb(err);
        })
    };

    const league_init = function(league_name, cb) {
        // the script should initialise the atomic data structure unless
        let leagueZ = uuid.v4();
        let str_payload = JSON.stringify({
            event_type: "league_init",
            timestamp: Date.now(),
            leagueZ: leagueZ,
            name: league_name
        });
        rangeYellow.league_init(1, str_payload)
        .then((res) => {
            // c('have res league init', res);
            // c('typeof res', typeof(res));

            let obj = JSON.parse(res);
            cb({result: obj.result, leagueZ: leagueZ, leagueName: league_name});
        })
        .error((err) => {
            c('have err', err);
            cb(err);
        })
    };

    return {
        query_for_undecided_games: query_for_undecided_games,
        edit_game: edit_game,
        add_game: add_game,
        add_team_001: add_team_001,
        add_team: add_team,
        league_state_000: league_state_000,
        league_init: league_init
    }
};

export default function (message: any, Orange: any) {
    var rangeYellow = Promise.promisifyAll(api__000("magnanimity", Orange));
    return sunspot(rangeYellow);
};
