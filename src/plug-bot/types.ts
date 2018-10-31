/**
 * Room snapshot
 */
export interface RoomSnapshot {
  audience: CommonUser[] | undefined;
  botId: string;
  dj: CommonUser | undefined;
  djLast: CommonUser | undefined;
  waitlist: CommonUser[] | undefined;
  media: Media | undefined;
  mediaLast: Media | undefined;
  roomId: string;
  spinId: string;
  users: object[];
  score: {
    upvotes: number;
    grabs: number;
    downvotes: number;
  };
}

export interface RoomPreferences {}

/**
 * Message published by server
 */
export interface ServerRequest {
  target: string;
  action: {
    type: string;
    content: string;
  };
}

/**
 * Chat payload emitted by server
 */
export interface ServerMessage {
  eventType: string;
  preferences: RoomPreferences;
  snapshot: RoomSnapshot;
  user?: SystemUser;
  vote?: number;
  media?: Media;
  chat?: {
    id: string;
    message: string;
  };
}

/**
 * Message form published out by client
 */
export interface ClientRequest {
  eventType: string;
  siteId: string;
  roomId: string;
  botId: string;
  content: any;
}

/**
 * Message form published out by client
 */
// export interface ClientVote {
//   user: ClientUser;
//   vote: number;
// }

export interface CommonUser {
  id: string;
  username: string;
  dateJoined: string;
  permission: string;
  avatarID: string;
  badge: string;
  level: string;
  language: string;
}

export interface SystemUser extends CommonUser {
  _id: string;
  siteId: string;
  aka: string[];
  linkage: string[];
}

export interface Media {
  id: string;
  title: string;
  aka: string[];
  author: string;
  duration: number;
  cid: string;
}

export interface SpinAction {
  type: string;
  user: CommonUser;
  content: string;
}

/**
 * Client room snapshot
 */
// export interface ClientRequest {
//   roomId: string;
//   media: object;
// }
