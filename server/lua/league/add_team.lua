
local function cc (aaa)
    redis.call('publish', 'log', 'REDIS LOG: ' ..aaa)
end
local payload = KEYS[1]
local parsed = cjson.decode(payload)

-- first we need to reduce league state to get list of current teams active

local basket = redis.call('LRANGE', parsed.leagueZ, 0, -1)

local basket2 = {}

for i,v in ipairs(basket) do
    local cursor = cjson.decode(v)
    if cursor.event_type == "ADD_TEAM_TO_LEAGUE" then
        basket2[cursor.team_name] = 'TRUE'
    end
end
-- cc(parsed.team_name)
if basket2[parsed.team_name] ~= 'TRUE' then
    -- cc('walla')
    redis.call("LPUSH", parsed.teamZ, payload)
    redis.call("LPUSH", parsed.leagueZ, payload)
    -- local res = cjson.encode({result = 'good', teamZ = teamZ})

    -- return cjson.encode({result = 'good', teamZ = teamZ})
    local ret = {
        result = "okgood",
        event_type = "okgood: added team to league",
        teamZ = parsed.teamZ,
        leagueZ = parsed.leagueZ,
    }
    return cjson.encode(ret)
    -- return 44
else
    -- local res = cjson.encode({result = 'bad', reason = 'name taken'})
    -- cc('gone no')
    return 'no'
end

return 33
