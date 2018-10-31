const env = process.env;
console.log(env.DOCKERIZED)
console.log(env)
export default {
    "dockerized": env.DOCKERIZED || false,
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