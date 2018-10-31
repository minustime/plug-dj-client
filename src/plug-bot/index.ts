'use strict';

import plugConstants from './plug-constants';
import systemConstants from './constants';

const Redis = require('redis');
const _ = require('underscore');

// Interfaces
import { RoomSnapshot, ClientRequest, ServerRequest, CommonUser } from './types';

class PlugBot {
  private sub: any;
  private pub: any;
  private plugApiEvents;
  private roomEvents;
  private serverRequests;
  private roomId;
  private botId;

  constructor(private config: any, private logger: any, private plugApi: any) {
    // Register room events handlers
    this.roomEvents = new Map([
      [plugConstants.CHAT, this.handleChatEvent],
      [plugConstants.CHAT_COMMAND, this.handleChatCommandEvent],
      [plugConstants.FRIEND_JOIN, this.handleFriendJoin],
      [plugConstants.ADVANCE, this.handleAdvance],
      [plugConstants.GRAB_UPDATE, this.handleGrabUpdate],
      [plugConstants.USER_JOIN, this.handleUserJoin],
      [plugConstants.USER_LEAVE, this.handleUserLeave],
      [plugConstants.USER_SKIP, this.handleUserSkip],
      [plugConstants.VOTE_UPDATED, this.handleVoteUpdated],
      [plugConstants.WAIT_LIST_UPDATE, this.handleWaitlistUpdate]
    ]);

    // Register server event handlers
    this.serverRequests = new Map([
      [systemConstants.ROOM_UPDATE, this.handleRoomUpdateRequest],
      [systemConstants.CHAT, this.handleChatRequest]
    ]);

    this.sub = Redis.createClient(config.redis.port, config.redis.host);
    this.pub = Redis.createClient(config.redis.port, config.redis.host);

    this.init(config.plug.username, config.plug.password, config.plug.room);
  }

  private async init(username: string, password: string, roomId: string) {
    this.logger.log('info', 'Connecting to room: %s', roomId);

    // Connect to plug and the room
    try {
      await this.plugApi.connect({
        roomId,
        username,
        password
      });

      // Get room data
      try {
        this.botId = (await this.plugApi.getUser()).id;
        this.roomId = roomId;
        const roomSnapshot = await this.getRoomSnapshot();

        // Subscribe to room events
        try {
          for (let [event, handler] of this.roomEvents) {
            this.plugApi.on(event, data => handler.call(this, data));
          }

          // Subscribe to bot server events
          this.sub.subscribe(systemConstants.PUBSUB_SERVER_EVENT);
          this.sub.on('message', (channel, data) => this.handleServerEvent(channel, data));

          // Notify 'ready'
          this.sendToServer(systemConstants.BOT_JOIN, roomSnapshot);
          this.logger.log('info', 'Connected to room: %s', roomId);
        } catch (err) {
          this.logger.log('error', 'Error, could not subscribe to room events: %s', err);
        }
      } catch (err) {
        this.logger.log('error', 'Error, could not get room basics: %s', err);
      }
    } catch (err) {
      this.logger.log('error', 'Error setting up bot: %s', err);
    }
  }

  //------------------------
  // PLUG.DJ EVENT HANDLERS
  //------------------------

  /**
   * Handles a song transition
   * @param data
   */
  private async handleAdvance(data: any) {
    /* 
    {
      dj: {
        avatarID: 'diner-t02',
        badge: 'countryb01',
        gRole: 0,
        id: 23636117,
        joined: '2017-01-19 14:50:35.091189',
        level: 9,
        role: 0,
        silver: false,
        sub: 0,
        username: 'jolle-pur',
        rawun: 'jolle-pur',
        language: 'en',
        status: 1,
        vote: 0,
        grab: false,
        priority: 30,
        _position: {
          c: 98,
          r: 17
        },
        friend: false
      },
      media: {
        author: 'Bersarin Quartett',
        format: 1,
        image: '//i.ytimg.com/vi/NrVJwqBz9hI/default.jpg',
        cid: 'NrVJwqBz9hI',
        duration: 296,
        title: 'Der Mond, der Schnee und Du',
        id: 364939086
      },
      lastPlay: {
        dj: {
          avatarID: 'robot15',
          badge: 'admin-g',
          gRole: 5000,
          id: 3537523,
          joined: '2013-09-18 03:47:28.784000',
          level: 50,
          role: 0,
          silver: true,
          sub: 1,
          username: 'TerminallyChill',
          rawun: 'TerminallyChill',
          language: 'en',
          status: 1,
          vote: 0,
          grab: false,
          priority: 1,
          _position: {
            c: 103,
            r: 19
          },
          friend: false
        },
        media: {
          author: 'Soulstance',
          format: 1,
          image: '//i.ytimg.com/vi/t8O9k-OlqRQ/default.jpg',
          cid: 't8O9k-OlqRQ',
          duration: 319,
          title: 'Blue Grassland',
          id: 237845142
        },
        score: {
          positive: 10,
          negative: 0,
          grabs: 0
        }
      }
    };
    */
    const content: any = {
      dj: this.normalizeUser(data.dj),
      media: this.normalizeMedia(data.media)
    };
    this.sendToServer(systemConstants.SONG_TRANSITION, content);
  }

