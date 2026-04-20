// ChatRefined.jsx — Concept 1 refined with pin-sharing affordances baked in.
// Self-contained — does not depend on Chat.jsx

// Icons (feather-style)
const Icon = ({ size = 22, stroke = 2, fill = 'none', children, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
       strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={style}>
    {children}
  </svg>
);
const IconMap      = (p) => <Icon {...p}><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/></Icon>;
const IconHistory  = (p) => <Icon {...p}><rect x="3" y="5" width="18" height="4" rx="1"/><path d="M5 9v10h14V9"/><path d="M10 13h4"/></Icon>;
const IconChat     = (p) => <Icon {...p}><path d="M4 5h16v11H9l-5 4V5z"/></Icon>;
const IconPlus     = (p) => <Icon {...p} stroke={3}><path d="M12 5v14M5 12h14"/></Icon>;
const IconHome     = (p) => <Icon {...p}><path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1v-9z"/></Icon>;
const IconUser     = (p) => <Icon {...p}><circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6"/></Icon>;
const IconCamera   = (p) => <Icon {...p}><path d="M4 8h3l2-2h6l2 2h3a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z"/><circle cx="12" cy="13" r="3.5"/></Icon>;
const IconPin      = (p) => <Icon {...p}><path d="M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></Icon>;
const IconSmile    = (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M8 14c1 1.5 2.5 2 4 2s3-.5 4-2M9 10h.01M15 10h.01"/></Icon>;
const IconChevR    = (p) => <Icon {...p}><path d="M9 5l7 7-7 7"/></Icon>;
const IconBack     = (p) => <Icon {...p}><path d="M15 5l-7 7 7 7"/></Icon>;
const IconEdit     = (p) => <Icon {...p}><path d="M4 20h4l11-11-4-4L4 16v4z"/></Icon>;
const IconSearch   = (p) => <Icon {...p}><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4-4"/></Icon>;
const IconBadge    = ({n}) => (
  <span style={{
    position: 'absolute', top: -4, right: -4,
    minWidth: 18, height: 18, padding: '0 5px', borderRadius: 9,
    background: '#EF3B2B', color: '#fff', fontSize: 11, fontWeight: 700,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 0 0 2px #F2F3F7',
  }}>{n}</span>
);
window.IconMap=IconMap; window.IconHistory=IconHistory; window.IconChat=IconChat;
window.IconPlus=IconPlus; window.IconHome=IconHome; window.IconUser=IconUser;
window.IconCamera=IconCamera; window.IconPin=IconPin; window.IconSmile=IconSmile;
window.IconChevR=IconChevR; window.IconBack=IconBack; window.IconEdit=IconEdit;
window.IconSearch=IconSearch; window.IconBadge=IconBadge;

// Aliases:
const _P_BLUE = '#1F3FD9';
const _P_BLUE_LIGHT = '#E8ECFB';
const _P_BLUE_DARK = '#162EA3';
const _INK = '#111827';
const _INK_2 = '#374151';
const _INK_3 = '#6B7280';
const _INK_4 = '#9CA3AF';
const _LINE = '#E5E7EB';
const _CHROME = '#F2F3F7';
const _MAP_BG = '#EAEEF5';
const _AMBER = '#F59E0B';
const _GREEN = '#22C55E';
const _RED = '#EF3B2B';

// ─────────────────────────────────────────────────────────────
// Refined tab bar — 3 tabs, Chat in middle, with pill indicator
// ─────────────────────────────────────────────────────────────
function RTabs({ active, chatBadge = 3 }) {
  const items = [
    { key: 'map',     label: 'Map',     icon: window.IconMap },
    { key: 'chat',    label: 'Chat',    icon: window.IconChat, badge: chatBadge },
    { key: 'history', label: 'History', icon: window.IconHistory },
  ];
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 20,
      background: _CHROME, borderTop: `0.5px solid ${_LINE}`,
      paddingTop: 8, paddingBottom: 24,
      display: 'flex', justifyContent: 'space-around',
    }}>
      {items.map(t => {
        const isActive = t.key === active;
        const I = t.icon;
        return (
          <div key={t.key} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            color: isActive ? _P_BLUE : _INK_3, position: 'relative', minWidth: 60,
          }}>
            <div style={{ position: 'relative' }}>
              <I size={24} stroke={isActive ? 2.4 : 2} />
              {t.badge && <window.IconBadge n={t.badge} />}
            </div>
            <div style={{ fontSize: 10, fontWeight: isActive ? 700 : 500, letterSpacing: 0.1 }}>
              {t.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Status bar (duplicate of the one inside PhoneFrame — for headers that sit beside it)
function RStatusBar({ dark = false }) {
  const c = dark ? '#fff' : _INK;
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 54, zIndex: 45,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '18px 26px 0', color: c,
    }}>
      <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: -0.2 }}>9:52</div>
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <svg width="17" height="10" viewBox="0 0 17 10"><rect x="0" y="6" width="3" height="4" rx="0.5" fill="currentColor"/><rect x="4.5" y="4" width="3" height="6" rx="0.5" fill="currentColor"/><rect x="9" y="2" width="3" height="8" rx="0.5" fill="currentColor"/><rect x="13.5" y="0" width="3" height="10" rx="0.5" fill="currentColor"/></svg>
        <svg width="14" height="10" viewBox="0 0 14 10"><path d="M7 2.5c2 0 3.7.8 5 2l1-1a8 8 0 00-12 0l1 1c1.3-1.2 3-2 5-2z" fill="currentColor"/><path d="M7 6a3 3 0 012 .8l1-1a4.5 4.5 0 00-6 0l1 1A3 3 0 017 6z" fill="currentColor"/><circle cx="7" cy="8.8" r="1.2" fill="currentColor"/></svg>
        <svg width="22" height="10" viewBox="0 0 22 10"><rect x="0.5" y="0.5" width="19" height="9" rx="2" stroke="currentColor" fill="none" opacity="0.35"/><rect x="2" y="2" width="13" height="6" rx="1" fill="currentColor"/></svg>
      </div>
    </div>
  );
}

