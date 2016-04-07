















### Lima\_002
_.project started march 23, 2016._
This project reflects a client assignment to develop a sports wagering application for sports enthusiast communities.  Like MarchMadness tourney pool kind a thing but maybe oriented more towards Euro Footbal stuff like English Premier whatever.  

The assignment stipulated stack requirements:
- NodeJS /Express server, scalable resilient architecture,  not to worry about deployment details initially just setup dev env and local hosting. 
- Angular2 compatibility but with initial Angular-1.5 implementation, Typescript.  I decided to do initial work in Angular-2 then backtrack trying to lay Ng2 patterns over Ng1.5 migration API-- otherwise suffer time loss having to re-implement Ng2 patterns after having already built an obsolete structure in pre-Ng1.5 vernacular.  

As I was new to TypeScript and Ng2, I decided to start off with a boilerplate project that had a number of development environment featuers already established.

I decided to use Redis for the data layer.  Immutable data structures would allow total time navigation of app state with complete precision. As much of the model logic as possible is to be implemented in the Lua script lodge of Redis.  

I decided on Mocha unit tests in suites for each of the API layers, the Redis layer and the RPC layer have their own suites.

I decided on Primus for initial WebSocket server abstraction layer.  

It's implemented into client and server.  



> codebase built around sourced:
[boilerplate](https://github.com/AngularClass/angular2-webpack-starter)

Boilerplate suffers Modifications oriented towards fullstack with addition of production server Express, Primus for Websockets, a Redis/Lua data layer.

Build system good, currently working on client Ng2 state management architecture. Presumably RxJS.  Need to manage the websockets API, the push API.  



SportsWagering app
