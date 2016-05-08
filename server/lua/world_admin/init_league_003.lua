
local function cc (aaa)
    redis.call('publish', 'log', 'REDISLOG:' ..aaa)
end
cc('hey')
local str_payload = KEYS[1]
local ticket = cjson.decode(str_payload)
local event = nil

local basket = redis.call('LRANGE', 'WORLD', 0, -1)

local basket2 = {}
local flag1 = ticket.event_type
for i,v in ipairs(basket) do
    local cursor = cjson.decode(v)
    if cursor.event_type == flag1 then
        basket2[cursor.leagueName] = 'true'
    end
end

if basket2[ticket.leagueName] ~= 'true' then
    event = {
        eventZ = ticket.eventZ,
        event_type = ticket.event_type,
        timestamp = ticket.time_stamp,
        leagueZ = ticket.leagueZ,
        leagueName = ticket.leagueName
    }
    local str_event = cjson.encode(event)

    redis.call('LPUSH', 'WORLD', str_event)
    redis.call('LPUSH', event.leagueZ, str_event)

    event.result = 'okdone'
else
    event.result = 'error:name_already_taken'
end

return cjson.encode(event)
