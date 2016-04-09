



function gameConsumate_ticket_factory (gameZ, homeTeam_finalScore, visitorTeam_finalScore): interfaces.GameConsumate_Ticket {
    return {
        gameZ: gameZ,
        homeTeam_finalScore: homeTeam_finalScore,
        visitorTeam_finalScore: visitorTeam_finalScore
    }
};

function gameInit_ticket_factory (seasonZ, leagueZ, homeTeamZ, visitorTeamZ, scheduledDate): interfaces.GameInit_Ticket {
    return {
        seasonZ: seasonZ,
        leagueZ: leagueZ,
        homeTeamZ: homeTeamZ,
        visitorTeamZ: visitorTeamZ,
        scheduledDate: scheduledDate
    }
};

function seasonInit_ticket_factory (seasonZ, seasonName, leagueZ): interfaces.SeasonInit_Ticket {
    return {
        seasonZ: seasonZ,
        seasonName: seasonName,
        leagueZ: leagueZ
    }
}

function teamInit_ticket_factory (teamZ, teamName, leagueZ): interfaces.TeamInit_Ticket {
    return {
        teamZ: teamZ,
        teamName: teamName,
        leagueZ: leagueZ
    }
};

function leagueInit_ticket_factory (leagueZ, leagueName): interfaces.LeagueInit_Ticket  {
    return {
        leagueZ: leagueZ
        leagueName: leagueName
    }
};





const query_for_undecided_games = function(leagueZ, cb) {
    // get active games associated witha  league
    rangeYellow.query_for_undecided_games(1, leagueZ)
    .then((res) => {
        c('have res euea', res);
        cb({res: res});
    })
    .error((err) => {
        c('have err', err);
        cb(err);
    })
};

const edit_game = function(payload, cb) {
    //payload={gameZ, data}
    let str_payload = JSON.stringify(_.assign(payload, {
        event_type: "EDIT_GAME",
        timestamp: Date.now()
    }));
    rangeYellow.edit_game(1, str_payload)
    .then((res) => {
        c('have res euea', res);
        cb({res: res});
    })
    .error((err) => {
        c('have err', err);
        cb(err);
    })

};

const add_game = function(payload, cb) {
    // payload={leagueZ, visitor_teamZ, home_teamZ, maybe other stuff}
    let gameZ = uuid.v4();
    let str_payload = JSON.stringify(_.assign(payload, {
        event_type: "CREATE_GAME",
        timestamp: Date.now(),
        gameZ: gameZ
    }));
    rangeYellow.add_game(1, str_payload)
    .then((res) => {
        c('have res euea', res);
        cb({res: res, gameZ: gameZ});
    })
    .error((err) => {
        c('have err', err);
        cb(err);
    })
};

const init_team_001 = function(req, cb) {
    let teamZ = uuid.v4();
    let str_payload = JSON.stringify({
        event_type: init_team,
        timestamp: Date.now(),
        team_name: req.name,
        leagueZ: req.leagueZ,
        teamZ: teamZ
    });
    rangeYellow.add_team(1, str_payload)
    .then((res) => {
        c('have res euea', res);
        // let obj = JSON.parse(res);
        let obj = JSON.parse(res,res);
        c(obj.result);
        if (obj.leagueZ !== req.leagueZ || obj.teamZ !== teamZ) {throw "error"}
        cb({
            result: obj.result,
            teamZ: teamZ,
            team_name: req.name,
            leagueZ: req.leagueZ
        });
    })
    .error((err) => {
        c('have err', err);
        cb(err);
    })

};
const add_team_001 = function(req, cb) {
    let teamZ = uuid.v4();
    let str_payload = JSON.stringify({
        event_type: "ADD_TEAM_TO_LEAGUE",
        timestamp: Date.now(),
        team_name: req.name,
        leagueZ: req.leagueZ,
        teamZ: teamZ
    });
    rangeYellow.add_team(1, str_payload)
    .then((res) => {
        c('have res euea', res);
        // let obj = JSON.parse(res);
        let obj = JSON.parse(res,res);
        c(obj.result);
        if (obj.leagueZ !== req.leagueZ || obj.teamZ !== teamZ) {throw "error"}
        cb({
            result: obj.result,
            teamZ: teamZ,
            team_name: req.name,
            leagueZ: req.leagueZ
        });
    })
    .error((err) => {
        c('have err', err);
        cb(err);
    })
};

