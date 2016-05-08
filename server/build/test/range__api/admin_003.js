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
var league_tickets = [];
var leagues = [];
var date_mocks = [];
date_mocks.push(new Date()); // set an arg for different real dates.
date_mocks.push(new Date());
date_mocks.push(new Date());
date_mocks.push(new Date());
date_mocks.push(new Date());
date_mocks.push(new Date());
var league_ticket_factory = function () {
    return {
        leagueName: "LeagueName: " + shortid()
    };
};
var team_ticket_factory = function (leagueZ) {
    return {
        teamName: "TeamName: " + shortid(),
        leagueZ: leagueZ
    };
};
var season_ticket_factory = function (leagueZ) {
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
    league_tickets.push(league_ticket_factory());
});
// before(function (done) {
// });
describe('init league', function () {
    it('init league', function (done) {
        _.forEach(league_tickets, function (league_ticket, idx) {
            admin.init_league(league_ticket, function (res) {
                c();
                c('res2', '\n', res);
                c(typeof res);
                var league = {
                    leagueZ: res.leagueZ,
                    leagueName: res.leagueName,
                    teams: [],
                    seasons: [],
                    games: []
                };
                leagues.push(league);
                if (idx === league_tickets.length - 1) {
                    done();
                }
            });
        });
    });
});
describe('init teams', function () {
    it('init team', function (done) {
        _.forEach(leagues, function (league, idx) {
            _.forEach([1, 2, 3, 4], function (num) {
                c();
                var team_ticket = team_ticket_factory(league.leagueZ);
                admin.init_team(team_ticket, function (res) {
                    c();
                    c(res);
                    var team = {
                        leagueZ: res.leagueZ,
                        teamZ: res.teamZ
                    };
                    //add to
                    league.teams.push(team);
                    if ((num === 4) && (idx === leagues.length - 1)) {
                        done();
                    }
                });
            });
        });
        c('leagues.length', leagues.length);
    });
});
describe('init seasons', function () {
    it('init seasons', function (done) {
        _.forEach(leagues, function (league, idx) {
            _.forEach([1, 2, 3], function (num) {
                c();
                var season_ticket = season_ticket_factory(league.leagueZ);
                admin.init_season(season_ticket, function (res) {
                    c();
                    c(res);
                });
                if ((idx === leagues.length - 1) && (num === 3)) {
                    done();
                }
            });
        });
    });
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
// admin.test()
// c('sunspot', admin.init_league);
// describe('wait', ()=> {
//     it('should wait', (done) => {
//         setTimeout(()=> {
//             done();
//         }, 1000);
//     })
// })
