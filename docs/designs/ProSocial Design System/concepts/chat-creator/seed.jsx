// Seed data for the creator team chat concept.

const CREATOR = {
  name: "Kai Nakamura",
  handle: "@kaimakes",
  followers: "184K",
};

const TEAM = {
  name: "Cohort 04 · Growth",
  role: "Coach-led",
  coach: { id: "coach", name: "Rae Bennett", initials: "RB", color: "#0d9488" },
  members: [
    { id: "me",     name: "Kai N.",    initials: "KN", color: "linear-gradient(135deg,#2dd4bf,#8b5cf6)", isMe: true },
    { id: "coach",  name: "Rae B.",    initials: "RB", color: "#0d9488", role: "coach" },
    { id: "sara",   name: "Sara M.",   initials: "SM", color: "#d97706" },
    { id: "jordan", name: "Jordan R.", initials: "JR", color: "#059669" },
    { id: "maya",   name: "Maya P.",   initials: "MP", color: "#2563eb" },
    { id: "david",  name: "David L.",  initials: "DL", color: "#7c3aed" },
    { id: "alex",   name: "Alex B.",   initials: "AB", color: "#0891b2" },
  ],
};

// KPIs for the dashboard
const KPIS = [
  { label: "Followers",    value: "184,210", trend: "+2.1K",  dir: "up",   spark: [18, 22, 20, 26, 30, 28, 34, 40, 38, 44] },
  { label: "Views / 7d",   value: "1.62M",   trend: "+14%",   dir: "up",   spark: [22, 18, 24, 30, 26, 34, 42, 38, 44, 52] },
  { label: "Engagement",   value: "7.4%",    trend: "-0.3pp", dir: "down", spark: [40, 44, 42, 38, 36, 38, 34, 32, 34, 30] },
  { label: "Team rank",    value: "#3 of 12",trend: "+2",     dir: "up",   spark: [10, 14, 18, 22, 20, 24, 30, 32, 36, 42] },
];

// Recent posts
const POSTS = [
  { platform: "TT", title: "5 editing shortcuts I wish I knew at 10K followers", views: "412K", likes: "38.2K", age: "2d",  change: "+28%", dir: "up"   },
  { platform: "IG", title: "Behind the scenes of the green-screen cloud reel",    views: "186K", likes: "14.9K", age: "4d",  change: "+9%",  dir: "up"   },
  { platform: "YT", title: "Why my hook rate dropped (and how I fixed it)",       views: "72K",  likes: "5.1K",  age: "6d",  change: "-12%", dir: "down" },
  { platform: "TT", title: "The 3-second rule that doubled my saves",             views: "1.1M", likes: "112K",  age: "11d", change: "+42%", dir: "up"   },
];

// Team posts — full-width grid below dashboard top row
const TEAM_POSTS = [
  { who: "sara",   platform: "TT", title: "The hook iteration that finally clicked",            views: "2.1M", likes: "214K", age: "1d", change: "+64%", dir: "up"   },
  { who: "jordan", platform: "IG", title: "Before/after of my milestone reel",                   views: "820K", likes: "68K",  age: "2d", change: "+31%", dir: "up"   },
  { who: "maya",   platform: "YT", title: "A/B testing thumbnails — what I learned",             views: "340K", likes: "22K",  age: "3d", change: "+12%", dir: "up"   },
  { who: "david",  platform: "TT", title: "Scripting a cold open in under 60 seconds",           views: "180K", likes: "9.4K", age: "4d", change: "-4%",  dir: "down" },
  { who: "alex",   platform: "IG", title: "Caption hooks that doubled my saves",                 views: "92K",  likes: "6.1K", age: "5d", change: "+8%",  dir: "up"   },
  { who: "coach",  platform: "YT", title: "Week 4 lesson: hook rate > watch time (for now)",     views: "48K",  likes: "4.2K", age: "6d", change: "+22%", dir: "up"   },
];

// Team pulse (right column on dashboard)
const PULSE = [
  { who: "sara",   text: "shared a new post for review — her TikTok hook iteration.", time: "12m ago" },
  { who: "coach",  text: "pinned <b>Week 4 goal</b>: ship 3 short-form posts with scripted hooks.", time: "1h ago" },
  { who: "jordan", text: "hit <b>100K followers</b> on Instagram. 🎉", time: "3h ago" },
  { who: "maya",   text: "asked for feedback on thumbnail A vs B.", time: "5h ago" },
];

// Leaderboard — weekly ranking of cohort members.
// posts = shipped this week, views = 7d views, score = simple weekly points
const LEADERBOARD = [
  { who: "sara",   posts: 4, views: "2.1M", score: 1420, delta: "+2" },
  { who: "jordan", posts: 3, views: "1.8M", score: 1180, delta: "+1" },
  { who: "me",     posts: 3, views: "1.62M", score: 1095, delta: "+4" },
  { who: "maya",   posts: 2, views: "640K",  score: 720,  delta: "-1" },
  { who: "david",  posts: 2, views: "310K",  score: 540,  delta: "0"  },
  { who: "alex",   posts: 1, views: "92K",   score: 310,  delta: "-3" },
];

// Chat messages — seeded to feel like an active coach-led creator team
const CHAT_MESSAGES = [
  { kind: "day", label: "Yesterday" },
  { kind: "msg", id: "m1", authorId: "coach", author: "Rae B.", role: "coach", time: "4:12p",
    text: "Heads up team — Friday's review call will focus on hook rates. Drop your two best hooks from the week before then." },
  { kind: "msg", id: "m2", authorId: "sara", author: "Sara M.", time: "4:44p",
    text: "On it. Also — my latest TikTok overperformed on saves. Curious if anyone's seen that pattern too?",
    reactions: [{ emoji: "👀", count: 3 }] },
  { kind: "msg", id: "m3", authorId: "maya", author: "Maya P.", time: "5:02p",
    text: "Saves spiking usually means the payoff felt valuable enough to come back to. Good sign." },

  { kind: "day", label: "Today" },
  { kind: "sys", text: "Jordan R. hit a milestone: 100K on Instagram 🎉" },
  { kind: "msg", id: "m4", authorId: "jordan", author: "Jordan R.", time: "9:18a",
    text: "Thanks y'all — this group kept me honest. Onto 250K 🫡",
    reactions: [{ emoji: "🎉", count: 5, mine: true }, { emoji: "🔥", count: 2 }] },
  { kind: "msg", id: "m5", authorId: "coach", author: "Rae B.", role: "coach", time: "10:02a",
    text: "Kai — saw your editing-shortcuts post ranked #1 in the team this week. Mind if I share it as the case study on Friday?",
    share: { platform: "TT", title: "5 editing shortcuts I wish I knew at 10K followers", views: "412K", likes: "38.2K" } },
  { kind: "msg", id: "m6", authorId: "me", author: "Kai N.", time: "10:09a",
    text: "Of course. Happy to walk through the hook iterations too — took me 7 tries to land that one." },
  { kind: "msg", id: "m7", authorId: "sara", author: "Sara M.", time: "10:14a",
    text: "Would love to hear that. 7 drafts feels like where I give up 😅",
    reactions: [{ emoji: "💯", count: 4 }] },
  { kind: "typing", who: "Maya P." },
];

const TABS = [
  { id: "team",  label: "Team",     badge: 3 },
  { id: "coach", label: "Coach 1:1", badge: 1 },
  { id: "dms",   label: "DMs",      badge: 0 },
];
