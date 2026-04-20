// DRONERA — Services Section + Marquee (Hungarian, Premium)

const { useState: useSvcState, useEffect: useSvcEffect, useRef: useSvcRef } = React;

const SERVICES = [
  {
    id: "energy", num: "01", title: "ENERGETIKA", color: "#ED6D40",
    icon: (c) => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
    description: "Napelem parkok, szélerőmű-parkok, villamos vezetékhálózatok légi inspekciója és thermográfiai felmérése.",
    tags: ["Thermográfia", "Inspekció", "Monitoring"],
  },
  {
    id: "agriculture", num: "02", title: "MEZŐGAZDASÁG", color: "#91B422",
    icon: (c) => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a9 9 0 0 1 9 9c0 5-9 13-9 13S3 16 3 11a9 9 0 0 1 9-9z"/>
        <circle cx="12" cy="11" r="3"/>
      </svg>
    ),
    description: "Precíziós növénytermesztés támogatása, NDVI-analízis, területtérkép készítés, kárfelmérés és növényvédő-szer kijuttatás.",
    tags: ["NDVI", "Precíziós", "Kárfelmérés"],
  },
  {
    id: "geodesy", num: "03", title: "GEODÉZIA", color: "#4682B4",
    icon: (c) => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 20 9 4 15 14 19 9 21 20"/>
      </svg>
    ),
    description: "Fotogrammetriás felmérés, 3D modellezés, pontfelhő generálás, területi és épületfelmérések centiméteres pontossággal.",
    tags: ["3D Modell", "Pontfelhő", "LiDAR"],
  },
];

function ServiceCard({ service, onNavigate, index }) {
  const [hovered, setHovered] = useSvcState(false);
  const { id, num, title, color, icon, description, tags } = service;

  return (
    <div
      className="svc-card"
      onClick={() => onNavigate(id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:"relative",
        background: hovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        border:"1px solid rgba(255,255,255,0.05)",
        borderTop: hovered ? `3px solid ${color}` : "3px solid transparent",
        padding:"clamp(32px,3.5vw,52px)",
        minHeight:"460px",
        display:"flex",flexDirection:"column",justifyContent:"space-between",
        cursor:"pointer",
        transition:"all 0.6s cubic-bezier(0.23,1,0.32,1)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        opacity: 0,
        boxShadow: hovered ? "0 24px 60px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <span style={{
        position:"absolute",top:"20px",right:"24px",
        fontFamily:"'Tanker',sans-serif",fontSize:"7rem",lineHeight:1,
        color, opacity: hovered ? 0.13 : 0.04,
        pointerEvents:"none",userSelect:"none",
        transition:"opacity 0.6s",
      }}>{num}</span>

      <div style={{
        width:"52px",height:"52px",display:"flex",alignItems:"center",justifyContent:"center",
        borderRadius:"12px",marginBottom:"36px",
        background: hovered ? `${color}18` : "rgba(255,255,255,0.03)",
        transition:"background 0.4s",
      }}>
        {icon(hovered ? color : "rgba(255,255,255,0.4)")}
      </div>

      <div style={{flex:1,display:"flex",flexDirection:"column"}}>
        <h3 style={{
          fontFamily:"'Tanker',sans-serif",fontSize:"clamp(22px,2.8vw,34px)",
          textTransform:"uppercase",letterSpacing:"0.02em",lineHeight:"0.9",
          color:"#FAFAF8",marginBottom:"20px",
        }}>{title}</h3>
        <p style={{
          color:"rgba(255,255,255,0.42)",fontSize:"14px",fontWeight:300,
          lineHeight:1.85,marginBottom:"28px",flex:1,
          fontFamily:"'DM Sans',sans-serif",
        }}>{description}</p>

        <div style={{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"28px"}}>
          {tags.map(t => (
            <span key={t} style={{
              padding:"5px 12px",fontSize:"10px",fontWeight:500,
              textTransform:"uppercase",letterSpacing:"0.15em",
              border:`1px solid ${hovered ? color+"35" : "rgba(255,255,255,0.07)"}`,
              color: hovered ? color : "rgba(255,255,255,0.35)",
              fontFamily:"'DM Sans',sans-serif",
              transition:"all 0.4s",
            }}>{t}</span>
          ))}
        </div>

        <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
          <span style={{
            fontFamily:"'DM Sans',sans-serif",fontSize:"10px",fontWeight:500,
            textTransform:"uppercase",letterSpacing:"0.15em",
            color: hovered ? color : "rgba(255,255,255,0.3)",
            transition:"color 0.3s",
          }}>Részletek</span>
          <div style={{
            height:"1px",
            background: hovered ? color : "rgba(255,255,255,0.12)",
            width: hovered ? "52px" : "32px",
            transition:"all 0.5s",
          }}/>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke={hovered ? color : "rgba(255,255,255,0.2)"} strokeWidth="1.5"
            style={{transform: hovered ? "translateX(4px)" : "translateX(0)", transition:"transform 0.4s"}}>
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ text }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:"20px",marginBottom:"36px"}}>
      <div style={{height:"1px",width:"48px",background:"rgba(255,255,255,0.2)"}}/>
      <span style={{
        fontFamily:"'DM Sans',sans-serif",fontSize:"10px",fontWeight:500,
        textTransform:"uppercase",letterSpacing:"0.22em",color:"rgba(255,255,255,0.3)",
      }}>{text}</span>
    </div>
  );
}

