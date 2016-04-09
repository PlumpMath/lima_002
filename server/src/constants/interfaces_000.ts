
const c = function(...args:any[]){console.log.apply(console,arguments);};

type uid = string;ni

export interface GameConsumate_Ticket {
    gameZ: uid,
    homeTeam_finalScore: number,
    visitorTeam_finalScore: number
}

export interface GameInit_Ticket {
    gameZ: uid,
    seasonZ: uid,
    leagueZ: uid,
    homeTeamZ: uid,
    visitorTeamZ: uid,
    scheduledDate: Date
}

export interface SeasonInit_Ticket {
    seasonZ: uid,
    seasonName: string,
    leagueZ: uid
}

export interface TeamInit_Ticket {
    teamZ: uid,
    teamName: string,
    leagueZ: uid
}

export interface League_State_Micro_000 {
    leagueZ: uid,
    leagueName: string
}

//should return league name and leagueZ
export interface LeagueInit_CB extends League_State_Micro{
    result: boolean
}

export interface LeagueInit_Return {
    result: string

}
export interface LeagueInit_Ticket {
    leagueName: string,
    leagueZ: uid
}

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

export function

export function leagueInit_ticket_factory (leagueZ, leagueName): interfaces.LeagueInit_Ticket  {
    return {
        leagueZ: leagueZ
        leagueName: leagueName
    }
};
