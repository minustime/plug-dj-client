const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const PreferenceSchema = new mongoose.Schema({
  id: { type: String, default: '', unique: false },
  siteId: { type: String, default: 'dubtrack' },
  linkage: { type: Array, default: [] },
  trigger: { type: String, default: '!' },
  locale: { type: String, default: 'en' },
  slackAdmin: {
    enabled: { type: Number, default: 0 },
    channel: { type: String, default: '#general' }
  },
  profile: {
    url: { type: String, default: '' },
    name: { type: String, default: '' },
    dob: { type: String, default: '' }
  },
  stats: {
    mostUsers: { type: Number, default: 0 },
    mostUsersDate: { type: String, default: '' }
  },
  slackTeam: {
    enabled: { type: Number, default: 0 },
    token: { type: String, default: '' },
    domain: { type: String, default: '' },
    channel: { type: String, default: '#general' }
  },
  behavior: {
    enabled: { type: Number, default: 1 },
    announceSong: { type: Number, default: 0 },
    spamDetection: { type: Number, default: 0 },
    allowTriggers: { type: Number, default: 0 },
    autoReinstate: { type: Number, default: 0 },
    allowRaffle: { type: Number, default: 0 },
    allowTrivia: { type: Number, default: 0 },
    allowTriviaRetry: { type: Number, default: 0 },
    allowSchedule: { type: Number, default: 0 },
    allowWlBlock: { type: Number, default: 0 },
    allowFlowtrain: { type: Number, default: 0 },
    allowCoupons: { type: Number, default: 0 },
    autoWoot: { type: Number, default: 0 },
    autoSkip: { type: Number, default: 0 },
    commandCooldown: { type: Number, default: 0 },
    lastfmScrobble: { type: Number, default: 0 },
    tweetSpins: { type: Number, default: 0 },
    skipBanned: { type: Number, default: 0 },
    skipOp: { type: Number, default: 0 }
  },
  lastfm: {
    key: { type: String, default: '' },
    secret: { type: String, default: '' },
    username: { type: String, default: '' },
    password: { type: String, default: '' },
    sessionKey: { type: String, default: '' }
  },
  twitter: {
    consumerKey: { type: String, default: '' },
    consumerSecret: { type: String, default: '' },
    accessTokenKey: { type: String, default: '' },
    accessTokenSecret: { type: String, default: '' }
  },
  triggerList: {
    enabled: { type: Number, default: 0 },
    secret: { type: String, default: '' },
    host: { type: String, default: '' },
    path: { type: String, default: '/' }
  },
  user: {
    owner: {
      type: Array,
      default: [
        '52c7130896fba51a7904dba6',
        '52c06589c3b97a6a0ce84240',
        '52802e303b79034de8c72a5e',
        '52c7274e877b924ca237d436',
        '52c5bbf13e083e7eb7d5d79e',
        '5600d6842d5038030094c623'
      ]
    },
    admin: {
      type: Array,
      default: [
        '52c7130896fba51a7904dba6',
        '52c06589c3b97a6a0ce84240',
        '52802e303b79034de8c72a5e',
        '52c7274e877b924ca237d436',
        '52c5bbf13e083e7eb7d5d79e',
        '5600d6842d5038030094c623'
      ]
    },
    blocked: [String],
    wlblocked: [String],
    muted: [String],
    priviledged: [String],
    dashboard: {
      admin: [String],
      blocked: [String]
    }
  },
  command: {
    public: {
      type: Array,
      default: ['bot', 'link', 'who', 'aka', 'plays', 'lastplay', 'firstplay', 'tags', 'similar']
    },
    priviledged: { type: Array, default: [] },
    console: { type: Array, default: [] },
    private: { type: Array, default: [] },
    mod: { type: Array, default: [] },
    admin: {
      type: Array,
      default: [
        'modcommands',
        'skipOp',
        'powercommands',
        'register',
        'atstaff',
        'atdjs',
        'banuser',
        'unbanuser',
        'banbomb',
        'mutebomb',
        'defusemutebomb',
        'trigger',
        'raffle',
        'rafflecancel',
        'block',
        'unbloc  k',
        'wlblock',
        'wlunblock',
        'wlblocked',
        'warn',
        'move',
        'front',
        'mute',
        'unmute',
        'muted',
        'powerup',
        'powerdown',
        'powerusers',
        'do',
        'dolist',
        'doremove',
        'genre',
        'announce',
        'rejoin',
        'trivia',
        'urban',
        'skip',
        'banskip',
        'blacklist',
        'whitelist',
        'retag',
        'refund',
        'flowtrain',
        'flowtraincancel',
        'noflow',
        'block',
        'unblock',
        'trigger',
        'unset',
        'smile',
        'set',
        'unset',
        'echo',
        'resetflowpoints',
        'flowpoint',
        'checkflowpoints',
        'flowleaders',
        'linkuser',
        'screenshot',
        'status',
        'banuser',
        'set',
        'woots',
        'grabs',
        'grabslink',
        'songlink',
        'leader',
        'eta',
        'tip',
        'balance',
        'refund',
        'buy',
        'use',
        'swap',
        'love',
        'leaders',
        'points',
        'trigger',
        'mut  ed',
        'mute',
        'unmute',
        'skip',
        'retag',
        'urban'
      ]
    },
    cooldownExempt: {
      type: Array,
      default: [
        'iam',
        'tip',
        'flowpoint',
        'mute',
        'unmute',
        'trigger',
        'block',
        'unblock',
        'register',
        'plays',
        'lastplay',
        'a',
        'join',
        'buy',
        'set',
        'do',
        'doremove',
        'unset',
        'echo',
        'answ  er',
        'entrar',
        'eta',
        'rejoin',
        'powerup',
        'powerdown',
        'afk',
        'swap',
        'accept',
        'flowpointx',
        'up',
        'love',
        'points',
        'leaders',
        'refundlove'
      ]
    }
  },
  keyword: {
    flow: { type: Array, default: [] },
    prop: { type: Array, default: [] }
  },
  coinPerks: [
    {
      upc: { type: String, default: '' },
      name: { type: String, default: '' },
      require: { type: String, default: '' },
      action: { type: String, default: '' },
      params: { type: String, default: '' },
      error: { type: String, default: '' },
      price: { type: Number, default: 0 }
    }
  ],
  pointSystem: {
    type: { type: String, default: 'point' },
    announceAward: { type: Number, default: 0 },
    announcePeriodLeader: { type: Number, default: 0 },
    multiAward: { type: Number, default: 0 },
    periodInterval: { type: String, default: '' },
    periodId: { type: Number, default: 1 },
    periodStartDate: { type: Date, default: Date.now },
    periodEndDate: { type: Date }
  },
  message: {
    botCheck: { type: String, default: 'hi!' },
    botOn: { type: String, default: "it's ON." },
    botOff: { type: String, default: 'Goodbye now.' },
    woots: { type: String, default: 'Songs with most woots in the last {timePeriod}' },
    grabs: { type: String, default: 'Most grabbed songs in the last {timePeriod}' },
    top: { type: String, default: 'Top songs in the last {timePeriod}' },
    flowmaster: {
      type: String,
      default:
        '@{username} is a FLOWMASTER! they flowed {eventCount} {timesPlural} in the last {timePeriod}, most recent flow {eventDate}: {previousSong} ~> {currentSong} ({score})'
    },
    flowmasterNone: { type: String, default: 'no flows recorded in the last {timePeriod}' },
    leader: {
      type: String,
      default:
        '@{username} is WINNING! with {eventCount} props and grabs in the last {timePeriod}, most recent #{propWord} track {lastPropDate}: {song} ({score})'
    },
    leaderNone: { type: String, default: 'no props recorded in the last {timePeriod}' },
    songlink: { type: String, default: "Here's this song in {link}" },
    userBlocked: { type: String, default: '{username} is blocked from using the bot' },
    userUnblocked: { type: String, default: '{username} is allowed to use the bot.' },
    aka: { type: String, default: '{username} also goes by: {usernames}' },
    akaNone: { type: String, default: '{username} is just {username}' },
    aka404: { type: String, default: "I don't know {username}" },
    whoNew: { type: String, default: '{username} is new to the room! welcome and/or ban them forever' },
    whoExistingDj: {
      type: String,
      default: '{username} last played in the room {lastSpinDate}. Last track: {lastTrack} ({score})'
    },
    whoNewDj: {
      type: String,
      default: "Today is {username}'s first day in the room! Last track: {lastTrack} ({score}), played {lastSpinDate}"
    },
    whoExisting: { type: String, default: '{username}, chilling in the room since {dateAdded}' },
    who404: { type: String, default: "hasn't been around here yet" },
    whoNone: { type: String, default: "I don't know {username}" },
    songAnnounceLast: { type: String, default: ':information_source: Last song stats: {score} {link}' },
    songAnnounceNext: {
      type: String,
      default:
        ':musical_note: {username} is playing {song} :musical_note: Stats: :repeat: {playCount} plays :arrow_forward: last play {lastPlayDate}'
    },
    songAnnounceNew: {
      type: String,
      default: ':musical_note: {username} is playing {song}, this track is new to the room!'
    },
    triggerExists: {
      type: String,
      default:
        '{username} already created the "{keyword}" trigger, please try again. Leave blank to remove it completely.'
    },
    triggerAdded: { type: String, default: 'Trigger for "{keyword}" created!' },
    triggerError: { type: String, default: "You're missing the content for the trigger. Please try again." },
    triggerCollision: { type: String, default: 'A command with the same name already exists. Pleas try again.' },
    playsAuthorTitle: {
      type: String,
      default:
        ':repeat: "{title}" by {author} has been played {playCount} :arrow_forward: most recent play {timePeriod} by @{username} ({score})'
    },
    playsAuthorTitle404: { type: String, default: '"{title}" by {author} hasn\'t been played here before.' },
    playsAuthor: {
      type: String,
      default:
        ':repeat: {author} has been played {playCount} :arrow_forward: most recent track: "{title}" ({score}), {timePeriod} by @{username}'
    },
    playsAuthor404: { type: String, default: "{author} hasn't been played here recently." },
    skipOverplay: {
      type: String,
      default: ':warning: @{username} we dig your pick but this song is currently overplayed, please try again'
    },
    skipOffGenre: {
      type: String,
      default: ":warning: @{username} your song doesn't fall within our list of accepted genres, please try again"
    },
    pointUser404: { type: String, default: "Sorry, can't find anyone by that name." },
    pointAward: { type: String, default: '@{username} received 1 point!' },
    pointAwardCollision: { type: String, default: '@{username} already received a point.' },
    pointAwardRepeat: { type: String, default: '@{giver} you already gave {username} a point!' },
    pointAwardBlock: { type: String, default: "sorry @{username} you can't award points to yourself!" },
    pointAwardRemoved: { type: String, default: '{taker} removed a flow point from {username}.' },
    pointTotalsAnnounce: { type: String, default: '@{username} received a total of {total} points during this song!' },
    pointTotals: { type: String, default: '@{username} has received {total} points in the last {timePeriod}' },
    pointResetAll: { type: String, default: 'All points have been reset!' },
    pointResetUser: { type: String, default: 'All points have been reset for @{username}' },
    pointLeaders: { type: String, default: 'Top DJs since {timePeriod}: {usernames}' },
    pointLeaders404: { type: String, default: 'There are no recorded leaders in the last {timePeriod}' },
    pointLeadersAlltime: { type: String, default: 'All time top DJs: {usernames}' },
    pointPeriodWinner: {
      type: String,
      default: 'This {timePeriod} flow winner is: {username} with {points}, congratulations! runner ups: {leaders}'
    },
    pointPeriodWinnerPresent: {
      type: String,
      default: 'This {timePeriod} flow winner is: {username} with {points}, congratulations! runner ups: {leaders}'
    },
    pointPeriodWinnerNotification: { type: String, default: ':loudspeaker: Hey @{username} you won last challenge!' },
    pointResetAllInterval: {
      type: String,
      default: 'All points have been reset! the winner will be announced {timePeriod}.'
    },
    pointPeriodLeaderAnnounce: {
      type: String,
      default: '@{username} received a total of {total} points during this song!'
    },
    pointWinner: {
      type: String,
      default: "@{username} is winning with {points}. Last week's winner is {lastusername} with {lastpoints}"
    },
    triviaExists: {
      type: String,
      default: "@{username} Looks like there's a game of trivia already in progress! please try again later."
    },
    triviaAlert: {
      type: String,
      default:
        ":mega: Trivia time @djs! Get ready to type :point_right: {trigger}a youranswer :point_left: Riddle me this if you're on the waitlist.."
    },
    triviaQuestion: { type: String, default: ":clock7: you've got {triviaTTL} seconds! QUESTION: {question}" },
    triviaWin: {
      type: String,
      default: ':trophy: We have a winner! the correct answer is: {answer}. Congratulations @{username}!'
    },
    trivia404: { type: String, default: '@{username} The trivia has ended, try again later!' },
    triviaEnd: {
      type: String,
      default:
        ':books: The trivia game is now over, look out for this question in the future. Thank you for participating!'
    },
    raffleExists: {
      type: String,
      default: "@{username} Looks like there's already a raffle in progress! please try again later."
    },
    raffleExpiring: {
      type: String,
      default: ':clock7: The raffle expires in 10 seconds, @djs hurry and :point_right: {trigger}join :point_left: now!'
    },
    raffleAlert: {
      type: String,
      default:
        ":loudspeaker: Starting a raffle! want to be moved closer to the dj booth? type :point_right: {trigger}join :point_left: and you might just get lucky! :clock7: you've got {raffleTTL} seconds!"
    },
    raffleEnd: { type: String, default: ':trophy: The raffle has ended! and our lucky winner is: @{username}!' },
    raffleCancel: { type: String, default: 'The raffle has been cancelled.' },
    raffle404: { type: String, default: '@{username} The raffle has ended, try again later!' },
    raffleLock: { type: String, default: '@{username} locked their spot at #1 :sunglasses:' },
    raffleJoin: { type: String, default: '@{username} has joined the raffle!' },
    raffleJoinError: { type: String, default: '@{username} unable to join, are you in the waitlist?' },
    swapSelf: { type: String, default: "I'm sorry, {requester}. I'm afraid I can't do that." },
    swap404: { type: String, default: 'Who do you want to swap with? try: {trigger}swap @user' },
    swap403: { type: String, default: '{requester}.. no swap for you!' },
    swapError: { type: String, default: 'Only users in the waitlist can swap places.' },
    swapInProgress: {
      type: String,
      default: "@{requester} there's a swap already in progress, try again in a few seconds"
    },
    swapInitiate: {
      type: String,
      default:
        ':arrows_counterclockwise: @{target} {arrow_direction} {requester} wants to swap places with you. You have :clock3: 30 seconds to accept, type :point_right: {trigger}swap'
    },
    coinAwardGrayToDj: {
      type: String,
      default:
        ':moneybag: {giver} just tipped :point_right: @{username} 1 ChillCoin™ for their {(dank, dirty, fabulous, badass, amazeballs, exemplary, brilliant, hot diggity damn, #winning, fantastic, spectacular, wonderful, sexy, fantabulous, terrific, orgasmic, marvelous, beautiful, #epic, gorgeus)} play! {username} now has {total} coin{s}.'
    },
    coinAwardGrayToGray: {
      type: String,
      default:
        ':moneybag: {giver} just tipped :point_right: @{username} 1 ChillCoin™! {username} now has {total} coin{s}.'
    },
    coinAwardGrayToStaff: {
      type: String,
      default:
        ':moneybag: {giver} just tipped :point_right: @{username} 1 ChillCoin™! {username} now has {total} coin{s}.'
    },
    coinAwardSelf: { type: String, default: '@{giver} is juggling their ChillCoins™' },
    coinAwardStaffToDj: {
      type: String,
      default:
        ':moneybag: {giver} just tipped :point_right: @{username} 1 ChillCoin™ for their {(dank, dirty, fabulous, badass, amazeballs, exemplary, brilliant, hot diggity damn, #winning, fantastic, spectacular, wonderful, sexy, fantabulous, terrific, orgasmic, marvelous, beautiful, #epic, gorgeus)} play! {username} now has {total} coin{s}.'
    },
    coinAwardStaffToGray: {
      type: String,
      default:
        ':moneybag: {giver} just tipped :point_right: @{username} 1 ChillCoin™! {username} now has {total} coin{s}.'
    },
    coinAwardStaffToStaff: {
      type: String,
      default:
        ':moneybag: {giver} just tipped :point_right: @{username} 1 ChillCoin™! {username} now has {total} coin{s}.'
    },
    coinBuyError: { type: String, default: '@{username} {error}' },
    coinBuyFormatError: {
      type: String,
      default: "You're missing the perk you want to buy, for example: {trigger}buy boost"
    },
    coinBuyLowBalance: { type: String, default: '@{username} you need {deficit} more ChillCoins™ to get {perk}!' },
    coinBuyPerk404: { type: String, default: "I don't know what that is @{username}" },
    coinBuyReceipt: { type: String, default: '@{username} applying {perk}!, you now have {total} ChillCoin{s}™' },
    coinUser404: { type: String, default: 'Sorry. User not found.' },
    coinWalletBalance: { type: String, default: '@{username} has {total} ChillCoin{s}™ to spend! {perks}' },
    coinWalletEmpty: {
      type: String,
      default:
        "@{giver} doesn't have any ChillCoins™ available {(yet.., :worried:, :neutral_face:, :blush:, :confused:, :disappointed:, :relaxed:, :expressionless:, :no_mouth:)}"
    },
    coupon404: { type: String, default: 'Sorry {username} that coupon does not exist.' },
    couponUseFormatError: {
      type: String,
      default: "You're missing the coupon you want to use, for example: {trigger}use boost"
    },
    couponUseError: {
      type: String,
      default: 'Sorry @{username}, you need to be in the waitlist in order to use {upc}.'
    },
    couponUseReceipt: { type: String, default: '@{username} applying {coupon}!' },
    tweetSpin: {
      type: String,
      default: '{username} is playing "{title}" by {author}. Come party with us in {roomName} {roomUrl}'
    },
    autoSkip: { type: String, default: '' },
    scrabbleIntro: {
      type: String,
      default:
        ':books: {(Nerds:, Alright!)} {(ready for a round of scrabble?, a game of scrabble?, let\'s play scrabble!, more scrabble?)} type "{acceptWord}" to kick it off!'
    },
    scrabbleWin: { type: String, default: ':trophy: The word was: "{answer}" - Congratulations @{username}!' },
    scrabbleAcceptWords: { type: Array, default: ['ok'] },
    scrabbleStart: {
      type: String,
      default: ":question: Here we go!  guess this word: {clue} :clock12: You've got 45 seconds!"
    },
    scrabbleEnded: { type: String, default: ':books: The scrabble game has now ended! The word was: "{answer}"' },
    eta: { type: String, default: '@{username} your estimated wait time is {waitTime}' },
    etaJump: {
      type: String,
      default:
        '@{username} if you jump off the decks and join the wait list now, your estimated wait time will be {waitTime}'
    },
    etaJoin: {
      type: String,
      default: '@{username} if you join the wait list now, your estimated wait time will be {waitTime}'
    }
  }
});

export const Preference = mongoose.model('Preference', PreferenceSchema);
