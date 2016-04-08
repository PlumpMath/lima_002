const Note_TODO = `
Don't forget to implement http://msgpack.org/ msgpack instead of JSON, as it's supposedly much
faster.


`

type Uid = string;
type score = number;

type teamName = string;
type leagueName = string;
type lLeagueName = string;



export interface Player_Line_Core_000 {

}

export interface I_Player_Enters_Line_000 {
    (playerZ: Uid, lineZ: Uid): any
}

interface Init_Line_000 {
    // will need to handle verification / auths through RPC API and sessions mgmt, maybe token
    (leagueZ: Uid, gameZ: Uid): Uid
}

interface LineCore_001 {
    bet_visitorTeam_final_score: score,
    bet_homeTeam_final_score: score
}

interface LineTable_001 {
    [playerZ: Uid]: LineCore_001
}

interface Line_bare_001 {
    LineTable: LineTable_001,
    LLeague_owning: uid,
    game_wrapped: uid,
}

interface Line_bare_000 {
    player_bet: LineCoreTable_000,
    LLeague_owning: uid,
    game_wrapped: uid,
}

interface LLeague_deco_000 {
    lLeagueZ: uid,
    lLeagueName: string,
    commissionerZ: uid
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
    lLeagues_memberOf_B_deco: LLeague_bare_000_rayy
}

interface Commissioner_bare_000 extends User_bare_000 {
    lLeagues_owned_Bz: Uid_rayy
}

interface Commissioner_deco_001 extends Commissioner_bare_000 {
    lLeagues_owned_B: LLeague_bare_000_rayy
}


interface LLeague_bare_000 {
    lLeagueZ: uid,
    lLeagueName: string,
}

interface LLeague_bare_001 extends LLeague_bare_000 {
    commissionerZ: uid,
    commissionerName: string,
}

interface LLeague_bare_002 extends LLeague_bare_001 {
    players_B: Uid_rayy,
    lines_B: Uid_rayy
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

interface LLeague_bare_000_rayy {
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
    homeTeam_finalScore: score,
    visitorTeam_finalScore: score,
    homeTeamZ: uid, // decorator for verification
    visitorTeamZ: uid, // decorator for verification
    // visitorTeam_outcome: number, // -1 for loss 0 for tie 1 for win ?
    // homeTeam_outcome: number // -1 for loss 0 for tie 1 for win
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
