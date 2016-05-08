"use strict";
var c = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    console.log.apply(console, arguments);
};
var _ = require('lodash');
var uuid = require('node-uuid');
var Bluebird = require('bluebird');
var IoRedis = require('ioredis');
var Orange = IoRedis.createClient();
var Promise = Bluebird.Promise;
var shortid = require('shortid');
// import * as leibniz from '../constants/admin_interfaces_001'
// let interfaces = {}
// _.assign(interfaces, leibniz);
// const i = interfaces;
var admin_003_1 = require('../../range__api/admin_003');
var admin = admin_003_1.default("admin", Orange);
// Step One ; Assemble Mocks
var league_mocks = [];
var team_mocks = {};
var season_mocks = {};
var game_mocks = {};
var date_mocks = [];
date_mocks.push(new Date()); // set an arg for different real dates.
date_mocks.push(new Date());
date_mocks.push(new Date());
date_mocks.push(new Date());
date_mocks.push(new Date());
date_mocks.push(new Date());
var leagueFactory = function () {
    return {
        leagueZ: uuid.v4(),
        leagueName: "LeagueName: " + shortid()
    };
};
var teamFactory = function (leagueZ) {
    return {
        teamZ: uuid.v4(),
        teamName: "TeamName: " + shortid(),
        leagueZ: leagueZ
    };
};
var SeasonFactory = function (leagueZ) {
    return {
        seasonZ: uuid.v4(),
        seasonName: "SeasonName: " + shortid(),
        leagueZ: leagueZ
    };
};
var GameFactory = function (leagueZ, seasonZ, homeTeamZ, visitorTeamZ) {
    return null;
};
_.forEach([1, 2, 3], function (item) {
    league_mocks.push(leagueFactory());
});