// Enhanced map backdrop — same buildings, but we surface different pin markers
function RMap({ pins = [], hotBuildings = {}, dim = false }) {
  // Building layout copied from Chat.jsx MapBackdrop so pins land correctly
  const rects = [
    { id: '5315', x: 30,  y: 80,  w: 60,  h: 70 },
    { id: '5325', x: 95,  y: 90,  w: 38,  h: 55 },
    { id: '5329', x: 140, y: 88,  w: 40,  h: 58 },
    { id: '5335', x: 195, y: 95,  w: 38,  h: 55 },
    { id: '5345', x: 245, y: 90,  w: 50,  h: 60 },
    { id: '7261', x: 305, y: 82,  w: 55,  h: 68 },
    { id: '7231', x: 170, y: 10,  w: 55,  h: 55 },
    { id: '5316', x: 40,  y: 225, w: 55,  h: 60 },
    { id: '5326', x: 115, y: 228, w: 55,  h: 55 },
    { id: '5344', x: 180, y: 225, w: 60,  h: 62 },
    { id: '5356', x: 250, y: 232, w: 45,  h: 50 },
    { id: '5321', x: 55,  y: 310, w: 45,  h: 55 },
    { id: '5333', x: 120, y: 305, w: 70,  h: 45 },
    { id: '5339', x: 195, y: 310, w: 50,  h: 35 },
    { id: '5353', x: 245, y: 322, w: 90,  h: 50 },
  ];
  const other = [
    { x: 110, y: 15, w: 45, h: 45 },
    { x: 250, y: 18, w: 40, h: 40 },
    { x: 175, y: 75, w: 30, h: 20 },
  ];
  return (
    <div style={{
      position: 'absolute', inset: 0, background: _MAP_BG, overflow: 'hidden',
      filter: dim ? 'brightness(0.55) saturate(0.5)' : 'none',
    }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 175, height: 42, background: '#fff' }} />
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 350, width: 36, background: '#fff' }} />
      <div style={{ position: 'absolute', left: 12, top: 190, fontSize: 11, color: '#4B5563' }}>SE Knapp St</div>
      <div style={{ position: 'absolute', right: 8, top: 80, transform: 'rotate(90deg)', transformOrigin: 'right top', fontSize: 11, color: '#4B5563' }}>SE 54th Ave</div>
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
        {rects.map(r => {
          const hot = hotBuildings[r.id];
          return (
            <g key={r.id}>
              <rect x={r.x} y={r.y} width={r.w} height={r.h}
                    fill={hot === 'selected' ? _P_BLUE_LIGHT : hot === 'alert' ? '#FEF3C7' : '#fff'}
                    stroke={hot === 'selected' ? _P_BLUE : hot === 'alert' ? _AMBER : _P_BLUE}
                    strokeWidth={hot === 'selected' ? 2.4 : 1.4} rx="1"/>
              <text x={r.x + r.w/2} y={r.y + r.h/2 + 4}
                    fontSize="11" fontWeight="700"
                    fill={hot === 'selected' ? _P_BLUE : hot === 'alert' ? '#92400E' : _P_BLUE}
                    textAnchor="middle" fontFamily="-apple-system, system-ui">{r.id}</text>
            </g>
          );
        })}
        {other.map((r, i) => (
          <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} fill="#fff" stroke={_P_BLUE} strokeWidth="1.4" rx="1"/>
        ))}
      </svg>
      <div style={{
        position: 'absolute', top: 10, left: 14, fontSize: 10, color: '#374151',
        display: 'flex', gap: 4, alignItems: 'center',
      }}>
        <span>0</span>
        <div style={{ width: 40, height: 4, background: '#111' }} />
        <div style={{ width: 40, height: 4, background: '#fff', border: '1px solid #111' }} />
        <span>100 ft</span>
      </div>
      {pins.map((p, i) => <React.Fragment key={i}>{p}</React.Fragment>)}
    </div>
  );
}

// Translucent top header, refined
function RTopHeader({ title = 'All-District Training Only' }) {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, zIndex: 4,
      paddingTop: 54, paddingBottom: 12, paddingLeft: 16, paddingRight: 12,
      background: 'rgba(242,243,247,0.82)',
      backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div style={{
        flex: 1, textAlign: 'center', color: 'rgba(255,255,255,0.95)',
        fontSize: 15, fontWeight: 600, letterSpacing: -0.2,
        textShadow: '0 1px 2px rgba(0,0,0,0.25)',
      }}>{title}</div>
      <div style={{ position: 'absolute', right: 12, top: 50, display: 'flex', gap: 10, alignItems: 'center' }}>
        <div style={{
          width: 30, height: 30, borderRadius: 15, background: _P_BLUE,
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
        }}><window.IconUser size={18} stroke={2.2} /></div>
      </div>
    </div>
  );
}

// Pin types — purpose-colored so volunteers can read the map fast
const PinKinds = {
  warning: { color: _AMBER, bg: '#FEF3C7', icon: '⚠︎' },
  note:    { color: _P_BLUE, bg: _P_BLUE_LIGHT, icon: '💬' },
  help:    { color: _RED, bg: '#FEE2E2', icon: '!' },
  done:    { color: _GREEN, bg: '#DCFCE7', icon: '✓' },
};