  /**
   * Handles user grabbing song
   * @param data
   */
  private async handleGrabUpdate(data: any) {
    /*
    {
      user: {
        avatarID: 'hiphop13',
        badge: 'ea-g',
        gRole: null,
        id: 3819076,
        joined: '2012-12-11 02:09:20.247000',
        level: 9,
        role: 0,
        silver: false,
        sub: 0,
        username: '110_GUI',
        rawun: '110_GUI',
        language: 'en',
        status: 1,
        vote: 1,
        grab: true,
        priority: 27,
        _position: {
          c: 106,
          r: 8
        },
        friend: false
      }
    }
    */
    const content: any = {
      user: this.normalizeUser(data.user)
    };
    this.sendToServer(systemConstants.SONG_CURATE, content);
  }

  /**
   * Handlers user join
   * @param data
   */
  private async handleUserJoin(data: any) {
    /*
    {
      username: 'Radio Shades',
      sub: 0,
      language: 'en',
      level: 1,
      avatarID: 'base07',
      joined: '2017-03-25 05:19:01.886885',
      id: 25708902,
      badge: null,
      role: 0,
      gRole: 0,
      slug: 'radio-shades',
      silver: false,
      guest: false,
      rawun: 'Radio Shades',
      status: 1,
      vote: 0,
      grab: false,
      priority: 0,
      _position: { c: 0, r: 0 },
      friend: false
    }
    */
    const content: any = {
      user: this.normalizeUser(data)
    };
    this.sendToServer(plugConstants.USER_JOIN, content);
  }

  /**
   * Handles user leaving
   * @param data
   */
  private async handleUserLeave(data: any) {
    /*
    {
      username: 'Theobaldo.',
      sub: 0,
      language: 'en',
      level: 6,
      avatarID: 'hiphop08',
      joined: '2014-06-20 06:55:24.231000',
      id: 4587128,
      badge: 'countryb01',
      role: 0,
      gRole: 0,
      slug: 'theobaldo',
      silver: false,
      guest: false,
      rawun: 'Theobaldo.',
      status: 1,
      vote: 0,
      grab: false,
      priority: 28,
      _position: {
        c: 140,
        r: 10
      },
      friend: false
    };
    */
    const content: any = {
      user: this.normalizeUser(data.user)
    };
    this.sendToServer(plugConstants.USER_LEAVE, content);
  }

  /**
   * Handles user vote
   * @param data
   */
  private async handleVoteUpdated(data: any) {
    /*
    {
      user: {
        avatarID: '2014hw14',
        badge: 'animal-o05',
        gRole: null,
        id: 3579209,
        joined: '2013-04-11 09:07:27.708000',
        level: 20,
        role: 0,
        silver: false,
        sub: 0,
        username: 'NOALA',
        rawun: 'NOALA',
        language: 'en',
        status: 1,
        vote: 1,
        grab: false,
        priority: 7,
        _position: { c: 135, r: 11 },
        friend: false
      },
      vote: 1
    }
    */
    const content: any = {
      user: this.normalizeUser(data.user),
      vote: data.vote
    };
    this.sendToServer(systemConstants.USER_VOTE, content);
  }

  private async handleWaitlistUpdate(data: any) {
    /*
    [
      {
        avatarID: 'classic07',
        badge: 'ss-g',
        gRole: null,
        id: 3929282,
        joined: '2014-03-16 07:41:53.439000',
        level: 21,
        role: 5000,
        silver: true,
        sub: 0,
        username: 'Molly',
        rawun: 'Molly',
        language: 'en',
        status: 1,
        vote: 1,
        grab: false,
        priority: 2,
        _position: { c: 86, r: 19 },
        friend: false
      },
      {
        avatarID: 'classic10',
        badge: 'og-g',
        gRole: null,
        id: 3557906,
        joined: '2013-07-12 04:19:34.072000',
        level: 19,
        role: 2000,
        silver: true,
        sub: 1,
        username: 'DjArum19  シ',
        rawun: 'DjArum19  シ',
        language: 'en',
        status: 1,
        vote: 0,
        grab: false,
        priority: 6,
        _position: { c: 57, r: 17 },
        friend: false
      }
    ]
    */
    const content: any = {
      waitlist: this.normalizeUsers(data)
    };
    this.sendToServer(systemConstants.WAITLIST_UPDATE, content);
  }

