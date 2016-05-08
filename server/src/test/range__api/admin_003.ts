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
let league_mocks = [];

let date_mocks = []
date_mocks.push(new Date()); // set an arg for different real dates.
date_mocks.push(new Date());
date_mocks.push(new Date());
date_mocks.push(new Date());
date_mocks.push(new Date());
date_mocks.push(new Date());


let leagueFactory = function() {
    return {
        leagueName: "LeagueName: " + shortid()
    }
};
let teamFactory = function(leagueZ) {
    return {
        teamName: "TeamName: " + shortid(),
        leagueZ: leagueZ
    }
};
let seasonFactory = function(leagueZ)  {
    return {
        seasonName: "SeasonName: " + shortid(),
        leagueZ: leagueZ
    }
};
let gameFactory = function(leagueZ, seasonZ, homeTeamZ, visitorTeamZ, date) {
    return {
        gameName: "GameName: " + shortid(),

    }
};

_.forEach([1,2,3], (n) => {
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

let x = league_mocks[0];
c('x', x);

admin.init_league(x, (res) => {
    c('res', res);
});

// admin.test()

// c('sunspot', admin.init_league);

describe('wait', ()=> {
    it('should wait', (done) => {
        setTimeout(()=> {
            done();
        }, 1000);
    })
})