function MapPin({ top, left, kind = 'note', label, avatar, unread, author }) {
  const k = PinKinds[kind];
  return (
    <div style={{ position: 'absolute', top, left, zIndex: 3, transform: 'translate(-50%, -100%)' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        background: '#fff', borderRadius: 18, padding: '3px 10px 3px 3px',
        boxShadow: '0 3px 10px rgba(0,0,0,0.22)', border: `1.5px solid ${k.color}`,
        whiteSpace: 'nowrap',
      }}>
        <div style={{
          width: 24, height: 24, borderRadius: 12, background: k.color, color: '#fff',
          fontSize: 11, fontWeight: 800,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{avatar || k.icon}</div>
        <span style={{ fontSize: 11, fontWeight: 700, color: _INK, letterSpacing: -0.1 }}>{label}</span>
        {unread && (
          <div style={{
            minWidth: 16, height: 16, padding: '0 4px', borderRadius: 8,
            background: _RED, color: '#fff', fontSize: 9, fontWeight: 800,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{unread}</div>
        )}
      </div>
      {/* tail */}
      <div style={{
        width: 2, height: 14, background: k.color,
        margin: '0 auto',
      }}/>
      <div style={{
        width: 10, height: 10, borderRadius: 5, background: k.color,
        margin: '0 auto', boxShadow: '0 0 0 3px rgba(255,255,255,0.9)',
      }}/>
    </div>
  );
}

// Big primary button (reused)
function BigBtn({ icon, label, color = _P_BLUE }) {
  return (
    <div style={{
      background: color, color: '#fff', borderRadius: 10,
      height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 10, fontWeight: 600, fontSize: 16, letterSpacing: -0.1,
      boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
    }}>{icon} {label}</div>
  );
}
function FAB() {
  return (
    <div style={{
      position: 'absolute', bottom: 96, left: '50%',
      width: 56, height: 56, borderRadius: 28, background: _P_BLUE,
      color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 8px 20px rgba(31,63,217,0.45), 0 2px 4px rgba(0,0,0,0.12)', zIndex: 25,
      transform: 'translateX(-50%) rotate(45deg)',
    }}><window.IconPlus size={26} /></div>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN 1 — Map with live team pins
// ─────────────────────────────────────────────────────────────
function S1_MapWithPins() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff' }}>
      <RMap pins={[
        <MapPin key="p1" top={90}  left={305} kind="warning" label="Gate locked" avatar="MC" unread={2} />,
        <MapPin key="p2" top={225} left={210} kind="note"    label="Dog OK" avatar="RO" />,
        <MapPin key="p3" top={305} left={155} kind="done"    label="Done" avatar="PS" />,
        <MapPin key="p4" top={310} left={270} kind="help"    label="Need help" avatar="JL" unread={1} />,
      ]} />
      <RTopHeader />
      {/* action sheet preserved */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 83,
        background: '#fff', padding: '14px 16px 16px',
        borderTopLeftRadius: 14, borderTopRightRadius: 14,
        boxShadow: '0 -2px 10px rgba(0,0,0,0.08)',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        <BigBtn icon={<window.IconHome size={18} />} label="Add address" />
        <BigBtn icon={<window.IconUser size={18} />} label="Add person" />
      </div>
      <FAB />
      <RTabs active="map" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN 2 — Pin long-press action sheet
// ─────────────────────────────────────────────────────────────
function S2_PinSheet() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff' }}>
      <RMap hotBuildings={{ '5329': 'selected' }} dim />
      <RTopHeader />
      {/* building callout above the sheet */}
      <div style={{
        position: 'absolute', top: 260, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', zIndex: 6,
      }}>
        <div style={{
          background: '#fff', borderRadius: 12, padding: '10px 14px',
          boxShadow: '0 6px 18px rgba(0,0,0,0.15)', border: `1px solid ${_LINE}`,
          display: 'flex', alignItems: 'center', gap: 10, minWidth: 240,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8, background: _P_BLUE_LIGHT,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: _P_BLUE, fontWeight: 800, fontSize: 13,
          }}>5329</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: _INK }}>5329 SE 54th Ave</div>
            <div style={{ fontSize: 11, color: _INK_3 }}>Not yet canvassed</div>
          </div>
        </div>
      </div>
      {/* bottom sheet with share-to-team options */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 83, zIndex: 10,
        background: '#fff', padding: '10px 12px 16px',
        borderTopLeftRadius: 18, borderTopRightRadius: 18,
        boxShadow: '0 -6px 20px rgba(0,0,0,0.15)',
      }}>
        <div style={{
          width: 36, height: 4, borderRadius: 2, background: _LINE,
          margin: '2px auto 12px',
        }}/>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: 0.6,
          textTransform: 'uppercase', color: _INK_4, padding: '0 4px 8px',
        }}>Share with team</div>

        {[
          { kind: 'warning', title: 'Flag a warning', sub: 'Dog, gate, skip — visible on map' },
          { kind: 'note',    title: 'Leave a note',   sub: 'Plain tip for anyone passing by' },
          { kind: 'help',    title: 'Ask for help',   sub: 'Pings captain + nearby volunteers' },
        ].map(opt => {
          const k = PinKinds[opt.kind];
          return (
            <div key={opt.kind} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '10px 6px',
              borderBottom: `0.5px solid ${_LINE}`,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10, background: k.bg, color: k.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 16,
              }}>{k.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: _INK }}>{opt.title}</div>
                <div style={{ fontSize: 12, color: _INK_3, marginTop: 1 }}>{opt.sub}</div>
              </div>
              <window.IconChevR size={16} style={{ color: _INK_4 }}/>
            </div>
          );
        })}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 6px 2px' }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, background: _P_BLUE_LIGHT, color: _P_BLUE,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><window.IconChat size={20} stroke={2.2}/></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: _INK }}>Start a chat at this address</div>
            <div style={{ fontSize: 12, color: _INK_3, marginTop: 1 }}>Threaded — lives in Chat tab</div>
          </div>
          <window.IconChevR size={16} style={{ color: _INK_4 }}/>
        </div>
      </div>
      <RTabs active="map" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN 3 — Chat list (segmented: All / Team / Pins / Direct)
// ─────────────────────────────────────────────────────────────
function RowAvatar({ kind, initials, isCaptain }) {
  if (kind) {
    const k = PinKinds[kind];
    return (
      <div style={{
        width: 44, height: 44, borderRadius: 12, background: k.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: k.color, fontWeight: 800, fontSize: 16,
        border: `1.5px solid ${k.color}`, flexShrink: 0,
      }}>{k.icon}</div>
    );
  }
  return (
    <div style={{
      width: 44, height: 44, borderRadius: 22,
      background: isCaptain ? _P_BLUE : '#D8DEE9',
      color: isCaptain ? '#fff' : _INK_2,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 700, fontSize: 15, flexShrink: 0,
    }}>{initials}</div>
  );
}

