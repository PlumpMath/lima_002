
const c = function(...args:any[]){console.log.apply(console,arguments);};

type uid = string;ni

export interface GameConsumate_Ticket {
    gameZ: uid,
    homeTeam_finalScore: number,
    visitorTeam_finalScore: number
}

export interface GameInit_Ticket {
    seasonZ: uid,
    leagueZ: uid,
    homeTeamZ: uid,
    visitorTeamZ: uid,
    scheduledDate: Date
}

export interface SeasonInit_Ticket_Inc {
    seasonName: string,
    leagueZ: uid
}

export interface SeasonInit_Ticket {
    seasonName: string,
    leagueZ: uid
}

export interface TeamInit_Ticket {
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
}
