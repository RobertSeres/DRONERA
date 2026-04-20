// DRONERA — Footer (Hungarian)

const { useEffect: useFooterEffect, useRef: useFooterRef } = React;

function Footer({ onNavigate }) {
  const footerRef = useFooterRef(null);
  const links = [
    { id:"energy",       label:"Energetika" },
    { id:"agriculture",  label:"Mezőgazdaság" },
    { id:"geodesy",      label:"Geodézia" },
    { id:"contact",      label:"Kapcsolat" },
  ];

  useFooterEffect(() => {
    if(window.gsap && window.ScrollTrigger && footerRef.current) {
      gsap.fromTo(footerRef.current.querySelectorAll(".footer-col"),
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 90%" }
        }
      );
    }
  }, []);

  return (
    <footer ref={footerRef} style={{
      background:"#000",color:"#FAFAF8",
      padding:"clamp(80px,8vw,140px) clamp(24px,5vw,120px) 56px",
      position:"relative", overflow:"hidden"
    }}>
      {/* Top gradient border */}
      <div style={{
        position:"absolute",top:0,left:0,right:0,height:"1px",
        background:"linear-gradient(to right, transparent, rgba(255,255,255,0.22), transparent)",
      }}/>

      <div className="footer-grid" style={{
        display:"grid",gridTemplateColumns:"1.4fr 1fr 1fr",
        gap:"clamp(40px,5vw,80px)",maxWidth:"1200px",marginBottom:"64px",
      }}>
        {/* Brand */}
        <div className="footer-col">
          <button onClick={() => onNavigate("home")} style={{
            fontFamily:"'Tanker',sans-serif",fontSize:"28px",
            textTransform:"uppercase",letterSpacing:"0.15em",color:"#FAFAF8",
            background:"none",border:"none",cursor:"pointer",padding:0,
          }}>DRONERA</button>
          <p style={{
            marginTop:"20px",color:"rgba(255,255,255,0.32)",
            fontSize:"13px",fontWeight:300,lineHeight:1.85,maxWidth:"280px",
            fontFamily:"'DM Sans',sans-serif",
          }}>
            Prémium ipari drón szolgáltatások — energetika, mezőgazdaság, geodézia.
          </p>
          <p style={{
            marginTop:"24px",fontFamily:"monospace",fontSize:"11px",
            color:"rgba(255,255,255,0.2)",letterSpacing:"0.06em",
          }}>N 47.4979° E 19.0402°</p>
        </div>

        {/* Navigation */}
        <div className="footer-col">
          <div style={{
            fontFamily:"'DM Sans',sans-serif",fontSize:"10px",fontWeight:500,
            textTransform:"uppercase",letterSpacing:"0.22em",color:"rgba(255,255,255,0.28)",
            marginBottom:"28px",
          }}>Navigáció</div>
          <button onClick={() => onNavigate("home")} style={footerLinkStyle}>Kezdőlap</button>
          {links.map(l => (
            <button key={l.id} onClick={() => onNavigate(l.id)} style={footerLinkStyle}>{l.label}</button>
          ))}
        </div>

        {/* Contact */}
        <div className="footer-col">
          <div style={{
            fontFamily:"'DM Sans',sans-serif",fontSize:"10px",fontWeight:500,
            textTransform:"uppercase",letterSpacing:"0.22em",color:"rgba(255,255,255,0.28)",
            marginBottom:"28px",
          }}>Kapcsolat</div>
          <p style={{...footerLinkStyle, cursor:"default"}}>info@dronera.hu</p>
          <p style={{...footerLinkStyle, cursor:"default"}}>+36 1 234 5678</p>
          <p style={{...footerLinkStyle, cursor:"default"}}>Budapest, Magyarország</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-col" style={{
        paddingTop:"28px",
        borderTop:"1px solid rgba(255,255,255,0.06)",
        display:"flex",justifyContent:"space-between",alignItems:"center",
        fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:"rgba(255,255,255,0.18)",
        flexWrap:"wrap",gap:"12px",
      }}>
        <span>© 2026 DRONERA. Minden jog fenntartva.</span>
        <span style={{fontFamily:"monospace",fontSize:"10px",letterSpacing:"0.08em"}}>
          az új korszak
        </span>
      </div>
    </footer>
  );
}

const footerLinkStyle = {
  display:"block",marginBottom:"14px",fontFamily:"'DM Sans',sans-serif",
  fontSize:"13px",fontWeight:300,color:"rgba(255,255,255,0.48)",
  background:"none",border:"none",cursor:"pointer",padding:0,textAlign:"left",
  transition:"color 0.3s",
};

Object.assign(window, { Footer });
