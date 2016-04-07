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

c('is good')
const base = '../../';
// import lLeague from '../models/lLeague_002'

import league from '../../range__api/league_002'
import game from '../../range__api/game_002'

var sunspot = league("league", Orange);
var novaspot = game('game', Orange);

const player_mock_Z = uuid.v4();
var leagueDirectory = null;

describe('initiation of testing regime', () => {
    it('should be something here', (done) => {
        c('something was done');
        done();
    })
})

var game_mocks = {
    imaginary: []
}

var league_mocks = {
    imaginary: []
    english: {
        name: "ENGLISH PREMEIR LEAGUE",
        leagueZ: null
    },
    spanish: "SPANISH LEAGUE"
};

var team_mocks = {
    imaginary: []
}

const mock_team_factory = function(){
    let mock_name = "MOCK_TEAM_NAME" + uuid.v4();
    team_mocks.imaginary.push({
        name: mock_name,
        teamZ: null
    });
}

const mock_league_factory = function(){
    let mock_name = "MOCK_NAME" + uuid.v4();
    league_mocks.imaginary.push({
        name: mock_name,
        leagueZ: null
    });
};
mock_league_factory();
mock_league_factory();
mock_league_factory();
mock_league_factory();
_.forEach([0,1,2,3], (item, index) => {
    mock_team_factory();
});
c('imaginary teams', team_mocks.imaginary);
c('imaginary mocks', league_mocks.imaginary);


describe('initiation of a real league in the world', () => {
    // for now just go with one constant "WORLD"
    it('should be possible to instantiate a real sports league into the world', (done) => {
        sunspot.league_init(league_mocks.imaginary[0].name, (go) => {
            c('have go', go)
            c('go should have leagueZ', go.leagueZ)
            league_mocks.imaginary[0].leagueZ = go.leagueZ;
            done();
        });
    });
});

describe('atom event queue should be there', () => {
    it("If the name isn't already taken, should register the event with WORLD, & initialise the atomic data structure ", (done) => {
        sunspot.league_state_000(league_mocks.imaginary[0].leagueZ, (go) => {
            let parsed = JSON.parse(go);
            let parsed2 = _.map(parsed , (item , idx) => {
                return JSON.parse(item);
            });
            assert.equal(parsed2[0].leagueZ, league_mocks.imaginary[0].leagueZ);
            done();
        });
    });
});

describe('we should be able to add teams', () => {
    it("We have some mock teams and we add them in", (done) => {
        sunspot.add_team(league_mocks.imaginary[0].leagueZ, team_mocks.imaginary[0].name, (go) => {
            c('test has go', go);
            assert.equal(go.res, 'okgood');
            team_mocks.imaginary[0].teamZ = go.teamZ;
            // done();
        });
        sunspot.add_team(league_mocks.imaginary[0].leagueZ, team_mocks.imaginary[1].name, (go) => {
            c('test has go2', go);
            assert.equal(go.res, 'okgood');
            team_mocks.imaginary[1].teamZ = go.teamZ;
            done();
        });

    });
});

describe('now this attempt to add same team name to league should fail', () => {
    it('attempting to add an already added team', (done) => {
        sunspot.add_team(league_mocks.imaginary[0].leagueZ, team_mocks.imaginary[0].name, (go) => {
            c('test to fail has go', go);
            assert.equal(go.res, 'no');
            done();
        });
    });
});

describe('should be able to add a game to a league', () => {
    it('we have two teamZs and one leagueZ we can add a game', (done) => {
        let payload = {
            leagueZ: league_mocks.imaginary[0].leagueZ,
            home_teamZ: team_mocks.imaginary[0].teamZ,
            visitor_teamZ: team_mocks.imaginary[1].teamZ
        };
        sunspot.add_game(payload, (go) => {
            c('cb in test has go', go);
            game_mocks.imaginary.push({gameZ: go.gameZ})
            done()
        });
    });
});

describe('we should be able to edit a game', () => {
    it('should allow me to submit an edit action to the game queue', (done) => {
        let payload = {
            gameZ: game_mocks.imaginary[0].gameZ,
            data: {
                home_team_final_score: "3",
                visitor_team_final_score: "22"
            }
        };
        sunspot.edit_game(payload, (go) => {
            c('cb in test edit', go);
            done();
        });
    });
});

describe('now with a diferent api focused on games we should be able to get game state', () => {
    it('should allow us to look into game state', (done)=> {
        novaspot.state_000(game_mocks.imaginary[0].gameZ, (go) => {
            c(' \n cb in state_000', go);
            done();
        });
    });
})

describe('if some games have been added so could add a line', () => {
    it('should be able to query leagues for games', (done) => {
        sunspot.query_for_undecided_games(league_mocks.imaginary[0].leagueZ, (go) => {
            c(' have go with ', go);
            done();
        });

    });
});
