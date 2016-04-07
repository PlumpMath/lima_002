
const c = function(...args: any[]) {console.log.apply(console,arguments)};
import * as fs from 'fs'
import * as _ from 'lodash'
import Bluebird = require('bluebird');
var Promise = Bluebird.Promise;
import uuid = require('node-uuid');
const fS = Promise.promisifyAll(fs);
import path = require('path');

var api__000 =  function (message: any, Orange: any) {
    Orange.defineCommand('state_000', {
        lua: fs.readFileSync(path.resolve(__dirname, '../../lua/game/state_000.lua'))
    });
    Orange.defineCommand('edit_game', {
        lua: fs.readFileSync(path.resolve(__dirname, '../../lua/league/edit_game.lua'))
    });
    Orange.defineCommand('add_game', {
        lua: fs.readFileSync(path.resolve(__dirname, '../../lua/league/add_game.lua'))
    });

    return Orange;
}

var novaspot = function (rangeYellow) {


    const state_000 = function(gameZ, cb) {
        let str_payload = JSON.stringify({
            event_type: "STATE_000",
            timestamp: Date.now(),
            gameZ: gameZ
        });
        rangeYellow.state_000(1, str_payload)
        .then((res) => {
            c('have res iiia', res);
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

    return {
        state_000: state_000,
        edit_game: edit_game,
        add_game: add_game
    }
};

export default function (message: any, Orange: any) {
    var rangeYellow = Promise.promisifyAll(api__000("magnanimity", Orange));
    return novaspot(rangeYellow);
};
