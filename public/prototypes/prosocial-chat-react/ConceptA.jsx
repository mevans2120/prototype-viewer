// ============================================================
// CONCEPT A — "Classic": by-the-book docked chat + hero lobby
//   Dock: collapsed pill bottom-left with unread badge. Click to expand into a
//         360x480 floating panel (pinned message up top, scroll history, composer).
//   Lobby: centered hero with big countdown, roster row beneath, pre-game chat
//         panel to the right. Feels like the existing Landing page with a clock.
// ============================================================

// ----- Lobby styles (scoped classes prefixed cA-) -----
const ConceptAStyles = `
.cA-lobby { display: flex; flex-direction: column; align-items: center; max-width: 720px; margin: 0 auto; min-height: 720px; padding: 64px 32px 120px; justify-content: center; }
.cA-lobby-main { display: flex; flex-direction: column; align-items: center; text-align: center; }
.cA-eyebrow { display: inline-flex; align-items: center; gap: 10px; font: 700 12px var(--font-display); letter-spacing: 1.5px; text-transform: uppercase; color: var(--color-brand); padding: 6px 14px; background: rgba(10,40,82,0.06); border-radius: 999px; margin-bottom: 24px; }
.cA-headline { font: 700 56px/1.08 var(--font-display); color: var(--color-text-primary); margin: 0 0 14px; max-width: 640px; letter-spacing: -0.015em; }
.cA-sub { font: 400 17px/1.55 var(--font-sans); color: var(--color-text-muted); margin: 0 0 36px; max-width: 520px; }

.cA-countdown { display: flex; gap: 12px; margin-bottom: 32px; }
.cA-count-unit { display: flex; flex-direction: column; align-items: center; min-width: 96px; padding: 18px 10px; background: var(--color-surface-raised); border: 1px solid var(--color-border-default); border-radius: 12px; }
.cA-count-unit .num { font: 700 48px/1 var(--font-display); color: var(--color-text-primary); font-variant-numeric: tabular-nums; letter-spacing: -0.02em; }
.cA-count-unit .lbl { font: 600 11px var(--font-display); letter-spacing: 1px; text-transform: uppercase; color: var(--color-text-dim); margin-top: 8px; }

.cA-roster-block { display: flex; flex-direction: column; align-items: center; gap: 12px; margin-bottom: 32px; }
.cA-roster-block .hdr { font: 500 14px var(--font-sans); color: var(--color-text-tertiary); display: flex; align-items: center; gap: 10px; }

.cA-autorefresh {
  font: 400 14px/1.5 var(--font-sans);
  color: var(--color-text-tertiary);
  margin: 0;
  text-align: center;
}

/* Right-side session card (replaces old chat aside — chat now lives in the bottom bar) */
.cA-session-card { background: var(--color-surface-raised); border: 1px solid var(--color-border-default); border-radius: 16px; padding: 24px; box-shadow: var(--shadow-card, 0 1px 2px rgba(10,40,82,0.04)); }
.cA-session-card .host { display: flex; align-items: center; gap: 12px; padding-bottom: 18px; margin-bottom: 18px; border-bottom: 1px solid var(--color-border-default); }
.cA-session-card .host-av { width: 40px; height: 40px; border-radius: 50%; background: var(--color-brand); color: #fff; font: 700 14px var(--font-display); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.cA-session-card .host-meta { min-width: 0; }
.cA-session-card .host-name { font: 600 14px var(--font-display); color: var(--color-text-primary); }
.cA-session-card .host-role { font: 400 12px var(--font-sans); color: var(--color-text-tertiary); }
.cA-session-card h3 { font: 700 15px var(--font-display); color: var(--color-text-primary); margin: 0 0 12px; letter-spacing: -0.005em; }
.cA-plan-list { list-style: none; padding: 0; margin: 0 0 18px; display: flex; flex-direction: column; gap: 10px; }
.cA-plan-list li { display: flex; gap: 10px; align-items: flex-start; font: 400 13.5px/1.45 var(--font-sans); color: var(--color-text-secondary); }
.cA-plan-list li .ix { flex-shrink: 0; width: 22px; height: 22px; border-radius: 50%; background: var(--color-surface-subtle); color: var(--color-text-tertiary); font: 700 11px var(--font-display); display: flex; align-items: center; justify-content: center; margin-top: 1px; }
.cA-session-card .meta-row { display: flex; justify-content: space-between; align-items: center; padding-top: 14px; border-top: 1px solid var(--color-border-default); font: 500 12px var(--font-sans); color: var(--color-text-tertiary); }
.cA-session-card .meta-row b { font: 600 12px var(--font-display); color: var(--color-text-primary); }
`;

