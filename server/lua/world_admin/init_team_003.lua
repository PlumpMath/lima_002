local function cc (aaa)
    redis.call('publish', 'log', 'REDIS LOG: ' ..aaa)
end

local str_payload = KEYS[1]
local ticket = cjson.decode(str_payload)

local basket = redis.call('LRANGE', ticket.leagueZ, 0, -1)

local basket2 = {}

for i,v in ipairs(basket) do
    local cursor = cjson.decode(v)
    if cursor.event_type == "init_team" then
        basket2[cursor.team_name] = 'TRUE'
    end
end

if basket2[parsed.team_name] ~= 'TRUE' then
    redis.call("LPUSH", ticket.teamZ, str_payload)
    redis.call("LPUSH", ticket.leagueZ, str_payload)
    ticket.result = 'okdone'
else
    ticket.result = 'error:name_already_taken'
end

return cjson.encode(ticket)
