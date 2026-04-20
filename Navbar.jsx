// DRONERA — Navbar (English, Premium)

const { useState: useNavState, useEffect: useNavEffect } = React;

function Navbar({ currentPage, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useNavEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const el = document.documentElement;
      const pct = el.scrollTop / (el.scrollHeight - el.clientHeight);
      setScrollPct(isNaN(pct) ? 0 : pct * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useNavEffect(() => { setMobileOpen(false); }, [currentPage]);

  const links = [
    { id: "energy",       label: "Energetika" },
    { id: "agriculture",  label: "Mezőgazdaság" },
    { id: "geodesy",      label: "Geodezia" },
    { id: "contact",      label: "Kapcsolat" },
  ];

  return (
    <>
      {/* Scroll progress bar */}
      <div style={{
        position:"fixed",top:0,left:0,height:"2px",zIndex:9000,
        background:"rgba(255,255,255,0.5)",
        width: scrollPct + "%",
        transition:"width 0.08s linear",
        pointerEvents:"none",
      }}/>

      <nav style={{
        position:"fixed",top:0,left:0,width:"100%",zIndex:8000,
        transition:"background 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.5s",
        background: scrolled ? "rgba(5,5,7,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
      }}>
        <div style={{
          padding:"0 clamp(24px,5vw,120px)",
          display:"flex",alignItems:"center",justifyContent:"space-between",
          height:"72px",
        }}>
          {/* Logo */}
          <button onClick={() => onNavigate("home")} style={{
            background:"none",border:"none",cursor:"pointer",padding:0,
            fontFamily:"'Tanker',sans-serif",fontSize:"22px",
            textTransform:"uppercase",letterSpacing:"0.15em",color:"#FAFAF8",
          }}>DRONERA</button>

          {/* Desktop links */}
          <div style={{display:"flex",gap:"36px",alignItems:"center"}}>
            {links.map(link => (
              <NavLink
                key={link.id}
                label={link.label}
                active={currentPage === link.id}
                onClick={() => onNavigate(link.id)}
              />
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            style={{
              background:"none",border:"none",cursor:"pointer",padding:"8px",
              display:"none", color:"#FAFAF8",
            }}
            className="mobile-menu-btn"
          >
            {mobileOpen
              ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/></svg>
            }
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{
            background:"rgba(5,5,7,0.98)",backdropFilter:"blur(20px)",
            padding:"24px clamp(24px,5vw,60px) 40px",
            borderTop:"1px solid rgba(255,255,255,0.06)",
          }}>
            {links.map(link => (
              <button key={link.id} onClick={() => onNavigate(link.id)} style={{
                display:"block",width:"100%",textAlign:"left",
                background:"none",border:"none",cursor:"pointer",
                fontFamily:"'DM Sans',sans-serif",fontSize:"13px",fontWeight:500,
                textTransform:"uppercase",letterSpacing:"0.15em",
                color: currentPage === link.id ? "#FAFAF8" : "rgba(255,255,255,0.45)",
                padding:"16px 0",
                borderBottom:"1px solid rgba(255,255,255,0.04)",
              }}>{link.label}</button>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}

function NavLink({ label, active, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background:"none",border:"none",cursor:"pointer",padding:"4px 0",
        fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:500,
        textTransform:"uppercase",letterSpacing:"0.15em",
        color: active || hover ? "#FAFAF8" : "rgba(255,255,255,0.5)",
        transition:"color 0.3s",position:"relative",
      }}
    >
      {label}
      {active && (
        <span style={{
          position:"absolute",bottom:"-20px",left:"50%",transform:"translateX(-50%)",
          width:"4px",height:"4px",background:"#FAFAF8",display:"block",
        }}/>
      )}
    </button>
  );
}

Object.assign(window, { Navbar });
