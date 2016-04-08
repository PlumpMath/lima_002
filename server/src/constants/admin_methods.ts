


const c = function(...args:any[]){console.log.apply(console, args);};


// admin stuff

export const init_league = "init_league";
export const init_team = "init_team";
export const init_season = "init_season";
export const init_game = "init_game";

export const consumate_game = "consumate_game";  //final scores&result


// this may be redundant if init_game already onyl in context of season
export const add_game_to_season = "add_game_to_season";
export const add_season_to_league = "add_season_to_league";

export const add_team_to_league = "add_team_to_league";
