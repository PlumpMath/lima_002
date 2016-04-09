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

import * as leibniz from '../constants/admin_interfaces_001'
let interfaces = {}
_.assign(interfaces, leibniz);
const i = interfaces;

import sunspot from '../../range_api/admin_003'

let admin = sunspot("admin", Orange);

// Step One ; Assemble Mocks
let league_mocks = [];
let team_mocks = {};
let season_mocks = {};
let game_mocks = {};

let date_mocks = [];
date_mocks.push(new Date()); // set an arg for different real dates.
date_mocks.push(new Date());
date_mocks.push(new Date());
date_mocks.push(new Date());
date_mocks.push(new Date());
date_mocks.push(new Date());


let leagueFactory = function(): i.LeagueCore {
    return {
        leagueZ: uuid.v4(),
        leagueName: "LeagueName: " + shortid();
    }
};
let teamFactory = function(leagueZ): i.TeamCore {
    return {
        teamZ: uuid.v4(),
        teamName: "TeamName: " + shortid(),
        leagueZ: leagueZ
    }
};
let SeasonFactory = function(leagueZ): i.SeasonCore {
    return {
        seasonZ: uuid.v4()
        seasonName: "SeasonName: " + shortid()
        leagueZ: leagueZ
    }
};
let GameFactory = function(leagueZ, seasonZ, homeTeamZ, visitorTeamZ): {

};



_.forEach([1,2,3], => {
    league_mocks.push(leagueFactory());
});
