const { useState, useEffect, useRef } = React;

function CtaSection({ onNavigate }) {
  const [hover, setHover] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (window.gsap && window.ScrollTrigger) {
      gsap.fromTo(ref.current.children, 
        { opacity: 0, y: 40 },
        { 
          opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" }
        }
      );
    }
  }, []);

  return (
    <section style={{
      background:"linear-gradient(180deg,#FAFAF8 0%,#F5F5F0 100%)",
      padding:"clamp(100px,10vw,180px) clamp(24px,5vw,120px)",
      textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",
      position:"relative",overflow:"hidden",
    }}>
      <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}>
        <defs>
          <pattern id="cta-grid" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" fill="none" stroke="black" strokeWidth="0.3" strokeOpacity="0.04"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cta-grid)"/>
      </svg>
      <div ref={ref} style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",alignItems:"center"}}>
        <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",fontWeight:500,textTransform:"uppercase",letterSpacing:"0.22em",color:"rgba(0,0,0,0.28)",marginBottom:"28px"}}>Készen állsz a kezdésre?</div>
        <h2 style={{fontFamily:"'Tanker',sans-serif",fontSize:"clamp(2.5rem,6vw,5.5rem)",textTransform:"uppercase",letterSpacing:"0.02em",lineHeight:"0.92",color:"#0D0D0D",marginBottom:"52px",maxWidth:"760px"}}>Kérj személyre szabott ajánlatot.</h2>
        <button onClick={() => onNavigate("contact")} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
            background: hover ? "rgba(13,13,13,0.88)" : "#0D0D0D", color:"#FAFAF8",border:"none",cursor:"none",
            padding:"20px 68px",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:500,textTransform:"uppercase",letterSpacing:"0.2em",
            transform: hover ? "scale(1.03)" : "scale(1)",boxShadow: hover ? "0 16px 48px rgba(0,0,0,0.18)" : "0 4px 20px rgba(0,0,0,0.06)",transition:"all 0.4s cubic-bezier(0.23,1,0.32,1)"
          }}>Ajánlatkérés</button>
      </div>
    </section>
  );
}

function App() {
  const [page, setPage] = useState(() => localStorage.getItem("dronera_en_page") || "home");
  const navigate = (p) => {
    setPage(p);
    localStorage.setItem("dronera_en_page", p);
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    const dot  = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    if(!dot || !ring) return;
    let rx = 0, ry = 0, animId, tx = window.innerWidth/2, ty = window.innerHeight/2;
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      rx = lerp(rx, tx, 0.14); ry = lerp(ry, ty, 0.14);
      ring.style.transform = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`;
      dot.style.transform = `translate(calc(${tx}px - 50%), calc(${ty}px - 50%))`;
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);

    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    const onEnter = () => document.body.classList.add("cursor-hover");
    const onLeave = () => document.body.classList.remove("cursor-hover");

    window.addEventListener("mousemove", onMove, { passive:true });
    const attachListeners = () => {
      document.querySelectorAll("a,button,input,textarea,select,[data-cursor]").forEach(el => { 
        el.removeEventListener("mouseenter", onEnter); el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnter); el.addEventListener("mouseleave", onLeave); 
      });
    };
    attachListeners();
    const mo = new MutationObserver(() => attachListeners());
    const root = document.getElementById("root");
    if(root) mo.observe(root, { subtree:true, childList:true });

    return () => { cancelAnimationFrame(animId); window.removeEventListener("mousemove", onMove); mo.disconnect(); };
  }, []);

  const isService = ["energy","agriculture","geodesy"].includes(page);
  return (
    <>
      <Navbar currentPage={page} onNavigate={navigate}/>
      <main>
        {page === "home" && (<><Hero onNavigate={navigate}/><ServicesSection onNavigate={navigate}/><CtaSection onNavigate={navigate}/></>)}
        {isService && <ServicePage pageId={page} onNavigate={navigate}/>}
        {page === "contact" && <ContactPage/>}
      </main>
      <Footer onNavigate={navigate}/>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
