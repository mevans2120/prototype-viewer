// ProSocial shared icons — all hand-rolled to match the codebase's Feather aesthetic
// (2px stroke, rounded caps/joins, 24x24 viewBox, currentColor).
function Icon({ children, size = 20, stroke = 2, fill = "none" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">{children}</svg>
  );
}

const HeartIcon = ({ size }) => <Icon size={size}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></Icon>;
const CommentIcon = ({ size }) => <Icon size={size}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></Icon>;
const ShareIcon = ({ size }) => <Icon size={size}><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></Icon>;
const WatchIcon = ({ size }) => <Icon size={size}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></Icon>;
const CheckIcon = ({ size = 20 }) => <Icon size={size} stroke={2.5}><polyline points="20 6 9 17 4 12"/></Icon>;
const BoltIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
);
const CloseIcon = ({ size = 10 }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M1 1l12 12M13 1L1 13"/>
  </svg>
);

// Logo mark — lightning bolt on navy rounded square (from src/app/icon.svg style)
function LogoMark({ size = "md" }) {
  return <span className={`ps-logomark ${size}`}><BoltIcon size={size === "sm" ? 14 : size === "lg" ? 20 : 16} /></span>;
}

// Platform badge — filled SVG glyphs quoted from each platform's brand
const TIKTOK_COLOR = "#1c1917";
const IG_GRAD_ID = "ig-grad";

function PlatformBadge({ platform }) {
  const p = (platform || "").toLowerCase();
  if (p === "tiktok") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill={TIKTOK_COLOR}>
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    );
  }
  if (p === "instagram") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <defs>
          <linearGradient id={IG_GRAD_ID} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F58529"/>
            <stop offset="50%" stopColor="#DD2A7B"/>
            <stop offset="100%" stopColor="#5E3D82"/>
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="20" height="20" rx="5" fill={`url(#${IG_GRAD_ID})`}/>
        <circle cx="12" cy="12" r="4" fill="none" stroke="white" strokeWidth="2"/>
        <circle cx="17.5" cy="6.5" r="1.2" fill="white"/>
      </svg>
    );
  }
  if (p === "youtube") {
    return (
      <svg width="22" height="20" viewBox="0 0 24 24" fill="#FF0000">
        <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.4 3.5 12 3.5 12 3.5s-7.4 0-9.4.6A3 3 0 00.5 6.2 31.2 31.2 0 000 12a31.2 31.2 0 00.5 5.8 3 3 0 002.1 2.1c2 .6 9.4.6 9.4.6s7.4 0 9.4-.6a3 3 0 002.1-2.1A31.2 31.2 0 0024 12a31.2 31.2 0 00-.5-5.8z"/>
        <path d="M9.5 15.5V8.5L15.5 12l-6 3.5z" fill="#fff"/>
      </svg>
    );
  }
  if (p === "x" || p === "twitter") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill={TIKTOK_COLOR}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    );
  }
  if (p === "facebook") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
        <path d="M24 12a12 12 0 10-13.9 11.9V15.5H7.1V12h3V9.4c0-3 1.8-4.6 4.5-4.6 1.3 0 2.7.2 2.7.2v2.9h-1.5c-1.5 0-2 .9-2 1.9V12h3.3l-.5 3.5h-2.8V24A12 12 0 0024 12z"/>
      </svg>
    );
  }
  return <div style={{width:20,height:20,borderRadius:4,background:"var(--color-surface-subtle)"}}/>;
}

const ACTION_ICONS = { like: HeartIcon, comment: CommentIcon, share: ShareIcon, watch: WatchIcon };

Object.assign(window, { Icon, HeartIcon, CommentIcon, ShareIcon, WatchIcon, CheckIcon, BoltIcon, CloseIcon, LogoMark, PlatformBadge, ACTION_ICONS });
