// Landing page, hero, steps

function StepItem({ num, title, desc }) {
  return (
    <div className="ps-step">
      <div className="ps-step-num">{num}</div>
      <div className="ps-step-body">
        <strong>{title}</strong>
        <span>{desc}</span>
      </div>
    </div>
  );
}

function Landing({ onGetStarted, onSignIn }) {
  return (
    <div className="ps-landing">
      <div className="ps-landing-main">
        <div className="ps-landing-hero-eyebrow">
          <LogoMark size="md" />
          Prosocial Banking · Swing Left
        </div>
        <h1 className="ps-landing-headline">Amplify the voices that matter</h1>
        <p className="ps-landing-sub">
          Join your team in liking, commenting on and sharing content that we want more people to see.
        </p>
        <div style={{width:240, display:"flex", flexDirection:"column", gap:10}}>
          <button className="ps-btn ps-btn-primary ps-btn-block ps-btn-lg" onClick={onGetStarted}>
            Get Started
          </button>
          <button className="ps-btn ps-btn-ghost ps-btn-block" onClick={onSignIn}>
            I already have an account
          </button>
        </div>
      </div>
      <aside className="ps-landing-aside">
        <div className="ps-landing-aside-eyebrow">How it works</div>
        <StepItem num={1} title="Browse posts" desc="Curated content ready for your team to amplify" />
        <StepItem num={2} title="Get comment ideas" desc="AI suggestions to help you engage authentically" />
        <StepItem num={3} title="Mark what you did" desc="Track your impact and watch the team grow" />
      </aside>
    </div>
  );
}

Object.assign(window, { Landing, StepItem });
