





# 3 API layers
- 1: Model / data layer.
- 2: RPC websocket layer
- 3: web-Client internal state/action API

# Model API: `sunspot`  , `rangeYellow` , `Orange`  :: Redis / Lua /
**early draft/sketch**

_will enumerate the APIs separately ; they may largely mirror each other; iow the rpc layer might simply wrap the model layer very thinly; it's not always obvious until the implementation requirement details are uncovered in the process of implementation actuale ._

## `sunspot`: section admin API

- init league in context of global(world), init teams under context of league
- init season in context of league, init team under dual context of league and (bind to) seasons as those are initiated,
- init season under , edit season
- init game under context of season , edit game
- edit game prelim
- consumate game (finalise scores)


## `sunspot` : section of user API
_(context/role: C is Commissioner, P is Player, U is generic user role)_
- init lLeague (Lacoste League) under context global/later maybe differentiate sandbox/worlds (C)
- invite other user to join own lLeague as Player (C)
- accept invite to join (P)
- authing, registration, login, roles, (U)
- logout (U)
- getState-000 ---could be many varieties depending on which section of state is relevant to the request.


- edit lLeague (what can edit at root object?)  : name,

- init Line under context of lLeague (C)
- edit Line under context of lLeague

- view real-league
- view lLeague state (variety of players and lines)
- view results of some stages / lines

- place bet on line under context of lLeague as (P)
- edit bet on line "  "  "  " (P)
- view results of this and that (assorted state requests amounting to no mutating action)


# RPC API  `lumenVine`  `lumenGreen`,   ::  Primus / RPC / websocket /  Typescript / Node  :: API

-



## state on the client app.

admins: (create real world data models)
players and commissioners

-------------views include (admin model creation interface)

----------------------state for this could be monolithic, later wrapped in osmething large dfor assimilation.
















-------------------------------------------------------------------------------
-------------------------------------------------------------------------------
-------------------------------------------------------------------------------

### Components

-----------------------------
Components,

a


### Injectables


### RxJS  Reactive extensions to Javascript JavaScript




-------------------------------------------------------------------------------
-------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------
-------------------------------------------------





### Lacoste LaCoste game structure BRand
Wagering application betting pool.
In society of `Players` and `Commissioners`. The latter create lLeagues, which contain lines. The lines wrap games and contain metainfo about players bets. The `Players` can join leagues by invitation of the `Commissioner`.  They have to bet on all the lines.  The lines wrap the games which are owned by seasons which are owned by leagues. Also owned by leagues (and seasons) are teams.

### The admin:

The admin needs to add leagues, teams, some seasons (which own teams)(and own games) or just one.  Then can start consumating games.  which means giving them final outcomes.

That's it.  

### those are the basic functions of the admin [init-league, init-team, init-season, consumate-game]



Then there is the user of the application, who may be in a role of Commissioner or Player in the same session, context dependant.

###  So the basic actions of the user as a whole (spanning roles of Commissioner/Player) , would be :
_.this isn't really at the rpc level, it's an inside the client look at the client app architecture and what is needed from the idealised api which serves all needs in programming implementation.._
_.nevertheless there would be view data reqs on hte api even if a lot of it should be prepositioned and cached.._


- creating a new lLeague (a commissioner action by definition)
- joining a lLeague (a player action by definition)
- invitiing a player to a league (commiss)
- booting a palyer from a league (c)
- init line prospective uncommitted line (c)
- edit line prospective uncommitted line (c)
- commit line to lLeague (c)
- init prospective uncommitted bet on line (p)
- edit prospective uncommitted bet on line (p)
- commit bet on line (p)
- view-states ... requesting particular batches of data, maybe would be prefetched anyways, but
- view state myLeagues (c) (mine as in owning)
- view state myLeagues (p) (mine as in belonging to)
- view state lLeague (c) as an owning commis
- view state lLeague (p) as a participating player (players list) (lines list) (scorecards players X lines cartesian product spreadsheet)
- view state particular line



### how should the client views be programmed and organised ?

HTML CSS SVG
I guess the pattern in the boilerplate can be followed.
We could introduce some SVG stuff soon hopefully.


#### need to make an appraisal of progress over two weeks and estimate of prospects.
