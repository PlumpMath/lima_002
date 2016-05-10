local function cc (aaa)
    redis.call('publish', 'log', 'REDISLOG:' ..aaa)
end

local str_payload = KEYS[1]
local ticket = cjson.decode(str_payload)

cc(str_payload)

-- maybe just add it to season queue
