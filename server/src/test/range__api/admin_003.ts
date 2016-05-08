const c = function(...args:[any]) {console.log.apply(console, arguments);};
import * as _ from 'lodash';
import fs = require('fs');
import should = require('should');
import uuid = require('node-uuid');
import Bluebird = require('bluebird');
import IoRedis = require('ioredis');
var Orange = IoRedis.createClient();
const Promise = Bluebird.Promise;
import shortid = require('shortid');
import assert = require('assert');

// import * as leibniz from '../constants/admin_interfaces_001'
// let interfaces = {}
// _.assign(interfaces, leibniz);
// const i = interfaces;
import sunspot from '../../range__api/admin_003'

let admin = sunspot("admin", Orange);

// Step One ; Assemble Mocks
let league_tickets = []
let leagues = [];

let date_mocks = []
date_mocks.push(new Date()); // set an arg for different real dates.
date_mocks.push(new Date());
date_mocks.push(new Date());
date_mocks.push(new Date());
date_mocks.push(new Date());
date_mocks.push(new Date());


let league_ticket_factory = function() {
    return {
        leagueName: "LeagueName: " + shortid()
    }
};
let team_ticket_factory = function(leagueZ) {
    return {
        teamName: "TeamName: " + shortid(),
        leagueZ: leagueZ
    }
};
let season_ticket_factory = function(leagueZ)  {
    return {
        seasonName: "SeasonName: " + shortid(),
        leagueZ: leagueZ
    }
};
let game_ticket_factory = function (arq) {
    {leagueZ, seasonZ, home_teamZ, visitor_teamZ, date} = arq
    return {
        gameName: "GameName: " + shortid(),
        leagueZ: leagueZ,
        seasonzZ: seasonZ,
        homeTeamZ: homeTeamZ,
        visitorTeamZ: visitorTeamZ,
        date: date
    }
};

_.forEach([1,2,3], (n) => {
    league_tickets.push(league_ticket_factory());
});


// before(function (done) {
// });

describe('init league', ()=> {
    it('init league', (done)=> {
        _.forEach(league_tickets, (league_ticket, idx) => {
            admin.init_league(league_ticket, (res) => {
                c();
                c('res2', '\n', res);
                c(typeof res);
                c("Assert: res should have leagueZ and leagueName attributes");
                let league = {
                    leagueZ: res.leagueZ,
                    leagueName: res.leagueName,
                    teams: [],
                    seasons: [],
                    games: []
                };
                leagues.push(league);
                if (idx === league_tickets.length - 1) {done();}
            });
        });
    });
});

describe('init teams', () => {
    it('init team', (done) => {
        _.forEach(leagues, (league, idx) => {
            _.forEach([1,2,3,4], (num) => {
                c();
                let team_ticket = team_ticket_factory(league.leagueZ);
                admin.init_team(team_ticket, (res) => {
                    c();
                    c(res);
                    c("Assert: team_ticket should have timestamp, teamZ, teamName, leagueZ, etc attributes, and the result should be 'okgood'");
                    let team = {
                        leagueZ: res.leagueZ,
                        teamZ: res.teamZ
                    };
                    //add to
                    league.teams.push(team);
                    if ((num === 4) && (idx === leagues.length - 1)) {done();}
                });
            });
        });
        c('leagues.length', leagues.length);
    });
});

describe('init seasons', () => {
    it('init seasons', (done) => {
        _.forEach(leagues, (league, idx) => {
            _.forEach([1,2,3], (num) => {
                c();
                let season_ticket = season_ticket_factory(league.leagueZ);
                admin.init_season(season_ticket, (res) => {
                    c();
                    c(res);
                    c("Assert: res/ticket should have all these attributes, and result attribute should be 'okgood'");
                    let season = _.omit(res, ['']); //todo complete array of fields to omit
                    league.seasons.push(season);
                    if ((idx === leagues.length - 1) && (num === 3)) {done();}
                });
            });
        });
    });
});

describe('init games', () => {
    it('init games', (done) => {
        _.forEach(leagues, (league, idx) => {
            _.forEach(league.seasons, (season, idx2) => {
                let home_team_1 = league.teams[0]
                let visitor_team_1 = league.teams[1]
                let home_team_2 = league.teams[2]
                let visitor_team_2 = league.teams[3]
                //for each season we'll make two games
                // {leagueZ, seasonZ, home_teamZ, visitor_teamZ, date} = arq
                let arq_1 = {
                    leagueZ: league.leagueZ,
                    seasonZ: season.seasonZ,
                    home_teamZ: home_team_1.teamZ,
                    visitor_teamZ: visitor_team_1.teamZ,
                    date: new Date()
                };
                let arq_2 = {
                    leagueZ: league.leagueZ,
                    seasonZ: season.seasonZ,
                    home_teamZ: home_team_2.teamZ,
                    visitor_teamZ: visitor_team_2.teamZ,
                    date: new Date()
                };
                let game_ticket_1 = game_ticket_factory(arq_1);
                let game_ticket_2 = game_ticket_factory(arq_2);
                admin.init_game(game_ticket_1, (res_1) => {
                    c('res_1', res_1);
                    admin.init_game(game_ticket_2, (res_2) => {
                        c('res_2', res_2);
                    })
                })
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