function RRow({ avatar, title, titleBadge, subtitle, preview, time, unread, isLast }) {
  return (
    <div style={{
      display: 'flex', gap: 12, padding: '12px 16px',
      borderBottom: isLast ? 'none' : `0.5px solid ${_LINE}`, alignItems: 'center',
    }}>
      {avatar}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
          <div style={{
            fontWeight: unread ? 700 : 600, fontSize: 15, color: _INK,
            display: 'flex', alignItems: 'center', gap: 6,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {title}
            {titleBadge}
          </div>
          <div style={{
            fontSize: 12, color: unread ? _P_BLUE : _INK_4,
            fontWeight: unread ? 700 : 400, flexShrink: 0,
          }}>{time}</div>
        </div>
        {subtitle && (
          <div style={{ fontSize: 11, color: _INK_4, marginTop: 1, fontWeight: 500 }}>{subtitle}</div>
        )}
        <div style={{
          fontSize: 13, color: unread ? _INK_2 : _INK_3, marginTop: 2,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{preview}</div>
      </div>
      {unread && (
        <div style={{
          minWidth: 20, height: 20, padding: '0 6px', borderRadius: 10,
          background: _P_BLUE, color: '#fff', fontSize: 11, fontWeight: 800,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>{unread}</div>
      )}
    </div>
  );
}

function CaptainBadge() {
  return (
    <span style={{
      fontSize: 9, fontWeight: 800, letterSpacing: 0.4,
      background: _P_BLUE_LIGHT, color: _P_BLUE,
      padding: '2px 5px', borderRadius: 4, textTransform: 'uppercase',
    }}>Captain</span>
  );
}

function PinBadge({ kind }) {
  const k = PinKinds[kind];
  return (
    <span style={{
      fontSize: 9, fontWeight: 800, letterSpacing: 0.3,
      background: k.bg, color: k.color,
      padding: '2px 6px', borderRadius: 4, textTransform: 'uppercase',
      display: 'inline-flex', alignItems: 'center', gap: 3,
    }}>
      <window.IconPin size={9} stroke={2.8} /> {kind}
    </span>
  );
}

function S3_ChatList({ tab = 'All' }) {
  const tabs = ['All', 'Team', 'Pins', 'Direct'];
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff' }}>
      <RStatusBar />
      {/* Large title header */}
      <div style={{
        position: 'absolute', top: 54, left: 0, right: 0, zIndex: 4,
        padding: '0 16px', background: '#fff', borderBottom: `0.5px solid ${_LINE}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 4 }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: _INK, letterSpacing: -0.6 }}>Chat</div>
          <div style={{ color: _P_BLUE }}><window.IconEdit size={22}/></div>
        </div>
        {/* Search */}
        <div style={{
          background: '#EEF0F3', borderRadius: 10, padding: '8px 12px',
          display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: _INK_4,
          marginTop: 8,
        }}>
          <window.IconSearch size={16}/> Search messages, addresses, volunteers
        </div>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, marginTop: 10, marginBottom: -0.5 }}>
          {tabs.map(t => (
            <div key={t} style={{
              padding: '8px 14px 10px', fontSize: 13, fontWeight: 600,
              color: t === tab ? _P_BLUE : _INK_3,
              borderBottom: t === tab ? `2px solid ${_P_BLUE}` : '2px solid transparent',
            }}>{t}</div>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', top: 190, left: 0, right: 0, bottom: 83, overflow: 'hidden' }}>
        {/* Pinned team — highlighted */}
        <div style={{
          padding: '12px 16px', background: _P_BLUE_LIGHT,
          display: 'flex', gap: 12, alignItems: 'center',
          borderBottom: `0.5px solid ${_LINE}`,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 22, background: _P_BLUE, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: 15,
          }}>AD</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: _INK }}>All-District Team</div>
              <span style={{ fontSize: 9, color: _P_BLUE, fontWeight: 700, letterSpacing: 0.3 }}>● 4 ACTIVE</span>
            </div>
            <div style={{ fontSize: 13, color: _INK_2, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              <strong style={{ color: _INK }}>Marcus:</strong> just finished 5300 block, heading to 5400
            </div>
          </div>
          <div style={{
            minWidth: 20, height: 20, padding: '0 6px', borderRadius: 10,
            background: _P_BLUE, color: '#fff', fontSize: 11, fontWeight: 800,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>3</div>
        </div>

        {/* Pin threads — grouped */}
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: 0.6,
          textTransform: 'uppercase', color: _INK_4,
          padding: '14px 16px 6px', display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <window.IconPin size={12} stroke={2.5}/> Pinned to map · 4
        </div>

        <RRow
          avatar={<RowAvatar kind="warning" />}
          title="5329 SE 54th Ave"
          titleBadge={<PinBadge kind="warning" />}
          subtitle="Started by Marcus · 3 watching"
          preview="Gate is locked — can't buzz in from outside"
          time="4m" unread={2}
        />
        <RRow
          avatar={<RowAvatar kind="help" />}
          title="5339 SE Knapp St"
          titleBadge={<PinBadge kind="help" />}
          subtitle="Started by Jordan · 2 watching"
          preview="Locked fence, big dog. Anyone nearby?"
          time="11m" unread={1}
        />
        <RRow
          avatar={<RowAvatar kind="note" />}
          title="5344 SE 54th Ave"
          titleBadge={<PinBadge kind="note" />}
          subtitle="Started by Rachel"
          preview="Dog at 5344 is fine, friendly actually"
          time="28m"
        />

        {/* Direct messages */}
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: 0.6,
          textTransform: 'uppercase', color: _INK_4,
          padding: '14px 16px 6px',
        }}>Direct messages</div>
        <RRow
          avatar={<RowAvatar initials="RO" isCaptain />}
          title="Rachel Ortega"
          titleBadge={<CaptainBadge/>}
          preview="How's the block going?"
          time="8m"
        />
        <RRow
          avatar={<RowAvatar initials="MC" />}
          title="Marcus Chen"
          preview="Can you take the east side of Knapp?"
          time="11m"
        />
        <RRow
          avatar={<RowAvatar initials="PS" />}
          title="Priya S."
          preview="I'm going to lunch — back at 1:30"
          time="42m"
          isLast
        />
      </div>
      <RTabs active="chat" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN 4 — Pinned conversation (with mini-map context)
// ─────────────────────────────────────────────────────────────
function Bubble({ own, from, text, time, showAvatar, attachment, reactions }) {
  const initials = from ? from.split(' ').map(w => w[0]).slice(0,2).join('') : '';
  return (
    <div style={{
      display: 'flex', gap: 8, marginBottom: 6,
      flexDirection: own ? 'row-reverse' : 'row', alignItems: 'flex-end',
    }}>
      {!own && (
        <div style={{
          width: 26, height: 26, borderRadius: 13, background: '#D8DEE9',
          color: _INK_2, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, fontWeight: 800, flexShrink: 0,
          visibility: showAvatar ? 'visible' : 'hidden',
        }}>{initials}</div>
      )}
      <div style={{ maxWidth: '74%' }}>
        {showAvatar && !own && from && (
          <div style={{ fontSize: 11, color: _INK_3, marginBottom: 2, marginLeft: 4, fontWeight: 600 }}>{from}</div>
        )}
        {attachment}
        {text && (
          <div style={{
            background: own ? _P_BLUE : '#EEF0F3', color: own ? '#fff' : _INK,
            padding: '9px 13px', borderRadius: 18,
            borderBottomRightRadius: own ? 6 : 18,
            borderBottomLeftRadius: own ? 18 : 6,
            fontSize: 15, lineHeight: 1.35, letterSpacing: -0.1,
          }}>{text}</div>
        )}
        {reactions && (
          <div style={{
            display: 'flex', gap: 4, marginTop: 4,
            justifyContent: own ? 'flex-end' : 'flex-start',
          }}>
            {reactions.map((r, i) => (
              <div key={i} style={{
                background: '#fff', border: `1px solid ${_LINE}`, borderRadius: 12,
                padding: '2px 7px', fontSize: 11, fontWeight: 600, color: _INK_2,
                display: 'flex', alignItems: 'center', gap: 3,
              }}>{r.e} <span style={{ color: _INK_3 }}>{r.n}</span></div>
            ))}
          </div>
        )}
        {time && (
          <div style={{
            fontSize: 10, color: _INK_4, marginTop: 3,
            textAlign: own ? 'right' : 'left', padding: '0 4px',
          }}>{time}</div>
        )}
      </div>
    </div>
  );
}

function PhotoAttach({ label, w = 180, h = 130 }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: 14, overflow: 'hidden', marginBottom: 6,
      position: 'relative',
      background: `repeating-linear-gradient(135deg, #D1D9E6 0 6px, #C3CCDD 6px 12px)`,
      border: `1px solid ${_LINE}`,
    }}>
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '16px 10px 6px',
        background: 'linear-gradient(transparent, rgba(0,0,0,0.5))',
        color: '#fff', fontSize: 11, fontWeight: 600,
      }}>📷 {label}</div>
    </div>
  );
}

function AddressCard({ address, status }) {
  return (
    <div style={{
      background: '#fff', border: `1px solid ${_LINE}`, borderRadius: 14,
      padding: 10, display: 'flex', gap: 10, alignItems: 'center',
      marginBottom: 6, width: 240,
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 8, background: _MAP_BG,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: `1px solid ${_LINE}`,
      }}>
        <window.IconHome size={20} style={{ color: _P_BLUE }}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: _INK }}>{address}</div>
        <div style={{ fontSize: 11, color: _INK_3, marginTop: 1 }}>{status}</div>
      </div>
      <window.IconChevR size={14} style={{ color: _INK_4 }}/>
    </div>
  );
}

function S4_PinnedConvo() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff' }}>
      <RStatusBar />
      {/* Pinned conversation header with mini-map */}
      <div style={{
        position: 'absolute', top: 54, left: 0, right: 0, zIndex: 4,
        background: '#fff', borderBottom: `0.5px solid ${_LINE}`,
        paddingBottom: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 12px 8px' }}>
          <div style={{ color: _P_BLUE }}><window.IconBack size={26} stroke={2.2}/></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 0.6,
              textTransform: 'uppercase', color: _AMBER,
              display: 'flex', alignItems: 'center', gap: 3 }}>
              <window.IconPin size={11} stroke={2.8}/> Warning · pinned
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, color: _INK, marginTop: 1 }}>5329 SE 54th Ave</div>
            <div style={{ fontSize: 11, color: _INK_3, marginTop: 1 }}>Started by Marcus · 3 watching</div>
          </div>
          <div style={{
            padding: '6px 10px', borderRadius: 8, background: _P_BLUE_LIGHT, color: _P_BLUE,
            fontSize: 11, fontWeight: 700,
          }}>Open</div>
        </div>
        {/* Mini map */}
        <div style={{
          margin: '0 12px', height: 76, borderRadius: 10, overflow: 'hidden', position: 'relative',
          border: `1px solid ${_LINE}`, background: _MAP_BG,
        }}>
          <svg width="100%" height="100%">
            <rect x="20" y="14" width="55" height="40" fill="#fff" stroke={_P_BLUE} strokeWidth="1.2" />
            <rect x="85" y="18" width="50" height="38" fill="#fff" stroke={_P_BLUE} strokeWidth="1.2" />
            <rect x="145" y="10" width="70" height="48" fill="#FEF3C7" stroke={_AMBER} strokeWidth="2.2" />
            <text x="180" y="38" fontSize="11" fontWeight="800" fill="#92400E" textAnchor="middle"
              fontFamily="-apple-system, system-ui">5329</text>
            <rect x="225" y="16" width="50" height="42" fill="#fff" stroke={_P_BLUE} strokeWidth="1.2" />
            <rect x="285" y="12" width="45" height="46" fill="#fff" stroke={_P_BLUE} strokeWidth="1.2" />
          </svg>
          <div style={{
            position: 'absolute', top: 12, left: 168, width: 22, height: 22, borderRadius: 11,
            background: _AMBER, border: '3px solid #fff', boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 900, fontSize: 12,
          }}>⚠︎</div>
        </div>
      </div>

      <div style={{
        position: 'absolute', top: 222, left: 0, right: 0, bottom: 91,
        overflow: 'hidden', padding: '10px 12px',
      }}>
        <div style={{ textAlign: 'center', fontSize: 11, color: _INK_4, margin: '4px 0 10px' }}>
          Today 9:47 AM · pinned to map
        </div>
        <Bubble from="Marcus Chen" showAvatar time="9:47"
          text="Gate here is locked. Can't buzz in from outside." />
        <Bubble from="Marcus Chen" time="9:47"
          attachment={<PhotoAttach label="Gate at 5329" />} />
        <Bubble from="Rachel Ortega" showAvatar time="9:49"
          text="Ok, skip for now. I'll flag the landlord."
          reactions={[{ e: '👍', n: 3 }]}/>
        <Bubble own text="Same thing last week — noting on the address." time="9:51" />
        <Bubble own time="9:51"
          attachment={<AddressCard address="5329 SE 54th Ave" status="Can't access · gate locked"/>} />
        <Bubble from="Priya S." showAvatar time="9:52"
          text="Thanks! Skipping it." />
      </div>

      {/* Composer */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        background: _CHROME, borderTop: `0.5px solid ${_LINE}`,
        padding: '8px 10px 28px',
        display: 'flex', alignItems: 'center', gap: 8, zIndex: 5,
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: 17, background: '#fff',
          border: `1px solid ${_LINE}`, display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: _INK_3, flexShrink: 0,
        }}><window.IconPlus size={20} /></div>
        <div style={{
          flex: 1, background: '#fff', borderRadius: 18, border: `1px solid ${_LINE}`,
          padding: '8px 10px 8px 14px', minHeight: 34,
          display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 14, color: _INK_4,
        }}>
          <span style={{ flex: 1 }}>Reply about 5329</span>
          <window.IconCamera size={20} style={{ color: _INK_3 }}/>
          <window.IconPin size={20} style={{ color: _P_BLUE }}/>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SCREEN 5 — Team chat with attachment rail (showing all share types)
