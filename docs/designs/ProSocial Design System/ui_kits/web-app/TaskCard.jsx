// TaskCard — the core unit of the feed. Mirrors src/components/TaskCard.tsx
// States: default → engaged (clicked, showing actions) → complete (all done)

const TIER_BY_COUNT = [null, "info", "blue", "gold"]; // 1,2,3 actions → info/blue/gold

function formatCount(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

function TaskCard({ post, onEngage, onAction, onReset, onDismiss }) {
  const { id, platform, creator, preview, hashtags = [], likes, comments, duration, hasVideo, thumbColor } = post;
  const state = post.state || "default"; // default | engaged | complete
  const done = new Set(post.done || []);
  const actions = ["like", "comment", "share", ...(hasVideo ? ["watch"] : [])];
  const tier = TIER_BY_COUNT[done.size] || null;
  const isComplete = state === "complete";

  return (
    <div
      className={`ps-task ${state}`}
      onClick={() => state === "default" && onEngage(id)}
    >
      {state === "default" && (
        <button className="ps-task-dismiss" onClick={(e) => { e.stopPropagation(); onDismiss && onDismiss(id); }} aria-label="Dismiss">
          <CloseIcon size={10}/>
        </button>
      )}

      <div className="ps-task-head">
        <PlatformBadge platform={platform} />
        <span className="ps-task-creator">{creator}</span>
      </div>

      <div className="ps-task-stats">
        {likes != null && <span><b>{formatCount(likes)}</b> likes</span>}
        {comments != null && <span><b>{formatCount(comments)}</b> comments</span>}
        {duration != null && <span><b>{duration}</b> sec</span>}
      </div>

      <p className="ps-task-preview">{preview}</p>

      {hashtags.length > 0 && state !== "engaged" && !isComplete && (
        <div className="ps-task-tags">
          {hashtags.slice(0, 5).map(t => <span key={t} className="ps-tag">#{t}</span>)}
        </div>
      )}

      <div className="ps-task-thumb" style={thumbColor ? { background: thumbColor } : null}>
        {hasVideo && (
          <div className="play">
            <svg width="14" height="16" viewBox="0 0 12 14" fill="currentColor"><path d="M0 0l12 7-12 7z"/></svg>
          </div>
        )}
      </div>

      {state === "engaged" && (
        <>
          <p className="ps-actions-prompt">Mark what you did</p>
          <div className="ps-actions">
            {actions.map(type => {
              const isDone = done.has(type);
              const Icon = ACTION_ICONS[type];
              const label = { like: "Liked", comment: "Commented", share: "Shared", watch: "Watched" }[type];
              return (
                <button
                  key={type}
                  className={`ps-action-btn ${isDone ? `done ${tier}` : ""}`}
                  onClick={(e) => { e.stopPropagation(); onAction(id, type); }}
                >
                  <Icon size={14} />
                  I {label}
                </button>
              );
            })}
          </div>
          <button className="ps-reset" onClick={(e) => { e.stopPropagation(); onReset(id); }}>Didn't engage</button>
          <ActionIndicators actions={actions} done={done} tier={tier} />
        </>
      )}

      {isComplete && (
        <>
          <div className={`ps-complete-row ${tier || "gold"}`}>
            <CheckIcon size={20} />
            <span>All done! You amplified this post.</span>
          </div>
          <ActionIndicators actions={actions} done={done} tier={tier} />
        </>
      )}
    </div>
  );
}

function ActionIndicators({ actions, done, tier }) {
  return (
    <div className="ps-action-indicators" style={tier ? { color: `var(--color-${tier})` } : null}>
      {actions.map(type => {
        const Icon = ACTION_ICONS[type];
        return (
          <span key={type} className={`icon ${done.has(type) ? "on" : ""}`}>
            <Icon size={18}/>
          </span>
        );
      })}
    </div>
  );
}

Object.assign(window, { TaskCard, ActionIndicators });
