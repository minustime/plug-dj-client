# Plug.dj client

Plug.dj client, connects to room as a user and dispatches room events via Redis pub/sub.

## Requirements

- Node 10.x.x
- Docker

## Usage

1. Update `.env` with your plug.dj credentials and room you want the bot to join.

```
PLUG_USERNAME=
PLUG_PASSWORD=
PLUG_ROOM=
```

2. Build the docker image

```
$ make build
```

3. Run it

```
$ make up
```

## Development

1. Install dependencies

```
$ npm install
```

2. Watch for file changes

```
$ npm run watch
```

3. Start the project

```
$ npm run start
```
