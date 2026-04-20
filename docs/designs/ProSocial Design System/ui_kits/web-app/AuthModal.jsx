// Auth modal — two-step: email entry → "check your email"

function AuthModal({ mode, onClose, onSent }) {
  const [step, setStep] = React.useState("enter"); // enter | sent
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");

  const isSignUp = mode === "signup";

  function handleSubmit(e) {
    e.preventDefault();
    setStep("sent");
    setTimeout(() => onSent && onSent({ email, name: name || email.split("@")[0] }), 1600);
  }

  return (
    <div className="ps-modal-overlay" onClick={onClose}>
      <div className="ps-modal ps-modal-wrap" onClick={e => e.stopPropagation()}>
        <button className="ps-modal-close" onClick={onClose} aria-label="Close"><CloseIcon size={12}/></button>
        {step === "enter" ? (
          <>
            <h2 className="ps-modal-title">{isSignUp ? "Join the team" : "Welcome back"}</h2>
            <p className="ps-modal-sub">
              {isSignUp
                ? "Enter your email to get started. We'll send you a sign-in link."
                : "Enter your email to sign in. We'll send you a link."}
            </p>
            <form onSubmit={handleSubmit} style={{display:"flex", flexDirection:"column", gap:12}}>
              {isSignUp && (
                <div className="ps-field">
                  <label>Display name</label>
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Sara M." />
                </div>
              )}
              <div className="ps-field">
                <label>Email</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" autoFocus />
              </div>
              <button type="submit" className="ps-btn ps-btn-primary ps-btn-block ps-btn-lg" style={{marginTop:4}}>
                Send sign-in link
              </button>
            </form>
            <div className="ps-modal-footer">
              {isSignUp ? (
                <span style={{fontSize:14, color:"var(--color-text-tertiary)"}}>
                  Already have an account? <a href="#">Sign in</a>
                </span>
              ) : (
                <span style={{fontSize:14, color:"var(--color-text-tertiary)"}}>
                  New here? <a href="#">Join the team</a>
                </span>
              )}
            </div>
          </>
        ) : (
          <>
            <h2 className="ps-modal-title">Check your email</h2>
            <p className="ps-modal-sub">
              We sent a sign-in link to <b style={{color:"var(--color-text-primary)"}}>{email}</b>. Click it to continue.
            </p>
            <div style={{padding:"22px 18px", background:"var(--color-surface-tint)", borderRadius:10, display:"flex", alignItems:"center", gap:14}}>
              <div style={{width:40, height:40, borderRadius:8, background:"var(--color-brand)", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div style={{fontSize:13, color:"var(--color-text-tertiary)", lineHeight:1.5}}>
                <b style={{color:"var(--color-text-primary)", fontFamily:"var(--font-display)"}}>Demo mode</b><br/>
                Signing you in automatically…
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { AuthModal });
