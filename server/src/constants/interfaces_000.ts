









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

export interface LeagueInit_CB {
    ()
}

export interface LeagueInit_Return {
    result: string

}
export interface LeagueInit_Ticket {
    leagueName: string,
    leagueZ: uid
}
