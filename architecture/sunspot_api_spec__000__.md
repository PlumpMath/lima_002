






# Data Layer :: Redis / Lua :: Lambda Architecture :: `Orange`, `sunspot`, `rangeYellow`, `...`
---------------------------------------------------------------------------------------------



------------------------------------------------------------------------------------

## Event Actions ::

_Admin:_
### Initiate League  :: params: [name]   ::: return {leagueZ, name, }
### Edit League
### League action (init, change name?, associate season)

### Associate Season with League
**would never happen out of the context of**
### Init season:
params (leagueZ, name:string)  _(the name just describes it in human readable form:: ie "2018")_
Initiate season main Q. Associate season with league.
return params (seasonZ, leagueZ, name).

### Set season time span:
starting date
ending date

### Associate Team with Season
team very likely created outside the conteixt of season, so now just associating it.
params: teamZ, any other metadata that we want to embed into the league reducer accumulator structure, maybe team name only, maybe nothing, maybe more.  who knows.

### Associate Game With Season
params: (seasonZ, gameZ)  :: returnType: ()

### Initiate Season

### Edit Season

### Game event
(initiate game)

### Initiate Game
params:  (timestamp, game-name: string, ),  

returnType:

full-type state root-bare: (gameZ: uid, name:string, consumated:boolean, result: Result, scheduled-date: Date, home-team: uid, visitor-team: uid)




-------------------------------------------------------------------------


## Object Types ::

### ResultPlace :: used for team place in game result
one of ["Won", "Lost", "Tied"]

### Team-000 : Used for Results
{teamZ:uid, name: string}
### Result:  Used for Games
{
    home-team: Team-000 assign {finalScore: integer}
    visitor-team: Team-000 assign {finalScore: integer, place: ResultPlace }

}

### TimeSpan :: Used for Seasons
{start-date: Date, end-date: Date}


### League
Until sandbox abstraction of multiple worlds, League exists globally under implicit World.

### Season
Seasons exist under context of leagues. The are associated wiht time therefore have on root

Bare Object Type
_reduces only , doesn't assemble remote objects , remote objects being those that are assembled by other reducers. associated with another queue. ._
_otoh: it could be that some of the basic metadata is encoded in the events.  so we might get team name in the events not just teamZ ._
{
- seasonZ: uidString to main event queue, everything else on the object is created by the reducer(s) from events:
- owningLeagueZ: uid to league
- season-custom-time-span-object ::  {startDate, endDate}
- games :: set of zuids referring to game Qs :: [zid1, zid2]
}


-------------------------------------------------------------------------

**old**
>Object type: { seasonZ:uidstring, name:string, season-custom-time-span-object:stringifiedjson,games:zId to set unsorted[] , teams: zId to unsorted set[set contains zId of team primary state queue object. ]}

>No this won't work becaues those sets represent mutating state.  we need to know not only which teams are in our season/league, but if they came or left at some point in time.  can hapen.  so indeed teams type on season is a set of z-uids associated with those objects, but it's produced by the reducer.  Indeed there is no basic Redis type that stores anything about anything except for these event queues. These are lists.  Now when it comes to other areas of application such as realtime chat availability we might swicth to mutable not completely logged state.  sorted sets.  also if need woulrd be good to memoize some things in hashes and sets to be periodically checked against calls against the reducer funcitons for verification.

-----------------------------------------------------------------------------------------------


So season decorated object contains array of teams.  the individual teams states are contsructed according to present state functions associated with those models.

so the script to get a nicely decorated and detailed object with some middling level of detail for our team objects would run reducers over those team queues.  these reducers would probably have close analogues in scripts associated with other api endpoitns.  there is no modularisation of code , so there will be some repeating.  no issue.

some metadata associated with a season at a given point in time

### Games

### Player

### Commissioner

###


-----------------------------------------------------------------------------


## State Request Functions:


### Get League At Time T 000 :
same but for time dependency of parameter

### Get League 000:

Params: leagueZ,  Return :
{leagueZ, name,
seasons
teams
games
}

### Get Leagues in World 001
Something that returns more data for a more detailed look at seasons, games, etc in the league.
return : {leagues: [{leagueZ, name, seasons: [{seasonZ, name, games: [{...?}]}]}]}
### Get Leagues in World 000
Very simple version returns only league names
Params: void ::: return {leagues:[{leagueZ, name}]})   ::

### Get Total State (at current time)

### Get Total State (as of time T)

### Get some partial State (at current time)



### Get some partial State (as of time T)






____________________________________________________________________
## Reducers :: Reducer Funcitons





-----------------------------------------------------------------------------

## State Image :: define Codomain(s)

###
