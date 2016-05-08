-- test 000 :: grabs some atomic state.
local function cc (aaa)
    redis.call("publish", "log", "REDIS LOG: " ..aaa)
end
cc('hellohohoho')

local payload = KEYS[1]
cc(payload)

return "hthetehneth"
