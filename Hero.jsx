// DRONERA — Hero Component (Hungarian, Premium)

const { useEffect: useHeroEffect, useRef: useHeroRef, useState: useHeroState } = React;

function CountUp({ target, suffix = "" }) {
  const [val, setVal] = useHeroState(0);
  const ref = useHeroRef(null);
  
  useHeroEffect(() => {
    if (window.gsap && window.ScrollTrigger && ref.current) {
        gsap.to({ value: 0 }, {
            value: target,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ref.current,
                start: "top 90%",
            },
            onUpdate: function() {
                setVal(Math.round(this.targets()[0].value));
            }
        });
    } else {
        setVal(target);
    }
  }, [target]);
  
  return <span ref={ref}>{val}{suffix}</span>;
}

function Hero({ onNavigate }) {
  const bgRef = useHeroRef(null);
  const containerRef = useHeroRef(null);
  const [ctaHover, setCtaHover] = useHeroState(false);

  useHeroEffect(() => {
    if (!window.gsap) return;
    
    // Initial Reveal animation
    const tl = gsap.timeline();
    tl.fromTo(bgRef.current, { scale: 1.15, filter: "brightness(0.3)" }, { scale: 1.08, filter: "brightness(1)", duration: 2.2, ease: "power3.out" }, 0);
    
    const q = gsap.utils.selector(containerRef);
    tl.fromTo(q(".hero-stat"), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }, 0.4);
    tl.fromTo(q(".hero-title"), { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", stagger: 0.15 }, 0.6);
    tl.fromTo(q(".hero-cta"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 1.2);
    
    // Parallax
    gsap.to(bgRef.current, {
      yPercent: 35,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }, []);

  return (
    <section ref={containerRef} style={{
      position:"relative",height:"100vh",overflow:"hidden",
      display:"flex",flexDirection:"column",justifyContent:"center",
    }}>
      {/* Background */}
      <div ref={bgRef} style={{
        position:"absolute",inset:"-40px",
        backgroundImage:"url('assets/dronehero.webp')",
        backgroundSize:"cover",backgroundPosition:"center center",
        transform:"scale(1.08)",willChange:"transform",
      }}/>

      {/* Overlays */}
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.65) 55%,rgba(0,0,0,0.3) 100%)"}}/>
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.5) 0%,transparent 55%)"}}/>

      {/* Dot grid */}
      <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}>
        <defs>
          <pattern id="hero-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.8" fill="white" fillOpacity="0.06"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots)"/>
      </svg>

      {/* Diagonal accent line */}
      <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",opacity:0.12}}>
        <line x1="100%" y1="0" x2="60%" y2="100%" stroke="white" strokeWidth="0.5" strokeDasharray="4 8"/>
      </svg>

      {/* Content */}
      <div style={{
        position:"relative",zIndex:10,
        padding:"0 clamp(24px,5vw,120px)",
      }}>
        {/* Stats row */}
        <div style={{display:"flex",gap:"clamp(28px,4vw,64px)",marginBottom:"clamp(48px,5vw,80px)"}}>
          {[
            { v:127, s:"", l:"Repülési óra" },
            { v:3,   s:"", l:"Szektor" },
            { v:100, s:"%",l:"Pontosság" },
          ].map(({ v, s, l }) => (
            <div key={l} className="hero-stat" style={{opacity:0}}>
              <span style={{
                fontFamily:"'Tanker',sans-serif",fontSize:"clamp(2.8rem,5.5vw,5rem)",
                textTransform:"uppercase",lineHeight:1,color:"#FAFAF8",display:"block",
              }}>
                <CountUp target={v} suffix={s}/>
              </span>
              <p style={{
                fontFamily:"'DM Sans',sans-serif",fontSize:"10px",fontWeight:500,
                textTransform:"uppercase",letterSpacing:"0.25em",
                color:"rgba(255,255,255,0.3)",marginTop:"10px",
              }}>{l}</p>
            </div>
          ))}
        </div>

        {/* Headline */}
        <div style={{overflow:"hidden"}}>
          <span className="hero-title" style={{
            fontFamily:"'Tanker',sans-serif",
            fontSize:"clamp(4.5rem,13vw,11rem)",
            textTransform:"uppercase",letterSpacing:"0.01em",lineHeight:0.85,
            color:"#FAFAF8",display:"block", opacity:0
          }}>DRONERA</span>
        </div>
        <div style={{overflow:"hidden"}}>
          <span className="hero-title" style={{
            fontFamily:"'Tanker',sans-serif",
            fontSize:"clamp(2rem,5.5vw,4.8rem)",
            textTransform:"lowercase",letterSpacing:"0.02em",lineHeight:0.9,
            color:"rgba(250,250,248,0.3)",display:"block",marginTop:"6px", opacity:0
          }}>The new era</span>
        </div>

        {/* Sector tag */}
        <p className="hero-title" style={{
          fontFamily:"'DM Sans',sans-serif",fontSize:"10px",fontWeight:500,
          textTransform:"uppercase",letterSpacing:"0.28em",
          color:"rgba(255,255,255,0.32)",marginTop:"36px", opacity:0
        }}>Energetika · Mezőgazdaság · Geodézia</p>

        {/* CTA */}
        <button
          className="hero-cta"
          style={{
            display:"inline-flex",alignItems:"center",gap:"16px",
            marginTop:"48px",padding:"18px 52px",
            fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:500,
            textTransform:"uppercase",letterSpacing:"0.2em",
            color: ctaHover ? "#0D0D0D" : "#FAFAF8",
            background: ctaHover ? "#FAFAF8" : "transparent",
            border:"1px solid rgba(255,255,255,0.6)",
            cursor:"pointer", opacity:0,
            transition:"background 0.35s cubic-bezier(0.23,1,0.32,1), color 0.35s cubic-bezier(0.23,1,0.32,1)",
          }}
          onMouseEnter={() => setCtaHover(true)}
          onMouseLeave={() => setCtaHover(false)}
          onClick={() => {
            const el = document.getElementById("services-section");
            if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
          }}
        >
          Szolgáltatások megtekintése
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.5">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>

      {/* Bottom labels */}
      <div className="hero-cta" style={{
        position:"absolute",bottom:"32px",left:"clamp(24px,5vw,120px)",zIndex:10,
        fontFamily:"'DM Sans',sans-serif",fontSize:"10px",fontWeight:500,
        textTransform:"uppercase",letterSpacing:"0.3em",color:"rgba(255,255,255,0.2)", opacity: 0
      }}>GÖRGESS ↓</div>
      <div className="hero-cta" style={{
        position:"absolute",bottom:"32px",right:"clamp(24px,5vw,120px)",zIndex:10,
        fontFamily:"monospace",fontSize:"11px",color:"rgba(255,255,255,0.28)",letterSpacing:"0.05em", opacity: 0
      }}>N 47.4979° E 19.0402°</div>
    </section>
  );
}

Object.assign(window, { Hero, CountUp });
