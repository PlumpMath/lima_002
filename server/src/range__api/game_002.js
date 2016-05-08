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
var api__000 = function (message, Orange) {
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
};
var novaspot = function (rangeYellow) {
    var state_000 = function (gameZ, cb) {
        var str_payload = JSON.stringify({
            event_type: "STATE_000",
            timestamp: Date.now(),
            gameZ: gameZ
        });
        rangeYellow.state_000(1, str_payload)
            .then(function (res) {
            c('have res iiia', res);
            cb({ res: res });
        })
            .error(function (err) {
            c('have err', err);
            cb(err);
        });
    };
    var edit_game = function (payload, cb) {
        // TODO : decide if API should have data-validation responsibilities;
        //                                                      if so then implement.
        // payload_validator_for_edit_game = (payload) ->
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
    return {
        state_000: state_000,
        edit_game: edit_game,
        add_game: add_game
    };
};
function default_1(message, Orange) {
    var rangeYellow = Promise.promisifyAll(api__000("magnanimity", Orange));
    return novaspot(rangeYellow);
}
exports.__esModule = true;
exports["default"] = default_1;
;
