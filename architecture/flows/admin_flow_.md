


### admins

Client has stated that eventually it will be optimal to automate entry of real-world data including seasons, games, teams, final scores etc; but that to start with this function will be addressed with a manual entry system.  We call this `admin`.

We need to elucidate exhaustively the methods needed, so go through workflow.

Subject to change, but to start with we have only one world.  

1. Put sports `leagues` into world.  Method `init_league`


2.  Put `team` into `league`.   Method `init_team`.

3.  Put `season` into `league`. Method `init_season`

4.  Associate `team` (already owned by league) with `season`.  This could be implicit automatic.

5. Put `game` into `season`.  Method `init_game`

6. Consumate `game`; that is, finalise scores etc.  Method `consumate_game`

_________________________


That's kind of it for the minimal level.  Everything should be editable, but this above is enough for prototyping.


#### Admin views and state view selectors:

1. world-view: view list of `league`s
2. `league` detail view: view list of `team`s, `season`s, `game`s
3. `season` detail view: view owning `league`, list of `game`s, scheduling detail
4. `team` detail view:
5. `game` detail view
