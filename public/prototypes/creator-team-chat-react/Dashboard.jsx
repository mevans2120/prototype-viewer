// Dashboard — main content area (fake creator dashboard). This exists
// as realistic context so the chat entry can be shown in situ.

function Sparkline({ data, color = "#0d9488", down = false }) {
  const w = 140, h = 32;
  const max = Math.max(...data), min = Math.min(...data);
  const span = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / span) * (h - 4) - 2;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  const area = `0,${h} ${pts} ${w},${h}`;
  const c = down ? "#e8564d" : color;
  return (
    <svg className="spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <polygon points={area} fill={c} opacity="0.12" />
      <polyline points={pts} fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function KPI({ k }) {
  return (
    <div className="kpi">
      <div className="kpi-label">{k.label}</div>
      <div className="kpi-value">{k.value}</div>
      <div className={`kpi-trend ${k.dir === "down" ? "down" : ""}`}>
        {k.dir === "up" ? <IconUp /> : <IconDown />}
        {k.trend}
      </div>
      <Sparkline data={k.spark} down={k.dir === "down"} />
    </div>
  );
}

function PostRow({ p }) {
  return (
    <div className="post-row">
      <div className="post-thumb">
        <span className="plat">{p.platform}</span>
        ▶
      </div>
      <div>
        <div className="post-title">{p.title}</div>
        <div className="post-meta">
          <span><b>{p.views}</b> views</span>
          <span><b>{p.likes}</b> likes</span>
          <span>{p.age} ago</span>
        </div>
      </div>
      <span className={`post-change ${p.dir === "down" ? "down" : ""}`}>{p.change}</span>
    </div>
  );
}

function PulseItem({ item }) {
  const member = TEAM.members.find(x => x.id === item.who);
  return (
    <div className="pulse-item">
      <span className="pulse-avatar" style={{ background: member?.color || "#64748b" }}>
        {member?.initials || "?"}
      </span>
      <div className="pulse-body">
        <b>{member?.name || "Someone"}</b>{" "}
        <span dangerouslySetInnerHTML={{ __html: item.text }} />
        <div className="pulse-time">{item.time}</div>
      </div>
    </div>
  );
}

function LeaderRow({ item, rank }) {
  const member = item.who === "me"
    ? TEAM.members.find(x => x.isMe)
    : TEAM.members.find(x => x.id === item.who);
  const isMe = member?.isMe;
  const deltaNum = parseInt(item.delta, 10);
  const deltaDir = deltaNum > 0 ? "up" : deltaNum < 0 ? "down" : "flat";
  return (
    <div className={`leader-row ${isMe ? "is-me" : ""}`}>
      <span className={`leader-rank ${rank <= 3 ? "top" : ""}`}>{rank}</span>
      <span className="pulse-avatar" style={{ background: member?.color || "#64748b" }}>
        {member?.initials || "?"}
      </span>
      <div className="leader-body">
        <div className="leader-name">
          {isMe ? "Kai Nakamura" : (member?.name || "Someone")}
          {isMe && <span className="leader-me-tag">you</span>}
        </div>
        <div className="leader-meta">
          {item.posts} {item.posts === 1 ? "post" : "posts"} · {item.views} views
        </div>
      </div>
      <div className="leader-score-wrap">
        <div className="leader-score">{item.score.toLocaleString()}</div>
        <div className={`leader-delta ${deltaDir}`}>
          {deltaDir === "up" && <IconUp />}
          {deltaDir === "down" && <IconDown />}
          {deltaDir === "flat" ? "—" : item.delta}
        </div>
      </div>
    </div>
  );
}

function TeamPostCard({ p }) {
  const member = p.who === "coach"
    ? TEAM.coach
    : TEAM.members.find(x => x.id === p.who);
  return (
    <div className="team-post-card">
      <div className="team-post-thumb">
        <span className="plat">{p.platform}</span>
        <span className="team-post-play">▶</span>
      </div>
      <div className="team-post-body">
        <div className="team-post-author">
          <span className="pulse-avatar sm" style={{ background: member?.color || "#64748b" }}>
            {member?.initials || "?"}
          </span>
          <span className="team-post-name">{member?.name || "Someone"}</span>
          {p.who === "coach" && <span className="team-post-coach">coach</span>}
          <span className="team-post-age">· {p.age}</span>
        </div>
        <div className="team-post-title">{p.title}</div>
        <div className="team-post-meta">
          <span><b>{p.views}</b> views</span>
          <span><b>{p.likes}</b> likes</span>
          <span className={`team-post-change ${p.dir === "down" ? "down" : ""}`}>{p.change}</span>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ onOpenChat }) {
  return (
    <main className="main">
      <div className="content">
        <div className="page-header">
          <div>
            <h1 className="page-title">Morning, Kai <span className="accent">your latest post has 21,908 views</span></h1>
            <p className="page-sub">Week 4 of Cohort 04 · 3 posts published, 2 more on your goal.</p>
          </div>
        </div>

        <div className="two-col">
          <section className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Recent posts</div>
                <div className="card-sub">Performance change vs your 30d baseline</div>
              </div>
              <a className="card-link">View all →</a>
            </div>
            <div className="post-list">
              {POSTS.map((p, i) => <PostRow key={i} p={p} />)}
            </div>
          </section>

          <section className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Leaderboard</div>
                <div className="card-sub">Week 4 · Cohort 04</div>
              </div>
              <a className="card-link" onClick={onOpenChat} style={{cursor:"pointer"}}>View all →</a>
            </div>
            <div className="leader-list">
              {LEADERBOARD.map((it, i) => <LeaderRow key={i} item={it} rank={i + 1} />)}
            </div>
          </section>
        </div>

        <section className="card team-posts-card">
          <div className="card-header">
            <div>
              <div className="card-title">My team's posts</div>
              <div className="card-sub">Cohort 04 · latest shipped work</div>
            </div>
            <a className="card-link" onClick={onOpenChat} style={{cursor:"pointer"}}>Open team chat →</a>
          </div>
          <div className="team-posts-grid">
            {TEAM_POSTS.map((p, i) => <TeamPostCard key={i} p={p} />)}
          </div>
        </section>
      </div>
    </main>
  );
}

Object.assign(window, { Dashboard });
