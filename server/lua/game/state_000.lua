

local function cc (aaa)
    redis.call('publish', 'log', 'REDIS LOG: ' ..aaa)
end

local payload = KEYS[1]

local parsed = cjson.decode(payload)
local gameZ = parsed.gameZ
local basket = redis.call("LRANGE", gameZ, 0, -1)



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


local state = {}

for i,v in ripairs(basket) do
    local event = cjson.decode(v)
    if event.event_type == "CREATE_GAME" then
        state.home_teamZ = event.home_teamZ
        state.visitor_teamZ = event.visitor_teamZ
    end
    if event.event_type == "EDIT_GAME" then
        state.home_team_final_score = event.data.home_team_final_score
        state.visitor_team_final_score = event.data.visitor_team_final_score
        -- cc('aoeu ' ..state.visitor_team_final_score)
    end
end



return cjson.encode(state)
-- return 89
