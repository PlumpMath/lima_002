"use strict";
var c = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    console.log.apply(console, arguments);
};
var _ = require('lodash');
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
var date_mocks = [];
date_mocks.push(new Date()); // set an arg for different real dates.
date_mocks.push(new Date());
date_mocks.push(new Date());
date_mocks.push(new Date());
date_mocks.push(new Date());
date_mocks.push(new Date());
var leagueFactory = function () {
    return {
        leagueName: "LeagueName: " + shortid()
    };
};
var teamFactory = function (leagueZ) {
    return {
        teamName: "TeamName: " + shortid(),
        leagueZ: leagueZ
    };
};
var seasonFactory = function (leagueZ) {
    return {
        seasonName: "SeasonName: " + shortid(),
        leagueZ: leagueZ
    };
};
var gameFactory = function (leagueZ, seasonZ, homeTeamZ, visitorTeamZ, date) {
    return {
        gameName: "GameName: " + shortid(),
    };
};
_.forEach([1, 2, 3], function (n) {
    league_mocks.push(leagueFactory());
});
// _.forEach(league_mocks, (league, idx) => {
//     admin.init_league(league, (res) => {
//         c('have res', res);
//     });
//     // .then((res) => {
//     //     c('res', res)
//     // })
//     // .error((err) => {
//     //     c('err', err)
//     // })
// });
var x = league_mocks[0];
c('x', x);
admin.init_league(x, function (res) {
    c('res', res);
});
// admin.test()
// c('sunspot', admin.init_league);
describe('wait', function () {
    it('should wait', function (done) {
        setTimeout(function () {
            done();
        }, 1000);
    });
});