  /**
   * Handles chat event
   * @param data
   */
  private async handleChatEvent(data: any) {
    /*
    {
      cid: '5975194-1511059617481',
      message: 'lorem',
      sub: 1,
      uid: 5975194,
      un: 'ChilloutRoomba',
      type: 'emote',
      timestamp: '9:46pm'
    }
    */
    const user = await this.plugApi.getUser(data.uid);
    const content = {
      chatId: data.cid,
      user: this.normalizeUser(user),
      message: data.message
    };
    this.sendToServer(plugConstants.CHAT, content);
  }

  private async handleChatCommandEvent(data: any) {
    const user = await this.plugApi.getUser(data.uid);
    const content = {
      chatId: data.cid,
      user: this.normalizeUser(user),
      message: data.message
    };
    this.sendToServer(plugConstants.CHAT_COMMAND, content);
  }

  private async handleUserSkip(data: any) {
    this.logger.log('info', 'handleUserSkip called with: %s', JSON.stringify(data));
  }

  private async handleFriendJoin(data: any) {
    this.logger.log('info', 'HandleFriendJoin called with: %s', JSON.stringify(data));
  }

  //---------
  // HELPERS
  //---------

  /**
   * Standarizes the name of the user object parameters
   * @param {PlugUser} user - Plug.dj user object
   */
  private normalizeUser(user: any): CommonUser {
    if (!user) {
      return undefined;
    }
    try {
      return {
        id: String(user.id),
        username: user.username,
        dateJoined: user.joined,
        permission: user.role,
        avatarID: user.avatarID,
        badge: user.badge,
        level: user.level,
        language: user.language
      };
    } catch (err) {
      this.logger.log('error', 'Could not normalize user: %s', err);
    }
  }

  /**
   * Standarizes array of users
   * @param {PlugUser} users - Array of Plug.dj user objects
   */
  private normalizeUsers(users: any[]): CommonUser[] {
    return users.map(user => this.normalizeUser(user));
  }

  /**
   * Standarizes parameters of media object
   * @param {object} media - Plug.dj media object
   */
  private normalizeMedia(media: any) {
    if (!media) {
      return undefined;
    }
    try {
      return {
        id: media.id,
        cid: media.cid,
        author: media.author,
        title: media.title,
        duration: media.duration,
        format: media.format,
        image: media.image
      };
    } catch (err) {
      this.logger.log('error', 'Could not normalize media: %s', err);
    }
  }

  private async getRoomSnapshot() {
    return {
      dj: this.normalizeUser(await this.plugApi.getDJ()),
      waitlist: this.normalizeUsers(await this.plugApi.getWaitList()),
      audience: this.normalizeUsers(await this.plugApi.getAudience()),
      media: this.normalizeMedia(await this.plugApi.getMedia())
    };
  }

  //------------------------
  // HANDLE SERVER REQUESTS
  //------------------------

  /**
   * Sends a chat message to the room
   * @param {string} message
   */
  private handleChatRequest(message) {
    // this.plugApi.sendChat(message);
  }

  private async handleRoomUpdateRequest() {
    const roomSnapshot = await this.getRoomSnapshot();
    this.sendToServer(systemConstants.ROOM_UPDATE, roomSnapshot);
  }

  private handleServerEvent(channel: string, data: string) {
    this.logger.log('info', 'Data received from server: %s', data);
    const payload: ServerRequest = JSON.parse(data);
    const requestName = payload.action.type;
    if (payload.target === '' || payload.target === this.roomId) {
      if (this.serverRequests.has(requestName)) {
        this.serverRequests.get(requestName).call(this, payload.action.content);
      } else {
        this.logger.log('error', 'Error, could not find event handler for type: %s', requestName);
      }
    }
  }

  private sendToServer(eventType: string, content: any) {
    const message: ClientRequest = {
      eventType,
      siteId: systemConstants.PLUG,
      roomId: this.roomId,
      botId: this.botId,
      content: content
    };
    this.logger.log('info', 'Bot publishing message: %s', JSON.stringify(message));
    this.pub.publish(systemConstants.PUBSUB_CLIENT_EVENT, JSON.stringify(message));
  }
}

export default PlugBot;
