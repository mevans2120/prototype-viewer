// Main app — orchestrates landing → auth → session → complete

const SEED_POSTS = [
  {
    id: "p1",
    platform: "tiktok",
    creator: "@iowaforall",
    preview: "Small business owner in Cedar Rapids breaks down exactly how the new healthcare rules hit her team. Clear, personal, worth sharing with anyone on the fence.",
    hashtags: ["iowa", "healthcare", "smallbiz"],
    likes: 12400, comments: 284, duration: 47, hasVideo: true,
    thumbColor: "linear-gradient(135deg, #7d93ab, #0a2852)",
  },
  {
    id: "p2",
    platform: "instagram",
    creator: "@swingleft",
    preview: "Three minutes that explain why down-ballot races decide everything. Please boost — the comments section is what pushes it into more feeds.",
    hashtags: ["swingleft", "voterguide", "downballot"],
    likes: 8200, comments: 412, duration: 184, hasVideo: true,
    thumbColor: "linear-gradient(135deg, #DD2A7B, #5E3D82)",
  },
  {
    id: "p3",
    platform: "youtube",
    creator: "Des Moines Register",
    preview: "Local reporter walks through the early-vote data precinct by precinct. Not flashy, but the map at 2:14 is the most important thing you'll see this week.",
    hashtags: ["desmoines", "earlyvote", "localnews"],
    likes: 3100, comments: 89, duration: 412, hasVideo: true,
    thumbColor: "linear-gradient(135deg, #FF0000, #7a0000)",
  },
  {
    id: "p4",
    platform: "x",
    creator: "@maya.pollworker",
    preview: "Thread: what actually happens at a polling place when someone is turned away for ID reasons. A first-person account from someone who was there yesterday.",
    hashtags: ["voterid", "iowa", "pollworker"],
    likes: 1800, comments: 127, hasVideo: false,
    thumbColor: "linear-gradient(135deg, #4a6080, #1c1917)",
  },
  {
    id: "p5",
    platform: "facebook",
    creator: "Cedar Valley Neighbors",
    preview: "Community meeting notes from last night — highlights the two ballot measures that nobody is talking about. Share with your neighbors.",
    hashtags: ["cedarvalley", "ballot", "community"],
    likes: 640, comments: 43, hasVideo: false,
    thumbColor: "linear-gradient(135deg, #1877F2, #0a2852)",
  },
];

const SEED_LEADERBOARD = [
  { userId: "u1", displayName: "Sara M.", points: 47 },
  { userId: "u2", displayName: "Jordan R.", points: 38 },
  { userId: "me", displayName: "Kai N.", points: 0 },
  { userId: "u4", displayName: "Maya P.", points: 24 },
  { userId: "u5", displayName: "David L.", points: 19 },
  { userId: "u6", displayName: "Alex B.", points: 12 },
  { userId: "u7", displayName: "Ren T.", points: 8 },
];

const SEED_TICKER = [
  { name: "Sara M.", verb: "commented on Cedar Rapids post", points: 2 },
  { name: "Jordan R.", verb: "shared Swing Left video", points: 3 },
  { name: "Maya P.", verb: "liked Des Moines Register clip", points: 1 },
  { name: "David L.", verb: "watched Iowa healthcare post", points: 1 },
];

