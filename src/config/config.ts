const env = process.env;

export default {
    "plug": {
        "username": env.PLUG_USERNAME || "",
        "password": env.PLUG_PASSWORD || "",
        "room": env.PLUG_ROOM || ""
    },
    "redis": {
        "host": env.REDIS_HOST || "localhost",
        "port": env.REDIS_PORT || 6379
    }
}