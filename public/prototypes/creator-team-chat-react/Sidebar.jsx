// Sidebar — creator identity at top, nav middle, chat dock (composer) at bottom.

function ChatDock({ open, onToggle, onSend, unread, typing }) {
  const inputRef = React.useRef(null);
  const [draft, setDraft] = React.useState("");

  const openAnd = (fn) => () => {
    if (!open) onToggle();
    fn && fn();
  };

  const send = () => {
    const t = draft.trim();
    if (!t) return;
    onSend(t);
    setDraft("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    } else if (e.key === "Escape" && open) {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div className={`chat-dock ${open ? "open" : ""}`}>
      <div
        className="chat-dock-input-row"
        onClick={() => { if (!open) onToggle(); inputRef.current && inputRef.current.focus(); }}
      >
        <input
          ref={inputRef}
          className="chat-dock-input"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onFocus={() => { if (!open) onToggle(); }}
          onKeyDown={handleKey}
          placeholder={open ? "Message the team…" : "Message Cohort 04…"}
        />
        <button
          className="chat-dock-send"
          onClick={(e) => { e.stopPropagation(); send(); }}
          disabled={!draft.trim()}
          aria-label="Send"
        >
          <IconSend size={12} />
        </button>
      </div>
      <div className="chat-dock-hint">
        {open ? (
          <>
            <span>
              <kbd style={{fontSize:9, padding:"1px 4px", background:"rgba(15,23,42,0.06)", borderRadius:3, fontWeight:700, color:"var(--db-text-muted)"}}>Esc</kbd> to close
            </span>
            <span>{typing ? `${typing} is typing…` : "Visible to team"}</span>
          </>
        ) : unread > 0 ? (
          <>
            <span className="unread"><span className="unread-dot" />{unread} new from team</span>
            <span>Click to open</span>
          </>
        ) : (
          <>
            <span>Team chat</span>
            <span>{TEAM.members.length} members</span>
          </>
        )}
      </div>
    </div>
  );
}

function Sidebar({ activeNav, setActiveNav, chatOpen, onToggleChat, onSend, unread, typing }) {
  const topNav = [
    { id: "home",      icon: <IconHome />,  label: "Home" },
    { id: "analytics", icon: <IconChart />, label: "Analytics" },
    { id: "posts",     icon: <IconGrid />,  label: "Posts" },
    { id: "goals",     icon: <IconTarget />,label: "Goals" },
  ];
  const teamNav = [
    { id: "team-posts",  icon: <IconFlame />, label: "Team posts", badge: 4 },
    { id: "leaderboard", icon: <IconUsers />, label: "Leaderboard" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <span className="brand-mark"><IconBolt size={14} /></span>
        <span className="brand-name">Prosocial</span>
      </div>

      <div className="creator-card">
        <div className="creator-avatar">KN</div>
        <div className="creator-meta">
          <div className="creator-name">{CREATOR.name}</div>
          <div className="creator-handle">{CREATOR.handle} · {CREATOR.followers}</div>
        </div>
      </div>

      <div className="team-switcher" style={{display:"none"}}>
        <div>
          <div className="team-name">{TEAM.name}</div>
          <div className="team-role">{TEAM.role}</div>
        </div>
        <IconChevronDown size={14} />
      </div>

      <nav className="nav">
        <div className="nav-group-label">My growth</div>
        {topNav.map(n => (
          <button
            key={n.id}
            className={`nav-item ${activeNav === n.id ? "active" : ""}`}
            onClick={() => setActiveNav(n.id)}
          >
            {n.icon}
            <span>{n.label}</span>
          </button>
        ))}

        <div className="nav-group-label">Team</div>
        {teamNav.map(n => (
          <button
            key={n.id}
            className={`nav-item ${activeNav === n.id ? "active" : ""}`}
            onClick={() => setActiveNav(n.id)}
          >
            {n.icon}
            <span>{n.label}</span>
            {n.badge > 0 && <span className="nav-badge">{n.badge}</span>}
          </button>
        ))}

        <div className="nav-group-label">Settings</div>
        <button className="nav-item"><IconCog /><span>Account</span></button>
      </nav>

      <ChatDock
        open={chatOpen}
        onToggle={onToggleChat}
        onSend={onSend}
        unread={unread}
        typing={typing}
      />
    </aside>
  );
}

Object.assign(window, { Sidebar });
