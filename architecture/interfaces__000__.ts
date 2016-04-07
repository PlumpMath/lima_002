


const Note_TODO = `
Don't forget to implement http://msgpack.org/ msgpack instead of JSON, as it's supposedly much
faster.
`


type uid = string;
type score = number;
type teamName = string;
type leagueName = string;
type lLeagueName = string;

interface LLeague_deco_000 {
    lLeagueZ: uid,
    lLeagueName: string,
    commissionerZ: uid,

}



interface User_bare_000 {
    userZ: uid,
    name: string
}

interface Player_bare_000 extends User_bare_000 {
    lLeagues_member_of: Uid_rayy
}

interface Player_deco_000 extends User_bare_000 {
    lLeagues_memberOf_B_deco: LLeague_bare_000_rayy
}

interface Player_deco_001 extends Player_bare_000 {
    lLeagues_memberOf_B_deco: LLeague_deco_000_rayy
}


interface Commissioner_bare_000 extends User_bare_000 {


}

interface LLeague_bare_000 {
    lLeagueZ: uid,
    lLeagueName: string,
    commissionerZ: uid,
    commissionerName: string,
    players_B: uid[],
    lines_B: uid[]
}

interface Init_lLeague {
    (lLeagueName: string, commissionerZ: uid): LLeague_bare_000
}

interface InitTeam_000 {
    (teamName: teamName, leagueZ: uid): Team_bare_001
}

interface Uid_rayy {
    [index: number]: uid
}

interface LLeague_bare_rayy {
    [index: number]: LLeague_bare_000
}

interface Game_bare_000_rayy {
    [index: number]: Game_bare_000
}

interface Team_deco_000 {
    teamZ: uid,
    teamName: teamName,
    owning_league: League_bare_001,
    owning_seasons_B: Season_bare_000[],
    games: Game_bare_000_rayy
}

interface Season_bare_000 {
    seasonZ: uid,
    seasonName: string, // user readable, not important
    season_timeFrame: TimeFrame,
    games_B: uid[],// array of uid to games
    teams_B: uid[]  // array of uid to teams
}

interface TimeFrame {
    starting_date: Date,
    ending_date: Date
}

interface Completion_000 {
    homeTeam_score: score,
    visitorTeam_score: score,
    homeTeamZ: uid, // decorator for verification
    visitorTeamZ: uid, // decorator for verification
    visitorTeam_outcome: number, // -1 for loss 0 for tie 1 for win ?
    homeTeam_outcome: number // -1 for loss 0 for tie 1 for win
    // might change the type / expression for game outcome
}

interface Game_bare_000 {
    gameZ: uid,
    scheduledDate: Date,
    completed: boolean,
    completion?: Completion_001,
    home_team: Team_bare_001,
    visitor_team: Team_bare_001
}

interface Team_bare_001 {
    teamZ: uid,
    teamName: teamName,
    owning_leagueZ: uid,
    owning_leagueName: leagueName
}

interface Team_bare_000 {
    teamZ: uid,
    teamName: teamName
}

interface League_bare_001 {
    leagueZ: uid,
    leagueName: leagueName
}

interface LeagueBare_000 { //League at the most austere level of decorative detail
    leagueZ: uid,
    leagueName: leagueName,
    seasonsB: uid[],  // array of uids
    teamsB: uid[], // array of uids
    gamesB: uid[] // may not be necessary to include this independent of seasons
}

interface InitLeague_001 {
    (leagueName: leagueName): League_bare_001
}

interface InitLeague_000 {
    (leagueName: leagueName): LeagueBare_000
}

interface FinalScore {
    final_score: score
}

interface Result { // used for games as decorator
    home_team:
}

interface Game {
    gameZ: string, //uid
    //...

}