// ─────────────────────────────────────────────────────────────
function S5_TeamChatRail() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff' }}>
      <RStatusBar />
      <div style={{
        position: 'absolute', top: 54, left: 0, right: 0, zIndex: 3,
        paddingBottom: 10, paddingLeft: 12, paddingRight: 12,
        background: '#fff', borderBottom: `0.5px solid ${_LINE}`,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <div style={{ color: _P_BLUE }}><window.IconBack size={26} stroke={2.2}/></div>
        <div style={{
          width: 34, height: 34, borderRadius: 17, background: _P_BLUE,
          color: '#fff', fontSize: 12, fontWeight: 800,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>AD</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: _INK }}>All-District Team</div>
          <div style={{ fontSize: 11, color: _INK_3 }}>12 members · 4 active</div>
        </div>
      </div>

      <div style={{
        position: 'absolute', top: 110, left: 0, right: 0, bottom: 208,
        overflow: 'hidden', padding: '10px 12px',
      }}>
        <div style={{ textAlign: 'center', fontSize: 11, color: _INK_4, margin: '4px 0 10px' }}>Today 9:47 AM</div>

        <Bubble from="Rachel Ortega" showAvatar time="9:47"
          text="Morning team! Check in when you hit your block 👋" />

        <Bubble from="Marcus Chen" showAvatar time="9:49"
          attachment={
            <div style={{
              width: 240, background: '#FEF3C7', border: `1.5px solid ${_AMBER}`, borderRadius: 14,
              padding: 10, display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, background: _AMBER, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 16,
              }}>⚠︎</div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 9, fontWeight: 800, letterSpacing: 0.4,
                  textTransform: 'uppercase', color: '#92400E',
                }}>Warning pinned</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: _INK, marginTop: 1 }}>5329 SE 54th Ave</div>
                <div style={{ fontSize: 11, color: _INK_3 }}>Gate locked · can't access</div>
              </div>
            </div>
          } />
        <Bubble from="Marcus Chen" text="skipping this one — flagged on the map" time="9:49" />

        <Bubble own text="got it 👍" time="9:50" />

        <Bubble from="Rachel Ortega" showAvatar time="9:52"
          attachment={<PhotoAttach label="Weird side entrance @ 5335" w={200} h={140} />} />

        <Bubble from="Priya S." showAvatar time="9:53"
          attachment={<AddressCard address="5344 SE 54th Ave" status="Supporter · flagged for follow-up"/>} />
        <Bubble from="Priya S." text="talked to the owner, super engaged" time="9:53"
          reactions={[{ e: '🎉', n: 4 }, { e: '❤️', n: 2 }]} />
      </div>

      {/* Attachment rail (open) */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 61, zIndex: 5,
        background: _CHROME, borderTop: `0.5px solid ${_LINE}`,
        padding: '12px 12px 10px',
      }}>
        <div style={{
          fontSize: 10, fontWeight: 800, letterSpacing: 0.5,
          textTransform: 'uppercase', color: _INK_4, marginBottom: 8, paddingLeft: 2,
        }}>Attach</div>
        <div style={{ display: 'flex', gap: 10, overflow: 'hidden' }}>
          {[
            { icon: <window.IconCamera size={22}/>, label: 'Photo', color: _P_BLUE, bg: _P_BLUE_LIGHT },
            { icon: <window.IconPin size={22}/>,    label: 'Pin address', color: _P_BLUE, bg: _P_BLUE_LIGHT },
            { icon: <span style={{ fontSize: 20, fontWeight: 800 }}>⚠︎</span>, label: 'Warning', color: _AMBER, bg: '#FEF3C7' },
            { icon: <window.IconHome size={22}/>,   label: 'Share address', color: _GREEN, bg: '#DCFCE7' },
            { icon: <window.IconUser size={22}/>,   label: 'Share person', color: '#8B5CF6', bg: '#EDE9FE' },
            { icon: <span style={{ fontSize: 20, fontWeight: 800 }}>!</span>, label: 'Help', color: _RED, bg: '#FEE2E2' },
          ].map((a, i) => (
            <div key={i} style={{
              flexShrink: 0, width: 68, display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 6,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14, background: a.bg, color: a.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `1px solid ${a.color}22`,
              }}>{a.icon}</div>
              <div style={{ fontSize: 10, color: _INK_2, fontWeight: 600, textAlign: 'center', lineHeight: 1.2 }}>
                {a.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Composer */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        background: _CHROME, padding: '6px 10px 28px',
        display: 'flex', alignItems: 'center', gap: 8, zIndex: 6,
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: 17, background: _P_BLUE,
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: 'rotate(45deg)', flexShrink: 0,
        }}><window.IconPlus size={20} /></div>
        <div style={{
          flex: 1, background: '#fff', borderRadius: 18, border: `1px solid ${_LINE}`,
          padding: '8px 10px 8px 14px', minHeight: 34,
          display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 14, color: _INK_4,
        }}>
          <span style={{ flex: 1 }}>Message the team</span>
          <window.IconSmile size={20} style={{ color: _INK_3 }}/>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// S0 — Simple 1:1 DM (primary flow terminus)
// ─────────────────────────────────────────────────────────────
function S0_DM() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff' }}>
      <RStatusBar />
      <div style={{
        position: 'absolute', top: 54, left: 0, right: 0, zIndex: 3,
        paddingBottom: 10, paddingLeft: 12, paddingRight: 12,
        background: '#fff', borderBottom: `0.5px solid ${_LINE}`,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <div style={{ color: _P_BLUE }}><IconBack size={26} stroke={2.2}/></div>
        <div style={{
          width: 34, height: 34, borderRadius: 17, background: _P_BLUE,
          color: '#fff', fontSize: 12, fontWeight: 800,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>RO</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: _INK,
            display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            Rachel Ortega
            <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: 0.4,
              background: _P_BLUE_LIGHT, color: _P_BLUE,
              padding: '2px 5px', borderRadius: 4, textTransform: 'uppercase' }}>Captain</span>
          </div>
          <div style={{ fontSize: 11, color: _GREEN, fontWeight: 600 }}>● Active now</div>
        </div>
      </div>
      <div style={{
        position: 'absolute', top: 110, left: 0, right: 0, bottom: 61,
        overflow: 'hidden', padding: '10px 12px',
      }}>
        <div style={{ textAlign: 'center', fontSize: 11, color: _INK_4, margin: '4px 0 10px' }}>Today 9:48 AM</div>
        <Bubble own text="Quick q — the dog at 5344 safe to approach?" time="9:48" />
        <Bubble from="Rachel Ortega" showAvatar time="9:49"
          text="Yep, friendly. Owner's usually home." />
        <Bubble own text="Thanks 🙏" time="9:50" />
        <Bubble from="Rachel Ortega" showAvatar time="9:52"
          text="How's the block going?" />
      </div>
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        background: _CHROME, borderTop: `0.5px solid ${_LINE}`,
        padding: '8px 10px 28px',
        display: 'flex', alignItems: 'center', gap: 8, zIndex: 5,
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: 17, background: '#fff',
          border: `1px solid ${_LINE}`, display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: _INK_3, flexShrink: 0,
        }}><IconPlus size={20} /></div>
        <div style={{
          flex: 1, background: '#fff', borderRadius: 18, border: `1px solid ${_LINE}`,
          padding: '8px 10px 8px 14px', minHeight: 34,
          display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 14, color: _INK_4,
        }}>
          <span style={{ flex: 1 }}>Message</span>
          <IconCamera size={20} style={{ color: _INK_3 }}/>
        </div>
      </div>
    </div>
  );
}

