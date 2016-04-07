












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

