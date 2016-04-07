local function cc (aaa)
    redis.call('publish', 'log', 'REDIS LOG: ' ..aaa)
end



local leagueZ = KEYS[1]

local basket = redis.call('LRANGE', leagueZ, 0, -1)

local function ripairs(t)
    local max = 1
    while t[max] ~= nil do
        max = max + 1
    end
    local function ripairs_it(t, i)
        i = i-1
        local v = t[i]
        if v ~= nil then
            return i,v
        else
            return nil
        end
    end
    return ripairs_it, t, max
end

local games = {}

for i,v in ripairs(basket) do
    local obj = cjson.decode(v)
    cc('obj.event_type' ..obj.event_type)
    if obj.event_type == "CREATE_GAME" then
        cc('have an add')
        games[obj.gameZ] = {
            gameZ = obj.gameZ,
            home_teamZ = obj.home_teamZ,
            visitor_teamZ = obj.visitor_teamZ
        }
    end
    if obj.event_type == "EDIT_GAME" then
        cc('have an edit')
        games[obj.gameZ].data = obj.data
    end

end

return cjson.encode(games)

-- return 539393939
