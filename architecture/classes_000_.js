"use strict";
var c = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    console.log.apply(console, args);
};
c('hi');
var LineCore_001 = (function () {
    function LineCore_001(home_score, visitor_score) {
        this.bet_visitorTeam_finalScore = visitor_score;
        this.bet_homeTeam_finalScore = home_score;
    }
    return LineCore_001;
}());
exports.LineCore_001 = LineCore_001;
var Player_Line_Core_000 = (function () {
    function Player_Line_Core_000(playerZ, lineZ, gameZ, lineCore) {
        this.playerZ = playerZ;
        this.lineZ = lineZ;
        this.gameZ = gameZ;
        this.lineCore = lineCore;
    }
    return Player_Line_Core_000;
}());
exports.Player_Line_Core_000 = Player_Line_Core_000;
var lineCore_b1 = new LineCore_001(23, 18);
var x = new Player_Line_Core_000('playerZ', 'lineZ', 'gameZZZ', lineCore_b1);
c('have x', x);
