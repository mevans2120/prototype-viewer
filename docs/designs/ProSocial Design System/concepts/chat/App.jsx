// Main orchestrator — view toggle (lobby / session) + Tweaks panel.

class ErrorBoundary extends React.Component {
  constructor(p) { super(p); this.state = { err: null }; }
  static getDerivedStateFromError(err) { return { err }; }
  componentDidCatch(err, info) {
    console.error('ErrorBoundary caught:', err, info);
  }
  render() {
    if (this.state.err) {
      return (
        <div style={{padding:24, font:'13px ui-monospace,monospace', color:'#b00', background:'#fff', whiteSpace:'pre-wrap'}}>
          <b>React component error:</b>{"\n"}
          {String(this.state.err && this.state.err.message)}{"\n\n"}
          {String(this.state.err && this.state.err.stack).slice(0, 1000)}
        </div>
      );
    }
    return this.props.children;
  }
}

function ConceptViewer() {
  const [view, setView] = React.useState(() => localStorage.getItem("ps.chat.view") || "lobby");
  React.useEffect(() => { localStorage.setItem("ps.chat.view", view); }, [view]);

  // Tweaks edit mode
  const [editMode, setEditMode] = React.useState(false);
  React.useEffect(() => {
    function onMsg(e) {
      if (!e.data) return;
      if (e.data.type === "__activate_edit_mode") setEditMode(true);
      else if (e.data.type === "__deactivate_edit_mode") setEditMode(false);
    }
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  return (
    <>
      <div className="cx-switcher">
        <div className="cx-switcher-inner">
          <div style={{display:"flex", alignItems:"center", gap:16}}>
            <span className="cx-switcher-label">Chat — Classic dock</span>
            <span style={{font:"400 13px var(--font-sans)", color:"var(--color-text-tertiary)"}}>
              Drawer-style chat in the session bottom bar
            </span>
          </div>
          <div className="cx-view-toggle">
            <button className={view === "lobby" ? "active" : ""} onClick={() => setView("lobby")}>Lobby</button>
            <button className={view === "session" ? "active" : ""} onClick={() => setView("session")}>In session</button>
          </div>
        </div>
      </div>

      <MiniNav/>

      {view === "lobby" ? (
        <ConceptALobby/>
      ) : (
        <>
          <MiniSessionShell/>
          <ConceptADock/>
        </>
      )}

      {editMode && (
        <div className="tweaks-panel">
          <div className="tweaks-head"><b>Tweaks</b><button onClick={() => setEditMode(false)} style={{color:"var(--color-text-dim)"}}><CloseIcon size={14}/></button></div>
          <div className="tweaks-body">
            <div className="tweaks-row">
              <label>View</label>
              <div className="opts">
                <button className={view === "lobby" ? "on" : ""} onClick={() => setView("lobby")}>Lobby</button>
                <button className={view === "session" ? "on" : ""} onClick={() => setView("session")}>Session</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

try {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <ErrorBoundary><ConceptViewer/></ErrorBoundary>
  );
} catch (e) {
  document.getElementById("root").textContent = 'Render error: ' + e.message;
}
