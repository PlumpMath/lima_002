"use strict";
var c = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    console.log.apply(console, args);
};
// admin stuff
exports.init_league = "init_league";
exports.init_team = "init_team";
exports.init_season = "init_season";
exports.init_game = "init_game";
exports.consumate_game = "consumate_game"; //final scores&result