// Simple chat list — no pins section (for primary flow)
function S0_SimpleList() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff' }}>
      <RStatusBar />
      <div style={{
        position: 'absolute', top: 54, left: 0, right: 0, zIndex: 4,
        padding: '0 16px 10px', background: '#fff', borderBottom: `0.5px solid ${_LINE}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 4 }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: _INK, letterSpacing: -0.6 }}>Chat</div>
          <div style={{ color: _P_BLUE }}><IconEdit size={22}/></div>
        </div>
        <div style={{
          background: '#EEF0F3', borderRadius: 10, padding: '8px 12px',
          display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: _INK_4,
          marginTop: 8,
        }}>
          <IconSearch size={16}/> Search
        </div>
      </div>
      <div style={{ position: 'absolute', top: 144, left: 0, right: 0, bottom: 83, overflow: 'hidden' }}>
        <div style={{
          padding: '12px 16px', background: _P_BLUE_LIGHT,
          display: 'flex', gap: 12, alignItems: 'center',
          borderBottom: `0.5px solid ${_LINE}`,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 22, background: _P_BLUE, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: 15,
          }}>AD</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: _INK }}>All-District Team</div>
            <div style={{ fontSize: 13, color: _INK_2, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              <strong style={{ color: _INK }}>Marcus:</strong> heading to 5400 block
            </div>
          </div>
          <div style={{
            minWidth: 20, height: 20, padding: '0 6px', borderRadius: 10,
            background: _P_BLUE, color: '#fff', fontSize: 11, fontWeight: 800,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>3</div>
        </div>
        <RRow avatar={<RowAvatar initials="RO" isCaptain />} title="Rachel Ortega"
          titleBadge={<CaptainBadge/>} preview="How's the block going?" time="8m" unread={1} />
        <RRow avatar={<RowAvatar initials="MC" />} title="Marcus Chen"
          preview="Can you take the east side of Knapp?" time="11m" />
        <RRow avatar={<RowAvatar initials="PS" />} title="Priya S."
          preview="I'm going to lunch — back at 1:30" time="42m" />
        <RRow avatar={<RowAvatar initials="JL" />} title="Jordan Lee"
          preview="📷 Photo" time="1h" />
        <RRow avatar={<RowAvatar initials="TW" />} title="Tom Whittaker"
          preview="See you at 5 for debrief" time="Yesterday" isLast />
      </div>
      <RTabs active="chat" />
    </div>
  );
}

// Plain Map with Chat tab (no pins)
function S0_MapPlain() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff' }}>
      <RMap />
      <RTopHeader />
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 83,
        background: '#fff', padding: '14px 16px 16px',
        borderTopLeftRadius: 14, borderTopRightRadius: 14,
        boxShadow: '0 -2px 10px rgba(0,0,0,0.08)',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        <BigBtn icon={<IconHome size={18} />} label="Add address" />
        <BigBtn icon={<IconUser size={18} />} label="Add person" />
      </div>
      <FAB />
      <RTabs active="map" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Canvas assembly
// ─────────────────────────────────────────────────────────────
function Screen({ label, sub, children }) {
  return (
    <div style={{ flexShrink: 0 }}>
      <div style={{
        fontSize: 13, fontWeight: 700, color: 'rgba(40,30,20,0.85)',
        marginBottom: 3, letterSpacing: -0.1,
      }}>{label}</div>
      {sub && (
        <div style={{
          fontSize: 12, color: 'rgba(60,50,40,0.6)', marginBottom: 12, maxWidth: 360,
        }}>{sub}</div>
      )}
      <window.PhoneFrame>{children}</window.PhoneFrame>
    </div>
  );
}

// Minimal PhoneFrame — Chat.jsx's is in-file-scoped so redefine
function PhoneFrame({ children, width = 360, height = 740 }) {
  return (
    <div style={{
      width, height, borderRadius: 42, overflow: 'hidden',
      position: 'relative', background: '#F2F3F7',
      boxShadow: '0 30px 60px rgba(0,0,0,0.18), 0 0 0 10px #111, 0 0 0 11px #2A2A2E',
      fontFamily: '-apple-system, BlinkMacSystemFont, system-ui, sans-serif',
      WebkitFontSmoothing: 'antialiased',
    }}>
      <div style={{
        position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
        width: 110, height: 32, borderRadius: 20, background: '#000', zIndex: 50,
      }}/>
      {children}
    </div>
  );
}
window.PhoneFrame = PhoneFrame;

function RefinedApp() {
  return (
    <window.DesignCanvas minScale={0.15} maxScale={2.5}>
      {/* Header */}
      <div style={{ padding: '0 60px 48px', maxWidth: 980 }}>
        <div style={{
          fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase',
          color: _P_BLUE, marginBottom: 8,
        }}>People · Concept 01 · Refined</div>
        <div style={{ fontSize: 44, fontWeight: 800, color: '#1a1a1a', letterSpacing: -1, lineHeight: 1.05 }}>
          Chat tab in the People app
        </div>
        <div style={{ fontSize: 16, color: '#555', lineHeight: 1.55, maxWidth: 760, marginTop: 14 }}>
          A Chat tab joins Map and History. Start with the basics below — open Chat, pick someone, send a message. <strong>Secondary features</strong> (pinning threads to addresses, sharing warnings from the map, the team thread) are explored further down.
        </div>
      </div>

      {/* PRIMARY FLOW */}
      <window.DCSection
        title="Primary flow · Open chat, message someone"
        subtitle="The everyday path. No pins, no shares — just the core loop."
      >
        <Screen label="1. Map tab"
                sub="Chat lives in the bottom tab bar alongside Map and History. Unread count shows on the icon.">
          <S0_MapPlain />
        </Screen>
        <Screen label="2. Chat tab"
                sub="Team thread pinned at top, direct messages below. Tap a row to open.">
          <S0_SimpleList />
        </Screen>
        <Screen label="3. 1:1 conversation"
                sub="Standard messaging UI — bubbles, timestamps, a compose bar. Familiar and boring on purpose.">
          <S0_DM />
        </Screen>
      </window.DCSection>

      {/* SECONDARY FEATURES */}
      <div style={{ padding: '60px 60px 20px', maxWidth: 980 }}>
        <div style={{
          fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase',
          color: '#888', marginBottom: 8,
        }}>Secondary features</div>
        <div style={{ fontSize: 28, fontWeight: 800, color: '#1a1a1a', letterSpacing: -0.5 }}>
          Sharing from the field
        </div>
        <div style={{ fontSize: 15, color: '#555', lineHeight: 1.55, maxWidth: 720, marginTop: 10 }}>
          Beyond basic messaging, volunteers can drop <strong>warnings</strong>, <strong>notes</strong>, <strong>help requests</strong>, and <strong>address shares</strong> as pins on the map. Those pins open threaded conversations that appear in the Chat tab under a &quot;Pinned to map&quot; section — one inbox, two ways to enter it.
        </div>
      </div>

      {/* Pin vocabulary moved here (inside secondary features) */}
      <div style={{ padding: '0 60px 40px', maxWidth: 980 }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.4, textTransform: 'uppercase',
          color: '#888', marginBottom: 16 }}>Pin vocabulary</div>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          {[
            { kind: 'warning', title: 'Warning', desc: 'Locked gate, dog, skip-the-house' },
            { kind: 'note',    title: 'Note',    desc: 'Helpful tip for the next canvasser' },
            { kind: 'help',    title: 'Help',    desc: 'Pings captain + nearby volunteers' },
            { kind: 'done',    title: 'Done',    desc: 'Quick ack — block finished' },
          ].map(p => {
            const k = PinKinds[p.kind];
            return (
              <div key={p.kind} style={{
                background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 10,
                padding: '12px 14px', display: 'flex', gap: 10, alignItems: 'center', minWidth: 230,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, background: k.bg, color: k.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: 15, border: `1.5px solid ${k.color}`,
                }}>{k.icon}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: _INK }}>{p.title}</div>
                  <div style={{ fontSize: 11, color: _INK_3, marginTop: 2 }}>{p.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <window.DCSection
        title="A · Pinning from the map"
        subtitle="Canvassers share intel where they are. Every pin becomes a thread."
      >
        <Screen label="Map with live team pins"
                sub="Bubble pins sit above buildings. Color = purpose; unread badge = new activity in that thread.">
          <S1_MapWithPins />
        </Screen>
        <Screen label="Long-press → share sheet"
                sub="Flag a warning, leave a note, ask for help, or start a chat anchored to an address.">
          <S2_PinSheet />
        </Screen>
      </window.DCSection>

      <window.DCSection
        title="B · Pinned threads in Chat"
        subtitle="The Chat tab gains a section for map-anchored conversations and a richer attach rail."
      >
        <Screen label="Chat list with pinned threads"
                sub="Pinned threads get a colored square icon and a Pin label, grouped above DMs.">
          <S3_ChatList />
        </Screen>
        <Screen label="Pinned conversation"
                sub="Header shows a mini-map. Composer reads &quot;Reply about 5329&quot; — always clear what you're talking about.">
          <S4_PinnedConvo />
        </Screen>
        <Screen label="Team chat + attach rail"
                sub="The + composer opens every share type: photo, pin, warning, address, person, help.">
          <S5_TeamChatRail />
        </Screen>
      </window.DCSection>

      <window.DCPostIt top={-30} left={60} rotate={-3} width={240}>
        Primary flow is the everyday loop. Secondary features are optional layers — the app works without any of them.
      </window.DCPostIt>
    </window.DesignCanvas>
  );
}

// Take over the root
ReactDOM.createRoot(document.getElementById('root')).render(<RefinedApp />);
