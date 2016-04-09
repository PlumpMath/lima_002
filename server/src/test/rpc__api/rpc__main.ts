
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

{}


const rpc__api = require('../../rpc__api/rpc__index').rpc__api;
// c('is good')
const ra = rpc__api;
// c('rpc__api', rpc__api);

import {init_league, init_team, init_season, init_game, consumate_game} from '../constants/admin_methods';


// This is the client facing API.  It should behave as the RPC layer but without having to
// run an RPC connection.
c("This is the client facing API.  It should behave as the RPC layer but without having to run an RPC connection. So here we mock the rpc objects,  Like hook captain Cook.")

var mock_league = {};

var mock_teams = {};



describe('request to make a league', () => {
    it('should make a league', (done) => {
        let mockname = "League Mock" + shortid();
        mock_league.name = mockname;
        let req = {
            event_type: init_league,
            name: mockname
        };
        ra(req, (res) => {
            c('test has callback res', res)
            assert.equal(res.result, 'okgood');
            mock_league.leagueZ = res.leagueZ;
        });
        done();
    });
});

describe('we should be able to add teams', ()=> {
    it('teams add ', (done) => {
        let name = "TEAM_MOCK_____________" + shortid();
        let req = {
            event_type: init_team,
            leagueZ: mock_league.leagueZ,
            name: name
        };
        ra(req, (res) => {
            assert.equal(res.result, 'okgood');
        });
        done();
});

describe('add season to league', ()=> {
    it('add season', (done)=> {
        let name = "2017 SEASON_MOCK " + shortid();
        let req = {
            event_type: init_season,
            leagueZ: mock_league.leagueZ,;
            name: name
        };
        ra(req, (res)=> {
            c('test has res', res);

        });
        done();
    });
});
