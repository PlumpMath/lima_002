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
var assert = require('assert');
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
var random_score_gen = function () {
    return Math.floor(Math.random() * 10);
};
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
var game_ticket_factory = function (arq) {
    c('arq', arq);
    var leagueZ = arq.leagueZ, seasonZ = arq.seasonZ, home_teamZ = arq.home_teamZ, visitor_teamZ = arq.visitor_teamZ, date = arq.date;
    c('leagueZ', leagueZ);
    return {
        gameName: "GameName: " + shortid(),
        leagueZ: leagueZ,
        seasonZ: seasonZ,
        home_teamZ: home_teamZ,
        visitor_teamZ: visitor_teamZ,
        date: date
    };
};
// let game_consumate_ticket_factory = function (arq) {
//     // let {gameZ, leagueZ, seasonZ, home_team_final_score, visitor_team_final_score} = arq;
//     return _.assign(arq, {
//         date: date,
//
//     });
// };
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
                c("Assert: res should have leagueZ and leagueName attributes");
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
                    c("Assert: team_ticket should have timestamp, teamZ, teamName, leagueZ, etc attributes, and the result should be 'okgood'");
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
                    c("Assert: res/ticket should have all these attributes, and result attribute should be 'okgood'");
                    var season = _.omit(res, ['']); //todo complete array of fields to omit
                    season.games = [];
                    league.seasons.push(season);
                    if ((idx === leagues.length - 1) && (num === 3)) {
                        done();
                    }
                });
            });
        });
    });
});
describe('init games', function () {
    it('init games', function (done) {
        _.forEach(leagues, function (league, idx) {
            _.forEach(league.seasons, function (season, idx2) {
                var home_team_1 = league.teams[0];
                var visitor_team_1 = league.teams[1];
                var home_team_2 = league.teams[2];
                var visitor_team_2 = league.teams[3];
                //for each season we'll make two games
                // {leagueZ, seasonZ, home_teamZ, visitor_teamZ, date} = arq
                var arq_1 = {
                    leagueZ: league.leagueZ,
                    seasonZ: season.seasonZ,
                    home_teamZ: home_team_1.teamZ,
                    visitor_teamZ: visitor_team_1.teamZ,
                    date: new Date()
                };
                var arq_2 = {
                    leagueZ: league.leagueZ,
                    seasonZ: season.seasonZ,
                    home_teamZ: home_team_2.teamZ,
                    visitor_teamZ: visitor_team_2.teamZ,
                    date: new Date()
                };
                var game_ticket_1 = game_ticket_factory(arq_1);
                var game_ticket_2 = game_ticket_factory(arq_2);
                admin.init_game(game_ticket_1, function (res_1) {
                    // TODO async parallel this instead of cb hell
                    c('res_1', res_1);
                    var game = _.omit(res_1, ['']); //todo complete array of fields to omit
                    season.games.push(game);
                    admin.init_game(game_ticket_2, function (res_2) {
                        c('\n' + 'res_2', res_2);
                        var game = _.omit(res_2, ['']); //todo complete array of fields to omit
                        season.games.push(game);
                        // assert(res2.result === 'okdone');
                        assert(res_2.result === 'okdone');
                        if ((idx === leagues.length - 1) && (idx2 === league.seasons.length - 1)) {
                            done();
                        }
                    });
                });
            });
        });
    });
});
describe('consumate_games', function () {
    it('should be able to consumate games', function (done) {
        _.forEach(leagues, function (league, idx) {
            _.forEach(league.seasons, function (season, idx2) {
                _.forEach(season.games, function (game, idx3) {
                    var consumate_ticket = _.assign(game, {
                        home_team_final_score: random_score_gen(),
                        visitor_team_final_score: random_score_gen()
                    });
                    admin.consumate_game(consumate_ticket, function (res) {
                        c('\n res 393939', res);
                        if ((idx === leagues.length - 1) && (idx2 === league.seasons.length - 1) && (idx3 === season.games.length - 1)) {
                            done();
                        }
                    });
                });
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
