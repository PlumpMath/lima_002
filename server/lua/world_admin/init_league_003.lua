
local function cc (aaa)
    redis.call('publish', 'log', 'REDISLOG:' ..aaa)
end

local str_payload = KEYS[1]
local ticket = cjson.decode(str_payload)

local basket = redis.call('LRANGE', 'WORLD', 0, -1)

local basket2 = {}

for i,v in ipairs(basket) do
    local cursor = cjson.decode(v)
    if cursor.event_type == 'init_league' then
        basket2[cursor.leagueName] = 'TRUE'
    end
end

if basket2[ticket.leagueName] ~= 'true' then
    redis.call('LPUSH', 'WORLD', str_payload)
    redis.call('LPUSH', ticket.leagueZ, str_payload)
    ticket.result = 'okdone'
else
    event.result = 'error:name_already_taken'
end

return cjson.encode(ticket)