function ConceptALobby() {
  const [countdown, setCountdown] = React.useState({ m: 7, s: 23 });
  React.useEffect(() => {
    const t = setInterval(() => {
      setCountdown(c => {
        if (c.s > 0) return { m: c.m, s: c.s - 1 };
        if (c.m > 0) return { m: c.m - 1, s: 59 };
        return c;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const [messages, setMessages] = React.useState(SEED_LOBBY_MESSAGES);
  function send(text) {
    setMessages(m => [...m, { id: "u" + Date.now(), authorId: "me", author: "Kai N.", time: "now", text }]);
  }

  return (
    <>
      <style>{ConceptAStyles}</style>
      <div className="cA-lobby">
        <div className="cA-lobby-main">
          <div className="cA-eyebrow"><span className="live-dot"/> Session opens soon</div>
          <h1 className="cA-headline">Tuesday night</h1>
          <p className="cA-sub">
            Sara kicks us off in just a few minutes. Say hi in the team chat below, grab a seat, and get warmed up with the team.  
          </p>
          <div className="cA-countdown">
            <div className="cA-count-unit"><span className="num">{String(countdown.m).padStart(2,"0")}</span><span className="lbl">Min</span></div>
            <div className="cA-count-unit"><span className="num">{String(countdown.s).padStart(2,"0")}</span><span className="lbl">Sec</span></div>
          </div>
          <div className="cA-roster-block">
            <div className="hdr"><UsersIcon size={14}/> {SESSION_MEMBERS.length} teammates here now</div>
            <RosterRow members={SESSION_MEMBERS} max={7}/>
          </div>
          <p className="cA-autorefresh">When the session starts this page will automatically refresh</p>
        </div>
      </div>

      {/* Team chat lives in the bottom bar — same pattern as in-session */}
      <ConceptADock mode="lobby" messages={messages} setMessages={setMessages} onSend={send}/>
    </>
  );
}

// ----- Session BottomBar (activity ticker + chat segment + optional CTA) -----
//   Matches the real SessionBottomBar: center ticker that swaps between activity
//   events (e.g. "Jordan +5pts commented on a Twitter post") and the latest
//   chat message when one lands. Chat lives INSIDE the bar as a right-side
//   segment with unread badge. Click it (or the ticker when it's a chat line)
//   → panel rises up above the bar.
const ConceptADockStyles = `
/* ===== Fixed bottom bar ===== */
.cA-bar {
  position: fixed; bottom: 0; left: 0; right: 0;
  background: var(--color-surface-raised);
  border-top: 1px solid var(--color-border-default);
  z-index: 40;
  padding-bottom: env(safe-area-inset-bottom);
}
.cA-bar-inner {
  max-width: 1400px; margin: 0 auto;
  display: flex; align-items: center; gap: 16px;
  padding: 10px 24px;
  min-height: 52px;
}

/* left: team-chat segment (primary chat entry) */
.cA-chat-seg {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 7px 14px 7px 10px;
  background: var(--color-surface-subtle);
  border: 1px solid var(--color-border-default);
  border-radius: 999px;
  font: 600 13px var(--font-display);
  color: var(--color-text-primary);
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, padding 0.25s cubic-bezier(0.2,0.8,0.2,1);
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}
.cA-chat-seg-label {
  display: inline-flex; align-items: center; gap: 6px;
  max-width: 140px;
  opacity: 1;
  transition: max-width 0.28s cubic-bezier(0.2,0.8,0.2,1), opacity 0.18s ease-out, margin 0.28s cubic-bezier(0.2,0.8,0.2,1);
  white-space: nowrap;
}
.cA-chat-seg.is-open .cA-chat-seg-label {
  max-width: 0;
  opacity: 0;
  margin-left: -10px;         /* collapse the gap too */
}
.cA-chat-seg.is-open {
  padding: 7px 10px;
}
.cA-chat-seg:hover { background: var(--color-surface-raised); border-color: rgba(10,40,82,0.22); }
.cA-chat-seg.has-unread { border-color: var(--color-brand); background: rgba(10,40,82,0.05); }
.cA-chat-seg.is-open {
  background: var(--color-surface-raised);
  border-color: var(--color-brand);
}
.cA-chat-seg .ico {
  width: 24px; height: 24px; border-radius: 50%;
  background: var(--color-brand); color: #fff;
  display: flex; align-items: center; justify-content: center;
  position: relative;
}
.cA-chat-seg .count { color: var(--color-text-tertiary); font-weight: 500; margin-left: 2px; }
.cA-chat-seg .unread {
  position: absolute; top: -5px; right: -5px;
  min-width: 18px; height: 18px; border-radius: 9px;
  background: #FDE047; color: var(--color-brand);
  font: 700 10px var(--font-display);
  display: flex; align-items: center; justify-content: center;
  padding: 0 5px;
  border: 2px solid var(--color-surface-raised);
}

/* center: activity ticker */
.cA-ticker {
  flex: 1; min-width: 0;
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
  min-height: 28px;
  position: relative;
}
.cA-ticker-item {
  font: 400 14px var(--font-sans);
  color: var(--color-text-tertiary);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  max-width: 100%;
  display: inline-flex; align-items: center; gap: 8px;
  animation: cATickerIn 0.35s cubic-bezier(0.2,0.8,0.2,1);
}
.cA-ticker-item.is-chat {
  color: var(--color-text-primary);
  cursor: pointer;
}
.cA-ticker-item.is-chat:hover { text-decoration: underline; text-underline-offset: 3px; text-decoration-color: var(--color-border-default); }
.cA-ticker-item .pts {
  font: 700 13px var(--font-display);
  color: var(--color-brand);
  font-variant-numeric: tabular-nums;
}
.cA-ticker-item .author-av {
  width: 20px; height: 20px; border-radius: 50%;
  font: 700 9px var(--font-display);
  color: #fff;
  display: inline-flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.cA-ticker-item .author-name { font: 600 13px var(--font-display); color: var(--color-text-primary); }
.cA-ticker-item .chat-pill {
  display: inline-flex; align-items: center; gap: 3px;
  font: 600 10px var(--font-display);
  letter-spacing: 0.5px; text-transform: uppercase;
  color: var(--color-brand);
  padding: 2px 6px;
  background: rgba(10,40,82,0.06);
  border-radius: 4px;
  margin-right: 2px;
}
.cA-ticker-item .action-ico {
  flex-shrink: 0; color: var(--color-text-dim);
}
.cA-ticker-item.action-like .action-ico { color: #E11D48; }
.cA-ticker-item.action-comment .action-ico { color: var(--color-brand); }
.cA-ticker-item.action-share .action-ico { color: #059669; }
.cA-ticker-item.action-watch .action-ico { color: #7C3AED; }
@keyframes cATickerIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* right: optional external CTA link — matches real bar */
.cA-bar-cta {
  flex-shrink: 0;
  font: 500 13px var(--font-sans);
  color: var(--color-text-tertiary);
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 8px;
  border-radius: 6px;
  transition: color 0.15s;
}
.cA-bar-cta:hover { color: var(--color-brand); }

/* Bar composer — constrained to stay under the drawer (400px wide, flush-left) */
.cA-bar-composer {
  flex: 0 0 auto;
  min-width: 0;
  /* drawer right edge is 400px; chat pill ends ~68px; 16px gap → 316px for composer */
  width: 316px;
  display: flex; align-items: center;
  margin-right: auto;        /* push CTA to the right edge */
}
.cA-bar-composer .composer {
  width: 100%;
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
}

/* ===== Chat drawer (rises from the bottom-left, anchored above the bar) ===== */
.cA-drawer-backdrop {
  position: fixed; inset: 0;
  background: rgba(10, 40, 82, 0.18);
  z-index: 30;
  animation: cABackdropIn 0.2s ease-out;
}
@keyframes cABackdropIn { from { opacity: 0; } to { opacity: 1; } }

.cA-drawer {
  position: fixed;
  left: 0;                   /* flush with left viewport edge */
  bottom: 58px;              /* sits directly on top of the bar */
  top: 80px;                 /* below global nav with a bit of breathing room */
  width: 400px;
  max-width: calc(100vw - 16px);
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border-default);
  border-left: none;         /* flush with viewport */
  border-bottom: none;       /* bottom edge dissolves into the bar */
  border-radius: 0;          /* square corners */
  box-shadow: 0 -8px 32px rgba(10,40,82,0.10);
  z-index: 40;
  transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.22s ease-out;
  transform: translateY(12px);
  opacity: 0;
  pointer-events: none;
  display: flex;
  flex-direction: column;
}
/* Connector: white strip that erases the 1px border between drawer and button */
.cA-drawer::after {
  content: "";
  position: absolute;
  left: 24px;                /* matches bar padding */
  bottom: -1px;
  width: 40px;               /* matches icon-only pill width */
  height: 2px;
  background: var(--color-surface-raised);
  z-index: 2;
}
.cA-drawer.open {
  transform: translateY(0);
  opacity: 1;
  pointer-events: auto;
}

.cA-drawer-inner {
  padding: 18px 20px 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

.cA-drawer-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 14px;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--color-border-default);
  flex-shrink: 0;
}
.cA-drawer-head .title { display: flex; align-items: center; gap: 10px; }
.cA-drawer-head h4 { font: 700 15px var(--font-display); color: var(--color-text-primary); margin: 0; }
.cA-drawer-head .sub { font: 400 12px var(--font-sans); color: var(--color-text-tertiary); display: flex; align-items: center; gap: 6px; margin-top: 2px; }
.cA-drawer-head .close { color: var(--color-text-dim); padding: 6px; border-radius: 6px; }
.cA-drawer-head .close:hover { color: var(--color-text-primary); background: var(--color-surface-subtle); }

.cA-drawer-pinned {
  padding: 10px 12px;
  background: var(--color-gold-light);
  border-left: 3px solid var(--color-gold);
  border-radius: 0 6px 6px 0;
  margin-bottom: 10px;
  font: 400 13px/1.45 var(--font-sans);
  color: var(--color-text-secondary);
  flex-shrink: 0;
}
.cA-drawer-pinned b { font: 600 12px var(--font-display); color: var(--color-gold); display: flex; align-items: center; gap: 4px; margin-bottom: 3px; }

.cA-drawer-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 4px 2px 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-height: 0;
}

/* Vertical divider in the bar */
.cA-bar-divider {
  width: 1px; height: 24px;
  background: var(--color-border-default);
  flex-shrink: 0;
}

.cA-session-spacer { height: 64px; }
`;

// Seeded activity ticker data (matches ActivityFeed shape from the repo)
const CA_ACTIVITY_SEED = [
  { kind: "activity", id: "act1", author: "Jordan R.", authorId: "jordan", action: "comment", verb: "commented on", platform: "Twitter", pts: 5 },
  { kind: "activity", id: "act2", author: "Sara M.",   authorId: "sara",   action: "share",   verb: "amplified",     platform: "Instagram", pts: 10 },
  { kind: "organizer", id: "org1", author: "David L.", authorId: "david", text: "Heads up — 3 new posts just dropped. Focus on the Iowa one first.", pts: 0, tag: "Organizer" },
  { kind: "activity", id: "act3", author: "Maya P.",   authorId: "maya",   action: "like",    verb: "hearted",       platform: "Facebook", pts: 2 },
  { kind: "milestone", id: "mil1", author: "Alex T.",  authorId: "alex",  text: "went all-in on a Twitter post 🔥", pts: 17 },
  { kind: "activity", id: "act4", author: "You",       authorId: "me",     action: "comment", verb: "commented on", platform: "Twitter", pts: 5, isMe: true },
  { kind: "activity", id: "act5", author: "Ren S.",    authorId: "ren",    action: "watch",   verb: "watched",       platform: "YouTube", pts: 3 },
  { kind: "completion", id: "comp1", text: "3 of 5 posts amplified", pts: 0 },
  { kind: "activity", id: "act6", author: "Jordan R.", authorId: "jordan", action: "share",   verb: "boosted",       platform: "Facebook", pts: 10 },
];

// Lobby-flavored ticker: arrivals, organizer pings, countdown nudges — no points yet
const CA_LOBBY_SEED = [
  { kind: "arrival",   id: "arr1", author: "Jordan R.", authorId: "jordan", text: "joined the lobby" },
  { kind: "organizer", id: "org1", author: "Sara M.",   authorId: "sara",   text: "Hey team 👋 starting in a few — grab a drink and say hi." },
  { kind: "arrival",   id: "arr2", author: "Maya P.",   authorId: "maya",   text: "joined" },
  { kind: "status",    id: "sta1", text: "5 posts queued for tonight" },
  { kind: "arrival",   id: "arr3", author: "Alex T.",   authorId: "alex",   text: "joined" },
  { kind: "organizer", id: "org2", author: "Sara M.",   authorId: "sara",   text: "Focus tonight is Iowa — check the session guide if you haven't." },
  { kind: "arrival",   id: "arr4", author: "Ren S.",    authorId: "ren",    text: "joined" },
  { kind: "status",    id: "sta2", text: "Session opens in under 8 min" },
];

const ACTION_ICON_MAP = {
  like:    (s) => <HeartIcon size={s}/>,
  comment: (s) => <ChatBubbleIcon size={s}/>,
  share:   (s) => <ShareIcon size={s}/>,
  watch:   (s) => <PlayIcon size={s}/>,
};

function TickerItem({ item }) {
  const member = SESSION_MEMBERS.find(m => m.id === item.authorId);
  const color = member?.color || "var(--color-brand)";

  if (item.kind === "chat") {
    return (
      <div className="cA-ticker-item is-chat" onClick={item.onClick}>
        <span className="chat-pill"><ChatBubbleIcon size={9}/> Chat</span>
        <span className="author-av" style={{background: color}}>{initials(item.author)}</span>
        <span className="author-name">{item.author.split(" ")[0]}:</span>
        <span>{item.text}</span>
      </div>
    );
  }
  if (item.kind === "organizer") {
    return (
      <div className="cA-ticker-item">
        <PinIcon size={12}/>
        <span className="author-name">{item.author}</span>
        <span>· {item.text}</span>
      </div>
    );
  }
  if (item.kind === "milestone") {
    return (
      <div className="cA-ticker-item">
        <span className="pts">+{item.pts}pts</span>
        <span className="author-name">{item.isMe ? "You" : item.author}</span>
        <span>{item.text}</span>
      </div>
    );
  }
  if (item.kind === "completion") {
    return (
      <div className="cA-ticker-item">
        <span style={{color: "var(--color-success, #059669)"}}>✓</span>
        <span>{item.text}</span>
      </div>
    );
  }
  if (item.kind === "arrival") {
    return (
      <div className="cA-ticker-item">
        <span className="author-av" style={{background: color}}>{initials(item.author)}</span>
        <span className="author-name">{item.author.split(" ")[0]}</span>
        <span>{item.text}</span>
      </div>
    );
  }
  if (item.kind === "status") {
    return (
      <div className="cA-ticker-item">
        <span style={{color: "var(--color-text-dim)"}}>·</span>
        <span>{item.text}</span>
      </div>
    );
  }
  // activity
  const Icon = ACTION_ICON_MAP[item.action];
  return (
    <div className={`cA-ticker-item action-${item.action}`}>
      <span className="pts">+{item.pts}pts</span>
      <span className="author-name">{item.isMe ? "You" : item.author.split(" ")[0]}</span>
      <span>{item.verb} a {item.platform} post</span>
      {Icon && <span className="action-ico">{Icon(13)}</span>}
    </div>
  );
}

function ConceptADock({ mode = "session", messages: extMessages, setMessages: setExtMessages, onSend: extOnSend }) {
  const isLobby = mode === "lobby";
  const [open, setOpen] = React.useState(false);

  // Allow parent to own messages state (lobby reuses lobby state); fallback to internal.
  const [localMessages, setLocalMessages] = React.useState(SEED_SESSION_MESSAGES);
  const messages = extMessages ?? localMessages;
  const setMessages = setExtMessages ?? setLocalMessages;

  const [unread, setUnread] = React.useState(isLobby ? 0 : 3);

  const tickerSeed = isLobby ? CA_LOBBY_SEED : CA_ACTIVITY_SEED;

  // Ticker: rotates through activity items; when a NEW chat message arrives it
  // interrupts the feed and shows the chat line for one beat, then resumes.
  const [tickIdx, setTickIdx] = React.useState(0);
  const [chatInterrupt, setChatInterrupt] = React.useState(null);

  // Cycle activity every 4.5s (unless interrupted)
  React.useEffect(() => {
    if (chatInterrupt || open) return;
    const t = setInterval(() => {
      setTickIdx(i => (i + 1) % tickerSeed.length);
    }, 4500);
    return () => clearInterval(t);
  }, [chatInterrupt, open, tickerSeed.length]);

  // When a new message arrives and panel is closed, interrupt ticker for 5s
  const lastMsgIdRef = React.useRef(messages[messages.length - 1]?.id);
  React.useEffect(() => {
    const latest = messages[messages.length - 1];
    if (!latest) return;
    if (latest.id === lastMsgIdRef.current) return;
    lastMsgIdRef.current = latest.id;

    if (open) return; // when panel is open, don't interrupt the bar (user sees the msg directly)

    setChatInterrupt(latest);
    const t = setTimeout(() => setChatInterrupt(null), 5000);
    return () => clearTimeout(t);
  }, [messages, open]);

  const scrollRef = React.useRef();
  React.useEffect(() => {
    if (open) {
      setUnread(0);
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [open, messages.length]);

  function send(text) {
    if (extOnSend) { extOnSend(text); return; }
    setMessages(m => [...m, { id: "u" + Date.now(), authorId: "me", author: "Kai N.", time: "now", text }]);
  }

  const pinned = messages.find(m => m.pinned);
  const rest = messages.filter(m => !m.pinned);

  // Escape closes drawer
  React.useEffect(() => {
    if (!open) return;
    function onKey(e) { if (e.key === "Escape") setOpen(false); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // What the ticker shows right now
  const tickerContent = chatInterrupt
    ? { kind: "chat", id: chatInterrupt.id, author: chatInterrupt.author, authorId: chatInterrupt.authorId, text: chatInterrupt.text, onClick: () => setOpen(true) }
    : tickerSeed[tickIdx];

  return (
    <>
      <style>{ConceptADockStyles}</style>

      {/* Backdrop — tap anywhere to close */}
      {open && <div className="cA-drawer-backdrop" onClick={() => setOpen(false)} aria-hidden="true"/>}

      {/* Chat drawer — slides in from the right */}
      <div
        className={`cA-drawer ${open ? "open" : ""}`}
        role="dialog"
        aria-label="Team chat"
        aria-hidden={!open}
      >
        <div className="cA-drawer-inner">
          <div className="cA-drawer-head">
            <div className="title">
              <ChatBubbleIcon size={18}/>
              <div>
                <h4>Team chat</h4>
                <div className="sub"><span className="live-dot"/> {SESSION_MEMBERS.length} here · live</div>
              </div>
            </div>
            <button className="close" onClick={() => setOpen(false)} aria-label="Close"><CloseIcon size={16}/></button>
          </div>
          {pinned && (
            <div className="cA-drawer-pinned">
              <b><PinIcon size={10}/>Pinned · {pinned.author}</b>
              {pinned.text}
            </div>
          )}
          <div className="cA-drawer-scroll" ref={scrollRef}>
            {rest.map(m => <ChatMessage key={m.id} msg={m}/>)}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="cA-bar">
        <div className="cA-bar-inner">
          {/* Chat entry — left (shrinks to icon-only when drawer is open) */}
          <button
            className={`cA-chat-seg ${unread > 0 && !open ? "has-unread" : ""} ${open ? "is-open" : ""}`}
            onClick={() => setOpen(o => !o)}
            aria-label={open ? "Close team chat" : "Open team chat"}
          >
            <span className="ico">
              <ChatBubbleIcon size={12}/>
              {unread > 0 && !open && <span className="unread">{unread}</span>}
            </span>
            <span className="cA-chat-seg-label">
              Team chat
              <span className="count">· {messages.length}</span>
            </span>
          </button>

          {/* Divider — hidden when drawer is open */}
          {!open && <span className="cA-bar-divider" aria-hidden="true"/>}

          {/* Center: activity ticker when closed, composer when open */}
          {open ? (
            <div className="cA-bar-composer">
              <Composer onSend={send} compact hideEmoji placeholder={isLobby ? "Say hi to the team…" : "Message your team…"}/>
            </div>
          ) : (
            <div className="cA-ticker">
              <TickerItem key={tickerContent.id + (chatInterrupt ? "-chat" : "")} item={tickerContent}/>
            </div>
          )}

          {/* Right-side CTA */}
          <a className="cA-bar-cta" href="#" onClick={e => e.preventDefault()}>
            Learn more about Ground Truth
            <ArrowRightIcon size={12}/>
          </a>
        </div>
      </div>

      <div className="cA-session-spacer"/>
    </>
  );
}

Object.assign(window, { ConceptALobby, ConceptADock });
