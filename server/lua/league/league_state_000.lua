-- league_state_000 :: grabs some atomic state.
local function cc (aaa)
    redis.call("publish", "log", "REDIS LOG: " ..aaa)
end

local payload = KEYS[1]
cc(payload)
local parsed = cjson.decode(payload)
-- cc(parsed.leagueZ)
local basket = redis.call("LRANGE", parsed.leagueZ, 0, -1)
-- cc(#basket)

-- return basketh
return cjson.encode(basket)
-- return 289383
