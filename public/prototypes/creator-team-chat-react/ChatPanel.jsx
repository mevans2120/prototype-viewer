// ChatPanel — bottom-rising panel, width matches sidebar.
// Composer lives in the dock (Sidebar.jsx), not here.

function Avatar({ member, size = 26 }) {
  const bg = member?.color || "#64748b";
  return (
    <span className="msg-avatar" style={{ width: size, height: size, background: bg }}>
      {member?.initials || "?"}
    </span>
  );
}

function MessageBubble({ m }) {
  const member = TEAM.members.find(x => x.id === m.authorId);
  return (
    <div className="msg">
      <Avatar member={member} />
      <div className="msg-body">
        <div className="msg-head">
          <span className="msg-author">{m.author}</span>
          {m.role === "coach" && <span className="msg-role">Coach</span>}
          <span className="msg-time">{m.time}</span>
        </div>
        <div className="msg-text">{m.text}</div>
        {m.share && (
          <div className="msg-post-share">
            <div className="ps-thumb">{m.share.platform}</div>
            <div className="ps-meta">
              <div className="ps-title">{m.share.title}</div>
              <div className="ps-stats">{m.share.views} · {m.share.likes}</div>
            </div>
          </div>
        )}
        {m.reactions && m.reactions.length > 0 && (
          <div className="rx-row">
            {m.reactions.map((r, i) => (
              <span key={i} className={`rx-chip ${r.mine ? "mine" : ""}`}>
                <span>{r.emoji}</span><span className="n">{r.count}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ChatPanel({ open, onClose, messages, activeTab, setActiveTab }) {
  const bodyRef = React.useRef(null);

  React.useEffect(() => {
    if (open && bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [open, messages.length]);

  return (
    <>
      <div className={`chat-overlay ${open ? "open" : ""}`} onClick={onClose} />
      <aside
        className={`chat-panel ${open ? "open" : ""}`}
        role="dialog"
        aria-label="Team chat"
        aria-hidden={!open}
      >
        <header className="chat-header">
          <div>
            <div className="chat-header-title">
              <span className="dot" />
              {TEAM.name}
            </div>
            <div className="chat-header-meta">
              {TEAM.members.length} members · Rae B. coaching · 3 online
            </div>
          </div>
          <button className="chat-header-close" onClick={onClose} aria-label="Close chat">
            <IconClose size={12} />
          </button>
        </header>

        <div className="chat-tabs">
          {TABS.map(t => (
            <button
              key={t.id}
              className={`chat-tab ${activeTab === t.id ? "active" : ""}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
              {t.badge > 0 && <span className="tab-badge">{t.badge}</span>}
            </button>
          ))}
        </div>

        <div className="chat-body" ref={bodyRef}>
          {messages.map((m, i) => {
            if (m.kind === "day") return <div key={i} className="day-divider">{m.label}</div>;
            if (m.kind === "sys") return <div key={i} className="sys-pill">{m.text}</div>;
            if (m.kind === "typing") return (
              <div key={i} className="typing">
                <span className="dots"><span/><span/><span/></span>
                {m.who} is typing…
              </div>
            );
            return <MessageBubble key={m.id || i} m={m} />;
          })}
        </div>
      </aside>
    </>
  );
}

Object.assign(window, { ChatPanel });
