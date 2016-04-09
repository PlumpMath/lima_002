
local function cc (aaa)
    redis.call('publish', 'log', 'REDISLOG: ' ..aaa)
end

local payload = KEYS[1]
local parsed = cjson.decode(payload)

local basket = redis.call("LRANGE", "WORLD", 0, -1)

local basket2 = {}
for i,v in ipairs(basket) do
    local cursor = cjson.decode(v)
    if cursor.event_type == "init_league" then
        basket2[cursor.name] = 'true'
    end
end

if basket2[parsed.name] ~= 'true' then
    redis.call("LPUSH", parsed.leagueZ, payload)
    redis.call("LPUSH", "WORLD", payload)
    local ret = {
        result = 'okgood',
        event_type = 'event recorded: league_init',
        leagueZ = parsed.leagueZ,
        league_name = parsed.name
    }
    return cjson.encode(ret)
else
    return cjson.encode({result = "name taken alrleady"})
end

return 56
