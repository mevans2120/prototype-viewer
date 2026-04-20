// Seed message data — same conversation, used by all concepts so you can compare treatments.

const SEED_LOBBY_MESSAGES = [
  { id: "l1", authorId: "sara", author: "Sara M.", role: "organizer", time: "just now", pinned: true,
    text: "Hey team 👋 Tonight we're focused on the Iowa healthcare video and the Des Moines Register precinct piece. Goal: 200 comments collectively. Let's go!",
    reactions: [{ emoji: "🔥", count: 6, mine: false }, { emoji: "💪", count: 4, mine: true }] },
  { id: "l2", authorId: "jordan", author: "Jordan R.", time: "2m",
    text: "Just got home — grabbing dinner and I'm in. Who's bringing the hot takes tonight?" },
  { id: "l3", authorId: "maya", author: "Maya P.", time: "1m",
    text: "Me! I've got a thread saved from last week about the small biz angle.",
    reactions: [{ emoji: "🙌", count: 3, mine: false }] },
  { id: "l4", authorId: "david", author: "David L.", time: "40s",
    text: "Reminder: keep it neighborly in the comments. We get more reach when it reads human." },
  { id: "l5", authorId: "alex", author: "Alex B.", time: "12s",
    text: "anyone want to pair on the YouTube one? the long comments always feel awkward solo" },
];

const SEED_SESSION_MESSAGES = [
  { id: "s1", authorId: "sara", author: "Sara M.", role: "organizer", time: "3m",
    text: "Session is live! Remember — quality over quantity on comments. One great one beats five \"👍\"s." },
  { id: "s2", authorId: "jordan", author: "Jordan R.", time: "2m",
    text: "Iowa post is🔥. Commented on my own experience with my team's health plan.",
    reactions: [{ emoji: "❤️", count: 5, mine: true }, { emoji: "🔥", count: 2, mine: false }] },
  { id: "s3", authorId: "maya", author: "Maya P.", time: "1m",
    text: "Sharing the Des Moines piece to my neighborhood group now." },
  { id: "s4", authorId: "david", author: "David L.", time: "40s",
    text: "Nice comment on the YouTube one, Kai — the map detail is exactly the kind of thing people stop scrolling for",
    reactions: [{ emoji: "🙌", count: 3, mine: true }] },
  { id: "s5", authorId: "sara", author: "Sara M.", role: "organizer", time: "20s",
    text: "We just passed 100 comments team 🎉 halfway to tonight's goal" },
];

// Ticker events — short "who did what" items
const SEED_TICKER_EVENTS = [
  { id: "t1", authorId: "sara", author: "Sara M.", verb: "commented on Cedar Rapids post", emoji: "💬" },
  { id: "t2", authorId: "jordan", author: "Jordan R.", verb: "shared Swing Left video", emoji: "📤" },
  { id: "t3", authorId: "maya", author: "Maya P.", verb: "reacted 🔥 to Sara's tip", emoji: "🔥" },
  { id: "t4", authorId: "david", author: "David L.", verb: "said 'nice comment!' to Kai", emoji: "👏" },
];

Object.assign(window, { SEED_LOBBY_MESSAGES, SEED_SESSION_MESSAGES, SEED_TICKER_EVENTS });
