const c = function(...args: any[]) {console.log.apply(console,arguments)};
import * as fs from 'fs'
import * as _ from 'lodash'
import Bluebird = require('bluebird');
var Promise = Bluebird.Promise;
import uuid = require('node-uuid');
const fS = Promise.promisifyAll(fs);
import path = require('path');
// const base = "../../lua/world_admin/";

// import * as leibniz from '../constants/admin_interfaces_001'
// let interfaces = {}
// _.assign(interfaces, leibniz);
// const i = interfaces;
// import * as aM from  '../constants/admin_methods.ts';

// let zz = fs.readFileSync(path.resolve(__dirname, '../../lua/test.lua'));q
// c('zz', zz.toString());
var api__000 =  function (message: any, Orange: any) {
    // if this works do them all like this in the sense of trying to get all the protocols standardised
    // single source of truth way.
    // Orange.defineCommand('test', {
    //     lua: fs.readFileSync(path.resolve(__dirname, '../../lua/test.lua'))
    // });
    // Orange.defineCommand(aM.consumate_game, {
    //     lua: fs.readFileSync(path.resolve(__dirname, '../../lua/world_admin/consumate_game.lua'))
    // });
    // Orange.defineCommand('consumate_game', {
    //     lua: fs.readFileSync(path.resolve(__dirname, '../../lua/world_admin/consumate_game.lua'))
    // });
    // Orange.defineCommand('init_game', {
    //     lua: fs.readFileSync(path.resolve(__dirname, '../../lua/world_admin/init_game_003.lua'))
    // });
    // Orange.defineCommand('init_season', {
    //     lua: fs.readFileSync(path.resolve(__dirname, '../../lua/world_admin/init_season.lua'))
    // });
    // Orange.defineCommand('init_team', {
    //     lua: fs.readFileSync(path.resolve(__dirname, '../../lua/world_admin/init_team.lua'))
    // });

    Orange.defineCommand('init_league', {
        lua: fs.readFileSync(path.resolve(__dirname, '../../lua/world_admin/init_league_003.lua'))
    });
    return Orange;
};

var sunspot = function (rangeYellow) {

    const consumate_game_005 = function(ticket, cb) {
        let str_payload = JSON.stringify(ticket);
        rangeYellow.consumate_game(1, str_payload)
        .then((res)=> {
            cb(res);
        })
        .error((err) => {
            cb(err);
        })
    };

    const init_game_005 = function(ticket, cb) {
        let str_payload = JSON.stringify(_.assign(ticket, {
            gameZ: uuid.v4()
        }));
        rangeYellow.init_game(1, str_payload)
        .then((res) => {
            cb(res);
        })
        .error((err) => {
            cb(err);
        })
    };

    const init_season_005 = function(ticket, cb) {
        let str_payload = JSON.stringify(_.assign(ticket, {
            seasonZ: uuid.v4()
        }));
        rangeYellow.init_season(1, str_payload)
        .then((res)=> {
            cb(res);
        })
        .error((err)=>{
            cb(err);
        })
    };

    const init_team_005 = function(ticket, cb) {
        let str_payload = JSON.stringify(_.assign(ticket, {
            timestamp: Date.now(),
            teamZ: uuid.v4()
        }));
        rangeYellow.init_team(1, str_payload)
        .then((res)=> {
            cb(res);
        })
        .error((err)=>{
            cb(err);
        })
    };

    // because we generate the leagueZ here in this layer
    const init_league_005 = function (ticket, cb) {
        c('hereeee')
        let str_payload = JSON.stringify(_.assign(ticket, {
            event_type: 'init_league',
            eventZ: uuid.v4(), // why not? might be useful
            time_stamp: Date.now(),
            leagueZ: uuid.v4()
        }));
        c('str_pa',str_payload);
        // c('range', rangeYellow.init_league);
        rangeYellow.init_league(1, str_payload)
        .then((res)=> {
            c('here2')
            cb(res);
        })
        .error((err) => {
            c('err', err)
            cb(err);
        })
    };

    // const test = function () {
    //     // c('heethe')
    //     // rangeYellow.set('podria', 'podra')
    //     // // .then((res) => {c('res', res)})
    //     // // .error((err) => {c('err', err)})
    //     // rangeYellow.get('podria', (err, res)=> {
    //     //     c('res, err', res, err);
    //     // });
    //
    //     rangeYellow.test(1, JSON.stringify({hello: "hthenteth"}))
    //     .then((res) => {
    //         c('here3');
    //     })
    //     .error((err) => {
    //         c('err', err);
    //     })
    // };

    return {
        consumate_game: consumate_game_005,
        init_game: init_game_005,
        init_season: init_season_005,
        init_team: init_team_005,
        init_league: init_league_005,
        // test: test
    }
};

export default function (message: any, Orange: any) {
    var rangeYellow = Promise.promisifyAll(api__000("magnanimity", Orange));
    return sunspot(rangeYellow);
};


// export default function () {
//     return 43;
// };
