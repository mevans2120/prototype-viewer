// App — top-level wiring. Manages chat open state + messages, wires dock to panel.

function App() {
  const [activeNav, setActiveNav] = React.useState("home");
  const [chatOpen, setChatOpen]   = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("team");
  const [messages, setMessages]   = React.useState(CHAT_MESSAGES);
  const [unread, setUnread]       = React.useState(3);

  const toggleChat = React.useCallback(() => {
    setChatOpen(prev => {
      const next = !prev;
      if (next) setUnread(0);
      return next;
    });
  }, []);

  const closeChat = React.useCallback(() => setChatOpen(false), []);

  const send = React.useCallback((text) => {
    const now = new Date();
    const hh = now.getHours();
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ampm = hh >= 12 ? "p" : "a";
    const h12 = ((hh + 11) % 12) + 1;
    const time = `${h12}:${mm}${ampm}`;

    setMessages(prev => {
      // strip existing trailing typing indicator, then add my message
      const base = prev.filter((m, i) => !(m.kind === "typing" && i === prev.length - 1));
      return [
        ...base,
        { kind: "msg", id: "u" + Date.now(), authorId: "me", author: "Kai N.", time, text },
      ];
    });

    // Simulate a coach reply after a brief pause
    setTimeout(() => {
      setMessages(prev => [...prev, { kind: "typing", who: "Rae B." }]);
    }, 700);
    setTimeout(() => {
      setMessages(prev => {
        const cleaned = prev.filter(m => m.kind !== "typing");
        return [
          ...cleaned,
          { kind: "msg", id: "r" + Date.now(), authorId: "coach", author: "Rae B.", role: "coach",
            time: (() => {
              const d = new Date();
              const h = ((d.getHours() + 11) % 12) + 1;
              const m = String(d.getMinutes()).padStart(2, "0");
              const ap = d.getHours() >= 12 ? "p" : "a";
              return `${h}:${m}${ap}`;
            })(),
            text: "Love this. Add it to the Friday case-study doc and I'll queue it up for review." },
        ];
      });
    }, 2200);
  }, []);

  // latest msg snippet for dock
  const lastMsg = [...messages].reverse().find(m => m.kind === "msg");
  const latest = {
    who: lastMsg ? lastMsg.author.split(" ")[0] : "Team",
    text: lastMsg ? lastMsg.text : "",
  };

  const typingMsg = messages.find(m => m.kind === "typing");
  const typingWho = typingMsg ? typingMsg.who : null;

  return (
    <div className="app">
      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        chatOpen={chatOpen}
        onToggleChat={toggleChat}
        onSend={send}
        unread={unread}
        typing={typingWho}
      />
      <Dashboard onOpenChat={() => { setChatOpen(true); setUnread(0); }} />
      <ChatPanel
        open={chatOpen}
        onClose={closeChat}
        messages={messages}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
