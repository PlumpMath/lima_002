

local function cc (aaa)
    redis.call('publish', 'log', 'REDIS LOG: ' ..aaa)
end

local payload = KEYS[1]

-- cc('payload orig: ' ..payload)

local parsed = cjson.decode(payload)

local gameZ = parsed.gameZ

-- for k,v in pairs(parsed.data) do
--     cc('k  ' ..k)
--     cc('v ' ..v)
-- end
--
-- local basket = redis.call('LRANGE', gameZ, 0, -1)

-- for i,v in ipairs(basket) do
--     cc('basketv ' ..v)
-- end

redis.call("LPUSH", gameZ, payload)




return 77
