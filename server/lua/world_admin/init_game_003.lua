local function cc (aaa)
    redis.call('publish', 'log', 'REDISLOG:' ..aaa)
end

local str_payload = KEYS[1]
local ticket = cjson.decode(str_payload)

cc(str_payload)

-- data structure conundrum : to how many nodes we add this event?
-- just league?  just season ?

for i,v in pairs(ticket) do
    cc('walla')
    cc(i)
    cc(v)
end

redis.call('LPUSH', ticket.leagueZ, str_payload)
redis.call('LPUSH', ticket.seasonZ, str_payload)
redis.call('LPUSH', ticket.home_teamZ, str_payload)
redis.call('LPUSH', ticket.visitor_teamZ, str_payload)

ticket.result = 'okdone'

return cjson.encode(ticket)
