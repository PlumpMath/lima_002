

const c = function(...args: any[]) {console.log.apply(console, args);};

c('hi')

type Uid = string;
type score = number;



export class LineCore_001 {
    bet_visitorTeam_finalScore: score;
    bet_homeTeam_finalScore: score;
    constructor (home_score, visitor_score) {
        this.bet_visitorTeam_finalScore = visitor_score;
        this.bet_homeTeam_finalScore = home_score;
    }
}

export interface LineCore_001 {
    bet_visitorTeam_final_score: score,
    bet_homeTeam_final_score: score
}

export interface I_Player_Line_Core_000 {
    // object type for a single line from Player perspective
    playerZ: Uid,
    lineZ: Uid,
    gameZ: Uid,
    lineCore: LineCore_001
}

export class Player_Line_Core_000 implements I_Player_Line_Core_000 {
    playerZ: Uid;
    lineZ: Uid;
    gameZ: Uid;
    lineCore: LineCore_001;
    constructor (playerZ: Uid, lineZ: Uid, gameZ: Uid, lineCore: LineCore_001 ) {
        this.playerZ = playerZ;
        this.lineZ = lineZ;
        this.gameZ = gameZ;
        this.lineCore = lineCore;
    }
}



var lineCore_b1 = new LineCore_001(23, 18);

var x = new Player_Line_Core_000('playerZ', 'lineZ', 'gameZZZ', lineCore_b1);

c('have x', x);
