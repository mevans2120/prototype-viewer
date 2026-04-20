// Shared chat primitives used across all concepts.

function BoltIcon({ size = 14 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>;
}
function ChevronDown({ size = 14 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>; }
function ChevronUp({ size = 14 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>; }
function CloseIcon({ size = 14 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>; }
function SendIcon({ size = 16 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>; }
function ChatBubbleIcon({ size = 18 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>; }
function UsersIcon({ size = 16 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>; }
function PinIcon({ size = 14 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a1 1 0 00-1 1v1.27L7.9 8H5a1 1 0 00-.76 1.65L9 14.41V21a1 1 0 002 0v-6.59l4.76-4.76A1 1 0 0015 8h-2.9L13 4.27V3a1 1 0 00-1-1z"/></svg>; }
function HeartIcon({ size = 14 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>; }
function ShareIcon({ size = 14 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>; }
function PlayIcon({ size = 14 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>; }
function ArrowRightIcon({ size = 14 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>; }

function initials(name) { return name.split(" ").map(p => p[0]).slice(0, 2).join("").toUpperCase(); }

// ===== Seed data =====
const SESSION_MEMBERS = [
  { id: "sara", name: "Sara M.", color: "#D97706" },
  { id: "jordan", name: "Jordan R.", color: "#059669" },
  { id: "maya", name: "Maya P.", color: "#2563EB" },
  { id: "me", name: "Kai N.", isMe: true },
  { id: "david", name: "David L.", color: "#5E3D82" },
  { id: "alex", name: "Alex B.", color: "#0891B2" },
  { id: "ren", name: "Ren T.", color: "#BE185D" },
];

// ===== Atoms =====

function SystemPill({ children }) {
  return <div className="chat-msg system"><div className="system-pill">{children}</div></div>;
}

function ChatMessage({ msg, onReact }) {
  const me = msg.authorId === "me";
  const member = SESSION_MEMBERS.find(m => m.id === msg.authorId);
  const avatarBg = me ? null : (member?.color || "var(--color-surface-subtle)");
  const pinned = msg.pinned;
  return (
    <div className="chat-msg">
      <div className="avatar" style={avatarBg ? { background: avatarBg, color: "#fff" } : null}>
        {initials(msg.author)}
      </div>
      <div className="body">
        <div>
          <span className="author">{msg.author}{msg.role === "organizer" && <span style={{marginLeft:6, fontSize:10, padding:"2px 6px", borderRadius:4, background:"rgba(10,40,82,0.08)", color:"var(--color-brand)", fontWeight:700, letterSpacing:0.4, textTransform:"uppercase"}}>Organizer</span>}</span>
          <span className="time">{msg.time}</span>
        </div>
        {pinned && <div style={{display:"inline-flex", alignItems:"center", gap:4, marginTop:3, marginBottom:2, padding:"2px 8px", background:"var(--color-gold-light)", color:"var(--color-gold)", borderRadius:4, font:"600 11px var(--font-display)"}}><PinIcon size={10}/>Pinned</div>}
        <div className="text">{msg.text}</div>
        {msg.reactions && msg.reactions.length > 0 && (
          <Reactions reactions={msg.reactions} onReact={(emoji) => onReact && onReact(msg.id, emoji)}/>
        )}
      </div>
    </div>
  );
}

function Reactions({ reactions, onReact }) {
  return (
    <div className="rx-row">
      {reactions.map((r, i) => (
        <button key={i} className={`rx-chip ${r.mine ? "mine" : ""}`} onClick={() => onReact && onReact(r.emoji)}>
          <span className="emoji">{r.emoji}</span>
          <span className="n">{r.count}</span>
        </button>
      ))}
    </div>
  );
}

const QUICK_EMOJI = ["❤️", "🎉", "🔥", "👏", "💪", "🙌"];

function ReactionPicker({ onPick }) {
  return (
    <div className="rx-picker">
      {QUICK_EMOJI.map(e => <button key={e} onClick={() => onPick(e)}>{e}</button>)}
    </div>
  );
}

function Composer({ onSend, placeholder = "Message the team…", compact = false, hideEmoji = false }) {
  const [val, setVal] = React.useState("");
  const [showEmoji, setShowEmoji] = React.useState(false);
  function submit(e) {
    e.preventDefault();
    if (!val.trim()) return;
    onSend && onSend(val.trim());
    setVal("");
  }
  return (
    <form className="composer" onSubmit={submit} style={compact ? {padding:"8px 10px"} : null}>
      {!hideEmoji && (
        <div style={{position:"relative"}}>
          <button type="button" className="emoji-btn" onClick={() => setShowEmoji(s => !s)}>😊</button>
          {showEmoji && (
            <div style={{position:"absolute", bottom:40, left:0, zIndex:10}}>
              <ReactionPicker onPick={(e) => { setVal(v => v + e); setShowEmoji(false); }}/>
            </div>
          )}
        </div>
      )}
      <input value={val} onChange={e => setVal(e.target.value)} placeholder={placeholder}/>
      <button type="submit" className="send" disabled={!val.trim()}><SendIcon size={14}/></button>
    </form>
  );
}

function RosterRow({ members, max = 5, showStatus = true }) {
  const shown = members.slice(0, max);
  const more = Math.max(0, members.length - max);
  return (
    <div className="roster-row">
      {shown.map(m => (
        <div key={m.id} className={`av ${m.isMe ? "me" : ""}`}
             style={!m.isMe && m.color ? { background: m.color, color: "#fff" } : null}
             title={m.name}>
          {initials(m.name)}
          {showStatus && m.online !== false && <span className="dot"/>}
        </div>
      ))}
      {more > 0 && <div className="av more">+{more}</div>}
    </div>
  );
}

// ===== Mini nav + session shell reused across concepts =====

function MiniNav() {
  return (
    <nav className="ps-nav">
      <div className="ps-nav-inner">
        <div className="ps-brand">
          <span className="ps-logomark"><BoltIcon size={14}/></span>
          Social Banking
          <span className="ps-brand-sub"> · SwingLeft - Session One</span>
        </div>
        <div className="ps-nav-right">
          <span className="ps-points"><BoltIcon size={12}/>0 pts</span>
          <button className="ps-avatar">KN</button>
        </div>
      </div>
    </nav>
  );
}

function MiniSessionShell({ children }) {
  return (
    <div className="cx-session">
      <div className="cx-session-feed">
        <header className="cx-session-header">
          <h1 className="cx-session-title">Tuesday night session</h1>
          <div className="cx-session-meta">
            <span className="live-dot"/>
            Live now · 2 of 5 amplified · 7 teammates active
          </div>
        </header>
        <MiniTask creator="@iowaforall" text="Small business owner in Cedar Rapids breaks down the new healthcare rules — clear, personal, worth sharing."/>
        <MiniTask creator="@swingleft" text="Three minutes on why down-ballot races decide everything. Please boost — comments push it into more feeds."/>
        <MiniTask creator="Des Moines Register" text="Local reporter walks through early-vote data precinct by precinct. The map at 2:14 is the thing to see."/>
      </div>
      <aside className="cx-session-aside">
        <div className="cx-lb" style={{marginBottom:14}}>
          <div className="cx-lb-head"><span className="ps-eyebrow">Leaderboard</span></div>
          <div style={{padding:"6px 0"}}>
            {[
              {r:"🥇", n:"Sara M.", p:47, c:"#D97706"},
              {r:"🥈", n:"Jordan R.", p:38, c:"#059669"},
              {r:"🥉", n:"Kai N. (you)", p:32, me:true},
              {r:"4", n:"Maya P.", p:24, c:"#2563EB", numeric:true},
            ].map((e, i) => (
              <div className={`cx-lb-row ${e.me ? "me" : ""}`} key={i}>
                <div className="rank">{e.r}</div>
                <div className="av" style={!e.me && e.c ? {background: e.c, color:"#fff"} : null}>{initials(e.n.replace(" (you)",""))}</div>
                <div className="nm">{e.n}</div>
                <div className="pt">{e.p}</div>
              </div>
            ))}
          </div>
        </div>
        {children}
      </aside>
    </div>
  );
}

function MiniTask({ creator, text }) {
  return (
    <div className="cx-task">
      <div className="cx-task-head">
        <div style={{width:20, height:20, borderRadius:4, background:"var(--color-text-primary)"}}/>
        <span className="cx-task-creator">{creator}</span>
      </div>
      <p className="cx-task-preview">{text}</p>
      <div className="cx-task-thumb"/>
    </div>
  );
}

Object.assign(window, {
  BoltIcon, ChevronDown, ChevronUp, CloseIcon, SendIcon, ChatBubbleIcon, UsersIcon, PinIcon,
  HeartIcon, ShareIcon, PlayIcon, ArrowRightIcon,
  initials, SESSION_MEMBERS,
  SystemPill, ChatMessage, Reactions, ReactionPicker, QUICK_EMOJI, Composer, RosterRow,
  MiniNav, MiniSessionShell, MiniTask,
});