const add_team = function(leagueZ, team_name, cb) {
    // we could adopt a sensible rule where teams can only be initiated in the context of leagues
    // API can be reorganised later if partitioning of responsibilities
    // exactly the same as file structure
    // if no team by this name is already in the league, then a new
    // one is initiated, and leagueZ is returned.
    let teamZ = uuid.v4();
    let str_payload = JSON.stringify({
        event_type: "ADD_TEAM_TO_LEAGUE",
        timestamp: Date.now(),
        team_name: team_name,
        leagueZ: leagueZ,
        teamZ: teamZ
    });
    rangeYellow.add_team(1, str_payload)
    .then((res) => {
        c('have res euea', res);
        cb({res: res, teamZ: teamZ});
    })
    .error((err) => {
        c('have err', err);
        cb(err);
    })
};


const league_state_000 = function(leagueZ, cb) {
    let str_payload = JSON.stringify({
        event_type: 'STATE_REQUEST_000',
        timestamp: Date.now(),
        leagueZ: leagueZ
    });
    rangeYellow.league_state_000(1, str_payload)
    .then((res) => {
        c('have res aaaa', res);
        cb(res: res, leagueZ: leagueZ);
    })
    .error((err) => {
        c('have err', err);
        cb(err);
    })
};

const init_game = function(game_init_ticket: interfaces.GameInit_Ticket) {

};

// if we want the tickets already stringified before they get to this
// layer then no sense typechecking...oh well will see
const init_season_001 = function(ticket_inc: i.SeasonInit_Ticket) {
    let
};



// the interfaces and factory functions getting ridiculous so returning to
// just assembling it here.  the thing is, it probably comes in this
// way already even from the client side -- it would have to in order to
// transit ws as a json object, so maybe we should just be checking type
// interface here,
// the difference between 004 and 003 is we are abandoning trying to type
// the callback for now as waste of time
const init_league_004 = function(leagueInit_ticket: i.LeagueInit_Ticket, cb) {
    // it may well already be stringified, so will need to deal with that
    let str_payload = JSON.stringify(leagueInit_ticket);
    rangeYellow.init_league(1, str_payload)
    .then((res) => {
        // c('have res league init', res);
        // c('typeof res', typeof(res));
        let obj = JSON.parse(res);
        cb({result: obj.result, leagueZ: leagueZ, leagueName: league_name});
    })
    .error((err) => {
        c('have err', err);
        cb(err);
    })
};

//takes already assembled ticket
const init_league_003 = function(leagueInit_ticket: i.LeagueInit_Ticket, cb: interfaces.LeagueInit_CB) {
    let str_payload = JSON.stringify(leagueInit_ticket);
    rangeYellow.init_league(1, str_payload)
    .then((res) => {
        // c('have res league init', res);
        // c('typeof res', typeof(res));
        let obj = JSON.parse(res);
        cb({result: obj.result, leagueZ: leagueZ, leagueName: league_name});
    })
    .error((err) => {
        c('have err', err);
        cb(err);
    })
};

const init_league_000 = function(leagueName, cb) {
    let leagueZ = uuid.v4();
    let str_payload = JSON.stringify(leagueInit_ticket_factory(leagueZ, leagueName));
    rangeYellow.init_league(1, str_payload)
    .then((res) => {
        // c('have res league init', res);
        // c('typeof res', typeof(res));
        let obj = JSON.parse(res);
        cb({result: obj.result, leagueZ: leagueZ, leagueName: league_name});
    })
    .error((err) => {
        c('have err', err);
        cb(err);
    })
};