function App() {
  const [view, setView] = React.useState("landing"); // landing | session
  const [authMode, setAuthMode] = React.useState(null); // null | signin | signup
  const [user, setUser] = React.useState(null);
  const [posts, setPosts] = React.useState(SEED_POSTS);
  const [points, setPoints] = React.useState(0);
  const [leaderboard, setLeaderboard] = React.useState(SEED_LEADERBOARD);

  function handleAuthSent(info) {
    const u = { initials: initials(info.name), name: info.name, email: info.email };
    setUser(u);
    setAuthMode(null);
    setView("session");
  }

  function updatePost(id, patch) {
    setPosts(ps => ps.map(p => p.id === id ? { ...p, ...patch } : p));
  }

  function engagePost(id) {
    updatePost(id, { state: "engaged", done: [] });
  }

  function toggleAction(id, type) {
    setPosts(ps => ps.map(p => {
      if (p.id !== id) return p;
      const done = new Set(p.done || []);
      const wasOn = done.has(type);
      if (wasOn) done.delete(type); else done.add(type);
      const required = ["like", "comment", "share", ...(p.hasVideo ? ["watch"] : [])];
      const isComplete = required.every(r => done.has(r));
      // Update points
      setPoints(pt => pt + (wasOn ? -1 : 1));
      // Update leaderboard for "me"
      setLeaderboard(lb => lb.map(e => e.userId === "me" ? { ...e, points: e.points + (wasOn ? -1 : 1) } : e)
        .sort((a, b) => b.points - a.points));
      return { ...p, done: [...done], state: isComplete ? "complete" : "engaged" };
    }));
  }

  function resetPost(id) {
    const p = posts.find(x => x.id === id);
    if (p?.done?.length) setPoints(pt => pt - p.done.length);
    updatePost(id, { state: "default", done: [] });
  }

  function dismissPost(id) {
    setPosts(ps => ps.filter(p => p.id !== id));
  }

  const sortedLb = [...leaderboard].sort((a, b) => b.points - a.points);
  const completedCount = posts.filter(p => p.state === "complete").length;
  const activePosts = posts.filter(p => p.state !== "complete");
  const sessionStatus = activePosts.length === 0 ? "done" : (view === "session" && user ? "active" : "idle");

  return (
    <>
      <GlobalNav
        user={user}
        points={points}
        groupName={user ? "Swing Left Iowa" : null}
        onSignIn={() => setAuthMode("signin")}
        onProfile={() => {}}
      />

      {view === "landing" && (
        <Landing
          onGetStarted={() => setAuthMode("signup")}
          onSignIn={() => setAuthMode("signin")}
        />
      )}

      {view === "session" && (
        <SessionView
          posts={posts}
          leaderboard={sortedLb}
          ticker={SEED_TICKER}
          completedCount={completedCount}
          totalPosts={SEED_POSTS.length}
          onEngage={engagePost}
          onAction={toggleAction}
          onReset={resetPost}
          onDismiss={dismissPost}
        />
      )}

      {view === "session" && (
        <BottomBar
          points={points}
          status={sessionStatus}
          onJoin={() => {}}
          onNextPost={() => {
            const next = document.querySelector(".ps-task:not(.complete)");
            if (next) next.scrollIntoView({ behavior: "smooth", block: "center" });
          }}
        />
      )}

      {authMode && (
        <AuthModal
          mode={authMode}
          onClose={() => setAuthMode(null)}
          onSent={handleAuthSent}
        />
      )}

      <div style={{height: view === "session" ? 100 : 0}}/>
    </>
  );
}

function SessionView({ posts, leaderboard, ticker, completedCount, totalPosts, onEngage, onAction, onReset, onDismiss }) {
  return (
    <div className="ps-session">
      <div className="ps-session-feed">
        <header className="ps-session-header">
          <h1 className="ps-session-title">Tuesday night session</h1>
          <div className="ps-session-meta">
            <span className="dot"/>
            Live now · {completedCount} of {totalPosts} amplified · 7 teammates active
          </div>
        </header>
        {posts.map(p => (
          <TaskCard key={p.id} post={p}
            onEngage={onEngage} onAction={onAction} onReset={onReset} onDismiss={onDismiss}/>
        ))}
        {posts.length === 0 && (
          <div className="ps-card" style={{padding:40, textAlign:"center"}}>
            <div style={{font:"700 18px var(--font-display)", color:"var(--color-text-primary)", marginBottom:6}}>
              All caught up 🎉
            </div>
            <div style={{fontSize:14, color:"var(--color-text-tertiary)"}}>
              You've amplified every post in this session. Great work!
            </div>
          </div>
        )}
      </div>
      <aside className="ps-session-aside">
        <Leaderboard entries={leaderboard} currentUserId="me"/>
        <ActivityTicker events={ticker}/>
      </aside>
    </div>
  );
}

Object.assign(window, { App, SessionView });
