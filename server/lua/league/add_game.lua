


-- local function cc (aaa)
--     redis.call('publish', 'log', 'REDIS LOG: ' ..aaa)
-- end

local payload = KEYS[1]

local parsed = cjson.decode(payload)

local leagueZ = parsed.leagueZ
local home_teamZ = parsed.home_teamZ
local visitor_teamZ = parsed.visitor_teamZ
local gameZ = parsed.gameZ

-- cc('leagueZ ' ..leagueZ)
-- cc('visitor_teamZ ' ..visitor_teamZ)
-- cc('home_teamZ ' ..home_teamZ)

-- now reduce state to get team roster

local basket = redis.call("LRANGE", leagueZ, 0, -1)

local team_roster = {}
for i,event_str in ipairs(basket) do
    local event = cjson.decode(event_str)
    if event.event_type == "ADD_TEAM_TO_LEAGUE" then
        -- cc('adding team to roster  ' ..event.teamZ)
        team_roster[event.teamZ] = 'TRUE'
    end
end

-- for k,v in pairs(team_roster) do
--     cc('k ' ..k)
--     cc('v ' ..v)
-- end

if (team_roster[home_teamZ] == 'TRUE') and (team_roster[visitor_teamZ] == 'TRUE') then
    -- then we can make the game queue and add record to league queue
    redis.call("LPUSH", leagueZ, payload)
    redis.call("LPUSH", gameZ, payload)
    return 'okgood'
else
    return 'no'
end

return 23
