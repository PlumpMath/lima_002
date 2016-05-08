
const c = function(...args: any[]) {console.log.apply(console,arguments)};
import * as fs from 'fs'
import * as _ from 'lodash'
import Bluebird = require('bluebird');
var Promise = Bluebird.Promise;
import uuid = require('node-uuid');
const fS = Promise.promisifyAll(fs);
import path = require('path');

const base = "../../lua/league/";

import * as leibniz from '../constants/interfaces_000'
var interfaces = {}
_.assin(interfaces, leibniz);

function gameConsumate_ticket_factory (gameZ, homeTeam_finalScore, visitorTeam_finalScore): interfaces.GameConsumate_Ticket {
    return {
        gameZ: gameZ,
        homeTeam_finalScore: homeTeam_finalScore,
        visitorTeam_finalScore: visitorTeam_finalScore
    }
};

function gameInit_ticket_factory (seasonZ, leagueZ, homeTeamZ, visitorTeamZ, scheduledDate): interfaces.GameInit_Ticket {
    return {
        seasonZ: seasonZ,
        leagueZ: leagueZ,
        homeTeamZ: homeTeamZ,
        visitorTeamZ: visitorTeamZ,
        scheduledDate: scheduledDate
    }
};

function seasonInit_ticket_factory (seasonZ, seasonName, leagueZ): interfaces.SeasonInit_Ticket {
    return {
        seasonZ: seasonZ,
        seasonName: seasonName,
        leagueZ: leagueZ
    }
}

function teamInit_ticket_factory (teamZ, teamName, leagueZ): interfaces.TeamInit_Ticket {
    return {
        teamZ: teamZ,
        teamName: teamName,
        leagueZ: leagueZ
    }
};

function leagueInit_ticket_factory (leagueZ, leagueName): interfaces.LeagueInit_Ticket  {
    return {
        leagueZ: leagueZ,
        leagueName: leagueName
    }
};

// import {init_league, init_team, init_season, init_game, consumate_game} from '../constants/admin_methods';
import * as kant from '../constants/admin_methods';
var admin_actions = {}
_.assign(admin_actions, kant);

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

    const init_team_001 = function(req, cb) {
        let teamZ = uuid.v4();
        let str_payload = JSON.stringify({
            event_type: init_team,
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
            cb({res: res,
            leagueZ: leagueZ});
        })
        .error((err) => {
            c('have err', err);
            cb(err);
        })
    };

    const init_game = function(game_init_ticket: interfaces.GameInit_Ticket) {

    };

    const init_season = function(season_name, leagueZ, cb) {
        let seasonZ = uuid.v4();
        let str_payload = JSON.stringify({
            event_type: admin_actions.init_season,
            timestamp: Date.now(),
            seasonZ: seasonZ,
            season_name: season_name
        });
        rangeYellow.init_season(1, str_payload)
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
    }

    // here instead of spread operators, the api expects completed tickets already
    // manufactured according to the interface template.  we just stringify it
    const init_league_003 = function(leagueInit_ticket: interfaces.LeagueInit_Ticket, cb: interfaces.LeagueInit_CB) {
        let str_payload = JSON.stringify(leagueInit_ticket);
        rangeYellow.init_league(1, str_payload)
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

    const init_league = function(leagueName, cb) {
        let leagueZ = uuid.v4();
        let str_payload = JSON.stringify(leagueInit_ticket_factory(leagueZ, leagueName));
        // let str_payload = JSON.stringify({
        //     event_type: admin_actions.init_league,
        //     timestamp: Date.now(),
        //     leagueZ: leagueZ,
        //     name: league_name
        // });
        rangeYellow.init_league(1, str_payload)
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
        init_team: init_team,
        init_league: init_league
    }
};

export default function (message: any, Orange: any) {
    var rangeYellow = Promise.promisifyAll(api__000("magnanimity", Orange));
    return sunspot(rangeYellow);
};