function ServicesSection({ onNavigate }) {
  const containerRef = useSvcRef(null);
  const marqueeText = "ENERGETIKA · MEZŐGAZDASÁG · GEODÉZIA · PRECIZITÁS · MEGBÍZHATÓSÁG · INNOVÁCIÓ · ";

  useSvcEffect(() => {
    if(window.gsap && window.ScrollTrigger && containerRef.current) {
        gsap.fromTo(containerRef.current.querySelector(".svc-header"),
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
        );
        gsap.fromTo(containerRef.current.querySelectorAll(".svc-card"),
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: containerRef.current, start: "top 70%" } }
        );
    }
  }, []);

  return (
    <>
      <section id="services-section" ref={containerRef} style={{
        background:"#050507",
        padding:"clamp(100px,10vw,180px) clamp(24px,5vw,120px)",
      }}>
        <div className="svc-header" style={{
            maxWidth:"900px",marginBottom:"clamp(80px,8vw,130px)", opacity: 0
          }}>
          <SectionLabel text="Szektorspecifikus Szolgáltatások"/>
          <div style={{
            fontFamily:"'Tanker',sans-serif",fontSize:"clamp(2.5rem,6vw,5.5rem)",
            textTransform:"uppercase",letterSpacing:"0.02em",lineHeight:"0.9",color:"#FAFAF8",
          }}>Három szektor.</div>
          <div style={{
            fontFamily:"'Tanker',sans-serif",fontSize:"clamp(2.5rem,6vw,5.5rem)",
            textTransform:"uppercase",letterSpacing:"0.02em",lineHeight:"0.9",color:"rgba(255,255,255,0.28)",
          }}>Egy megoldás.</div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"24px"}}>
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} service={s} onNavigate={onNavigate} index={i}/>
          ))}
        </div>
      </section>

      {/* Marquee */}
      <section style={{
        background:"#030304",overflow:"hidden",
        borderTop:"1px solid rgba(255,255,255,0.04)",
        borderBottom:"1px solid rgba(255,255,255,0.04)",
        padding:"72px 0",
      }}>
        <div style={{display:"flex",width:"max-content",animation:"marquee 55s linear infinite"}}>
          {[1,2,3,4].map(i => (
            <span key={i} style={{
              fontFamily:"'Tanker',sans-serif",whiteSpace:"nowrap",
              fontSize:"clamp(1.8rem,3vw,2.8rem)",textTransform:"uppercase",
              letterSpacing:"0.02em",color:"rgba(255,255,255,0.055)",
            }}>{marqueeText}</span>
          ))}
        </div>
      </section>
    </>
  );
}

Object.assign(window, { ServicesSection, SERVICES, SectionLabel });
