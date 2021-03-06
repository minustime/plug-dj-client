// Common events expected by the bot server
export default Object.freeze({
  BOT_JOIN: 'BOT_JOIN',
  CHAT: 'CHAT',
  CHAT_COMMAND: 'CHAT_COMMAND',
  CLIENT_REQUEST: 'CLIENT_REQUEST',
  ERROR: 'ERROR',
  FRIEND_JOIN: 'FRIEND_JOIN',
  PLUG: 'plug',
  PUBSUB_CLIENT_EVENT: 'woots:client:event',
  PUBSUB_SERVER_EVENT: 'woots:server:event',
  ROOM_HISTORY_UPDATE: 'ROOM_HISTORY_UPDATE',
  ROOM_UPDATE: 'ROOM_UPDATE',
  ROOM_UPDATE_SCORE: 'ROOM_UPDATE_SCORE',
  SERVER_REQUEST: 'SERVER_REQUEST',
  SONG_ACCEPT: 'SONG_ACCEPT',
  SONG_CURATE: 'SONG_CURATE', // song grab/ungrab
  SONG_REJECT: 'SONG_REJECT',
  SONG_TRANSITION: 'SONG_TRANSITION',
  USER_JOIN: 'USER_JOIN',
  USER_LEAVE: 'USER_LEAVE',
  USER_SKIP: 'USER_SKIP',
  USER_VOTE: 'USER_VOTE',
  WAITLIST_UPDATE: 'WAITLIST_UPDATE',
});
