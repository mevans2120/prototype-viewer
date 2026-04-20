// Nav & shell pieces

function PointsPill({ points }) {
  return (
    <span className="ps-points">
      <BoltIcon size={12} />
      {points}{points === 1 ? " pt" : " pts"}
    </span>
  );
}

function GlobalNav({ user, points, onSignIn, onProfile, groupName }) {
  return (
    <nav className="ps-nav">
      <div className="ps-nav-inner">
        <div className="ps-brand">
          <LogoMark size="sm" />
          Prosocial Banking
          {groupName && <><span className="ps-brand-sub"> · {groupName}</span></>}
        </div>
        <div className="ps-nav-right">
          {user && <PointsPill points={points ?? 0} />}
          {user ? (
            <button className="ps-avatar" onClick={onProfile} aria-label="Profile">
              {user.initials}
            </button>
          ) : (
            <button className="ps-btn ps-btn-ghost" onClick={onSignIn}>Sign in</button>
          )}
        </div>
      </div>
    </nav>
  );
}

function BottomBar({ points, status, onJoin, onNextPost }) {
  return (
    <div className="ps-bottom">
      <div className="ps-bottom-inner">
        <div className="ps-bottom-count">
          <b>{points}</b>
          <span>points this session</span>
        </div>
        {status === "idle" && (
          <button className="ps-btn ps-btn-primary" onClick={onJoin}>Join Session</button>
        )}
        {status === "active" && (
          <button className="ps-btn ps-btn-outline" onClick={onNextPost}>Next post ↓</button>
        )}
        {status === "done" && (
          <span style={{font:"600 15px var(--font-display)", color:"var(--color-success)"}}>
            <CheckIcon size={18}/> Session complete — great work!
          </span>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { PointsPill, GlobalNav, BottomBar });
