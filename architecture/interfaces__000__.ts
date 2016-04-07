



type uid = string;
type score = number;
type teamName = string;
type leagueName = string;

interface Team {
    teamZ: Uid
}

interface LeagueBare_001 {
    leagueZ: uid,
    leagueName: leagueName
}

interface LeagueBare { //League at the most austere level of decorative detail
    leagueZ: uid,
    leagueName: leagueName,
    seasonsB: uid[],  // array of uids
    teamsB: uid[], // array of uids
    gamesB: uid[] // may not be necessary to include this independent of seasons
}

interface InitLeague_001 {
    (leagueName: leagueName): LeagueBare_001
}

interface InitLeague {
    (leagueName: leagueName): LeagueBare
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
