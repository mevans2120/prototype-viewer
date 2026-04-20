// Leaderboard + Activity Ticker — session right rail

const RANK_BADGES = ["🥇", "🥈", "🥉"];

function initials(name) {
  return name.split(" ").map(p => p[0]).slice(0, 2).join("").toUpperCase();
}

function Leaderboard({ entries, currentUserId }) {
  return (
    <div className="ps-lb">
      <div className="ps-lb-head">
        <span className="ps-eyebrow">Leaderboard</span>
      </div>
      <div className="ps-lb-entries">
        {entries.map((e, i) => {
          const rank = i + 1;
          const isTop3 = rank <= 3;
          const isMe = e.userId === currentUserId;
          return (
            <div key={e.userId} className={`ps-lb-row ${isMe ? "me" : ""}`}>
              <div className="ps-lb-rank">
                {isTop3 ? RANK_BADGES[rank - 1] : <span className="numeric">{rank}</span>}
              </div>
              <div className="ps-lb-avatar">{initials(e.displayName)}</div>
              <div className="ps-lb-name">{isMe ? `${e.displayName} (you)` : e.displayName}</div>
              <div className="ps-lb-points">{e.points}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ActivityTicker({ events }) {
  return (
    <div className="ps-ticker">
      <div className="ps-eyebrow" style={{marginBottom:10, display:"flex", alignItems:"center", gap:8}}>
        <span style={{display:"inline-block", width:6, height:6, borderRadius:"50%", background:"var(--color-success)", boxShadow:"0 0 0 3px rgba(5,150,105,0.15)"}}/>
        Live Activity
      </div>
      {events.map((ev, i) => (
        <div className="ps-ticker-row" key={i}>
          <b>{ev.name}</b>
          <span>{ev.verb}</span>
          <span className="plus">+{ev.points}pt</span>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { Leaderboard, ActivityTicker });
