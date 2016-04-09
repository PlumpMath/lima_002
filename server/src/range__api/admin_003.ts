
const c = function(...args: any[]) {console.log.apply(console,arguments)};
import * as fs from 'fs'
import * as _ from 'lodash'
import Bluebird = require('bluebird');
var Promise = Bluebird.Promise;
import uuid = require('node-uuid');
const fS = Promise.promisifyAll(fs);
import path = require('path');
const base = "../../lua/world_admin/";

import * as leibniz from '../constants/admin_interfaces_001'
let interfaces = {}
_.assign(interfaces, leibniz);
const i = interfaces;

var api__000 =  function (message: any, Orange: any) {
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

    const consumate_game_005 = function(ticket: i.GameConsumate_Ticket, cb) {
        let str_payload = JSON.stringify(ticket);
        rangeYellow.consumate_game(1, str_payload)
        .then((res)=> {
            cb(res);
        })
        .error((err){
            cb(err);
        })
    }

    const init_game_005 = function(ticket: i.GameInit_Ticket, cb) {
        let str_payload = JSON.stringify(_.assign(ticket, {
            gameZ: uuid.v4()
        }));
        rangeYellow.init_game(1, str_payload)
        .then((res)=> {
            cb(res);
        })
        .error((err){
            cb(err);
        })
    };

    const init_season_005 = function(ticket: i.SeasonInit_Ticket, cb) {
        let str_payload = JSON.stringify(_.assign(ticket, {
            seasonZ: uuid.v4()
        }));
        rangeYellow.init_season(1, str_payload)
        .then((res)=> {
            cb(res);
        })
        .error((err){
            cb(err);
        })
    };

    const init_team_005 = function(ticket: i.TeamInit_Ticket, cb) {
        let str_payload = JSON.stringify(_.assign(ticket, {
            teamZ: uuid.v4()
        }));
        rangeYellow.init_team(1, str_payload)
        .then((res)=> {
            cb(res);
        })
        .error((err){
            cb(err);
        })
    };

    // because we generate the leagueZ here in this layer
    const init_league_005 = function(ticket: i.LeagueInit_Ticket, cb) {
        let str_payload = JSON.stringify(_.assign(ticket, {
            leagueZ: uuid.v4()
        }));
        rangeYellow.init_league(1, str_payload)
        .then((res)=> {
            cb(res);
        })
        .error((err){
            cb(err);
        })
    };

    return {
        consumate_game: consumate_game_005,
        init_game: init_game_005,
        init_season: init_season_005,
        init_team: init_team_005,
        init_league: init_league_005
    }
};

export default function (message: any, Orange: any) {
    var rangeYellow = Promise.promisifyAll(api__000("magnanimity", Orange));
    return sunspot(rangeYellow);
};
