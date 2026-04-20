// DRONERA — Service Page (Hungarian, Premium GSAP)

const { useState: useSPState, useEffect: useSPEffect, useRef: useSPRef } = React;

const SERVICE_DATA = {
  energy: {
    accentColor: "#ED6D40",
    heroTitle: "ENERGETIKA",
    heroSubtitle: "Légi inspekció. Termográfia. Precizitás.",
    introLeft: "Napelem, szél & hálózati rendszerek — fentről felügyelve.",
    introRight: "Az energiaszektor folyamatos felügyeletet igényel. A DRONERA termográfiai és vizuális inspekciós szolgáltatásai lehetővé teszik az állványozás, leállás és kockázat nélküli korai hibafelismerést, a karbantartási költségek optimalizálását és a rendszer maximális hatékonyságát.",
    services: [
      {
        title: "Napelempark Inspekció",
        description: "Nagyfelbontású termográfiai felvételek a hotspotok és panelek hibáinak azonosítására. Több száz hektár felmérése napok helyett órák alatt.",
      },
      {
        title: "Szélturbina Felmérés",
        description: "A rotorlapátok, gondolák és tornyok közeli vizuális vizsgálata — állványozás nélkül. Repedések, erózió és szerkezeti anomáliák teljes dokumentációja.",
      },
      {
        title: "Hálózat Monitoring",
        description: "Nagy- és középfeszültségű vezetékek, oszlopok és szerelvények állapotfelmérése. Növényzet monitorozás és a beavatkozás tervezése.",
      },
    ],
    timeline: ["Konzultáció", "Küldetéstervezés", "Repülés", "Adatelemzés", "Riport Átadás"],
    techTitle: "Felszerelés & Szenzorok",
    techItems: [
      { name: "Hőkamera", detail: "Radiometrikus infravörös kamera ±0.05°C pontossággal és automatizált hőtérkép-generálással." },
      { name: "42 MP RGB", detail: "Nagyfelbontású vizuális szenzor a felületi hibák részletes dokumentálására." },
      { name: "DJI Matrice 350 RTK", detail: "Ipari drón platform RTK pozicionálással és kiterjesztett repülési idővel." },
      { name: "AI Hibafelismerés", detail: "Gépi tanuláson alapuló anomália-felismerés, amely minden rögzített képkockán lefut." },
    ],
  },
  agriculture: {
    accentColor: "#91B422",
    heroTitle: "MEZŐGAZDASÁG",
    heroSubtitle: "NDVI Analízis. Precíziós Monitoring. Kárfelmérés.",
    introLeft: "Területtérképezés, vegetációs elemzés és kárfelmérés — drónnal.",
    introRight: "A precíziós mezőgazdaság a jövő. A DRONERA multispektrális és RGB drónfelvételei valós idejű adatokat szolgáltatnak: NDVI-alapú növényegészségügyi elemzés, biztosítási szintű károk dokumentálása és differenciált kijuttatási térképek.",
    services: [
      {
        title: "NDVI Analízis",
        description: "Multispektrális vegetációs intextérképek a termés egészségének vizualizálására és a kezelési zónák lehatárolására — a repüléstől számított 24 órán belül.",
      },
      {
        title: "Kárfelmérés",
        description: "Jégeső, aszály, belvíz és egyéb mezőgazdasági káresemények georeferált dokumentációja biztosítási és jogi célokra.",
      },
      {
        title: "Precíziós Kijuttatás",
        description: "Változó dózisú agrokémiai kijuttatás a zónaspecifikus előírási térképek alapján, csökkentett vegyszerhasználattal és maximális fedettséggel.",
      },
    ],
    timeline: ["Konzultáció", "Területfelmérés", "Repülés", "Adatfeldolgozás", "Riport Átadás"],
    techTitle: "Felszerelés",
    techItems: [
      { name: "Multispektrális Szenzor", detail: "5-sávos multispektrális kamera NDVI, NDRE és egyéb vegetációs indexek számításához." },
      { name: "Permetező Drón", detail: "30 literes mezőgazdasági drón változó dózisú adagolással és automatikus sávkezeléssel." },
      { name: "RTK GPS", detail: "Centiméteres pozicionálási pontosság a teljesen georeferált eredményekért." },
      { name: "Automatizált Feldolgozás", detail: "Felhőalapú adatfeldolgozás és zónatérkép-generálás 24 órán belül." },
    ],
  },
  geodesy: {
    accentColor: "#4682B4",
    heroTitle: "GEODÉZIA",
    heroSubtitle: "Fotogrammetria. 3D Modellezés. Pontfelhő.",
    introLeft: "Centiméter-pontos felmérések — egyedi épületektől a teljes létesítményekig.",
    introRight: "A DRONERA geodéziai szolgáltatásai ötvözik a fotogrammetriai feldolgozást, a LiDAR technológiát és az RTK-alapú pontosságot, hogy kiszolgálják a legszigorúbb építési, tervezési és kataszteri munkafolyamatokat.",
    services: [
      {
        title: "Fotogrammetriai Felmérés",
        description: "Nagyfelbontású légifotók feldolgozása ortofotókká, digitális domborzatmodellekké (DEM/DSM) és 3D pontfelhőkké, terület- és épületfelmérésekhez.",
      },
      {
        title: "3D Épületmodellezés",
        description: "Épületek, szerkezetek és infrastrukturális elemek teljes, részletes 3D modelljei — felújítási, tervezési és dokumentációs célokra.",
      },
      {
        title: "Kataszteri Felmérés",
        description: "Telekhatár-felmérés, területszámítás és kataszteri térképezés teljes GIS integrációval.",
      },
    ],
    timeline: ["Konzultáció", "Földi Előkészítés", "Repülés", "Feldolgozás", "Átadás"],
    techTitle: "Felszerelés & Szoftver",
    techItems: [
      { name: "LiDAR Szenzor", detail: "Lézerszkenner alapú pontfelhő 100+ pont/m² sűrűséggel, teljes lombkorona áthatolási képességgel." },
      { name: "42 MP RGB Kamera", detail: "Nagyfelbontású felvételek sztereofeldolgozáshoz és ortofotó-generáláshoz." },
      { name: "RTK + Illesztőpontok", detail: "RTK drón földi illesztőpontokkal kombinálva 1–2 cm-es abszolút pontosságért." },
      { name: "Agisoft Metashape", detail: "Iparági standard fotogrammetriai feldolgozás automatizált folyamatokkal." },
    ],
  },
};

function ServicePage({ pageId, onNavigate }) {
  const data = SERVICE_DATA[pageId];
  if (!data) return null;
  const { accentColor: ac, heroTitle, heroSubtitle, introLeft, introRight, services, timeline, techTitle, techItems } = data;

  const [scanY, setScanY] = useSPState(0);
  const containerRef = useSPRef(null);

  useSPEffect(() => {
    let raf;
    const start = performance.now();
    const animate = (now) => {
      const t = ((now - start) / 4000) % 1;
      setScanY(t * 100);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    // GSAP ScrollTrigger
    if (window.gsap && window.ScrollTrigger && containerRef.current) {
        const q = gsap.utils.selector(containerRef);
        // Hero
        gsap.fromTo(q(".sp-hero-title"), { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", stagger: 0.15 });
        // Intro
        gsap.fromTo(q(".sp-intro"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: q(".sp-intro"), start: "top 80%" } });
        // Offering Header
        gsap.fromTo(q(".sp-offering-header"), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: q(".sp-offering-header"), start: "top 85%" } });
        // Services rows
        q(".sp-service-row").forEach(el => {
            gsap.fromTo(el, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } });
        });
        // Timeline
        gsap.fromTo(q(".sp-tl-header"), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: q(".sp-tl-header"), start: "top 85%" } });
        q(".sp-tl-item").forEach(el => {
            gsap.fromTo(el, { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } });
        });
        // Tech
        gsap.fromTo(q(".sp-tech-header"), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: q(".sp-tech-header"), start: "top 85%" } });
        gsap.fromTo(q(".sp-tech-card"), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: q(".sp-tech-card"), start: "top 85%" } });
    }

    return () => cancelAnimationFrame(raf);
  }, [pageId]);

  return (
    <div ref={containerRef}>
      {/* ── Hero ── */}
      <section style={{
        position:"relative",minHeight:"100vh",background:"#000",
        display:"flex",flexDirection:"column",justifyContent:"flex-end",
        padding:"0 clamp(24px,5vw,120px) clamp(60px,5vw,80px)",overflow:"hidden",
      }}>
        {/* Dot grid */}
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}>
          <defs>
            <pattern id="sp-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1" fill="white" fillOpacity="0.04"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sp-dots)"/>
        </svg>

        {/* Scan line */}
        <div style={{
          position:"absolute",left:0,right:0,height:"1px",
          background:`linear-gradient(to right, transparent, ${ac}60, transparent)`,
          top:`${scanY}%`,pointerEvents:"none",transition:"none",
        }}/>

        {/* Corner bracket */}
        <svg style={{position:"absolute",top:"80px",right:"clamp(24px,5vw,80px)",width:"72px",height:"72px",
          opacity:0.15,pointerEvents:"none"}} viewBox="0 0 80 80" fill="none">
          <path d="M80 0H32V16" stroke="white" strokeWidth="1.5"/>
          <path d="M80 0V48" stroke="white" strokeWidth="1.5"/>
        </svg>

        <div style={{position:"relative",zIndex:10,paddingTop:"120px"}}>
          <div className="sp-hero-title" style={{height:"3px",width:"72px",background:ac,marginBottom:"48px", opacity:0}}/>
          <h1 className="sp-hero-title" style={{
            fontFamily:"'Tanker',sans-serif",
            fontSize:"clamp(3.5rem,10vw,9rem)",
            textTransform:"uppercase",letterSpacing:"0.02em",lineHeight:"0.88",color:ac, opacity:0
          }}>{heroTitle}</h1>
          <p className="sp-hero-title" style={{
            fontFamily:"'Tanker',sans-serif",
            fontSize:"clamp(1rem,2.5vw,1.8rem)",
            textTransform:"uppercase",letterSpacing:"0.02em",lineHeight:"1.2",
            color:"rgba(255,255,255,0.45)",marginTop:"28px",maxWidth:"600px", opacity:0
          }}>{heroSubtitle}</p>
        </div>
        <div style={{
          position:"absolute",bottom:"28px",right:"clamp(24px,5vw,120px)",
          fontFamily:"monospace",fontSize:"11px",color:"rgba(255,255,255,0.3)",
        }}>N 47.4979° E 19.0402°</div>
      </section>

      {/* ── Intro ── */}
      <section style={{background:"#020202",padding:"clamp(80px,8vw,160px) clamp(24px,5vw,120px)"}}>
        <div className="sp-intro" style={{
            display:"grid",gridTemplateColumns:"5fr 7fr",gap:"clamp(40px,5vw,100px)",
            alignItems:"start",maxWidth:"1100px", opacity:0
          }}>
          <div>
            <div style={{height:"2px",width:"72px",background:ac,marginBottom:"48px"}}/>
            <h2 style={{
              fontFamily:"'Tanker',sans-serif",fontSize:"clamp(2rem,4vw,3.5rem)",
              textTransform:"uppercase",letterSpacing:"0.02em",lineHeight:"1.05",color:"#FAFAF8",
            }}>{introLeft}</h2>
          </div>
          <div style={{paddingTop:"16px"}}>
            <p style={{
              fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(15px,1.4vw,19px)",
              fontWeight:300,lineHeight:1.9,color:"rgba(255,255,255,0.46)",
            }}>{introRight}</p>
          </div>
        </div>
      </section>

      {/* ── Services list ── */}
      <section style={{background:"#060608",padding:"clamp(80px,8vw,160px) clamp(24px,5vw,120px)"}}>
        <div style={{maxWidth:"1000px"}}>
          <div className="sp-offering-header" style={{marginBottom:"clamp(56px,6vw,100px)", opacity:0}}>
            <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"36px"}}>
              <div style={{height:"2px",width:"52px",background:ac}}/>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",fontWeight:500,
                textTransform:"uppercase",letterSpacing:"0.22em",color:"rgba(255,255,255,0.3)"}}>
                Kínálatunk
              </span>
            </div>
            <div style={{fontFamily:"'Tanker',sans-serif",fontSize:"clamp(2.5rem,5.5vw,5rem)",
              textTransform:"uppercase",lineHeight:"0.9",color:"#FAFAF8"}}>
              Ezzel tudunk <span style={{color:ac}}>segíteni.</span>
            </div>
          </div>
          {services.map(c => (
            <ServiceRow key={c.title} item={c} accentColor={ac}/>
          ))}
        </div>
      </section>

      {/* ── Timeline ── */}
      <section style={{
        background:"linear-gradient(180deg,#FAFAF8 0%,#F5F5F0 100%)",
        padding:"clamp(80px,8vw,160px) clamp(24px,5vw,120px)",
      }}>
        <div style={{maxWidth:"1000px"}}>
          <div className="sp-tl-header" style={{opacity:0}}>
              <div style={{height:"2px",width:"72px",background:ac,marginBottom:"48px"}}/>
              <h2 style={{
                fontFamily:"'Tanker',sans-serif",fontSize:"clamp(2rem,5vw,4rem)",
                textTransform:"uppercase",lineHeight:"0.9",color:"#0D0D0D",marginBottom:"16px",
              }}>Folyamat</h2>
              <p style={{fontFamily:"'DM Sans',sans-serif",fontWeight:300,fontSize:"16px",
                color:"rgba(0,0,0,0.4)",lineHeight:1.7,marginBottom:"60px",maxWidth:"520px"}}>
                A konzultációtól a kivitelezésig – elhivatott szakértelem, hatékony végrehajtás.
              </p>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"0"}}>
            {timeline.map((step, i) => (
              <div key={i} className="sp-tl-item" style={{
                display:"flex",alignItems:"baseline",gap:"28px",padding:"18px 0",
                borderBottom:"1px solid rgba(0,0,0,0.07)", opacity:0
              }}>
                <span style={{fontFamily:"'Tanker',sans-serif",fontSize:"clamp(24px,3vw,38px)",
                  color:ac,flexShrink:0,lineHeight:1}}>{String(i+1).padStart(2,"0")}.</span>
                <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(16px,1.5vw,20px)",
                  fontWeight:300,color:"rgba(0,0,0,0.7)"}}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech ── */}
      <section style={{background:"#040405",borderTop:"1px solid rgba(255,255,255,0.04)",
        padding:"clamp(80px,8vw,160px) clamp(24px,5vw,120px)"}}>
        <div>
          <div className="sp-tech-header" style={{opacity: 0, marginBottom:"36px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"36px"}}>
              <div style={{height:"2px",width:"52px",background:ac}}/>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",fontWeight:500,
                textTransform:"uppercase",letterSpacing:"0.22em",color:"rgba(255,255,255,0.3)"}}>Felszerelés</span>
            </div>
            <h2 style={{fontFamily:"'Tanker',sans-serif",fontSize:"clamp(2.5rem,5.5vw,5rem)",
              textTransform:"uppercase",lineHeight:"0.9",color:"#FAFAF8",marginBottom:"64px"}}>{techTitle}</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"24px"}}>
            {techItems.map(item => (
              <div key={item.name} className="sp-tech-card" style={{
                borderLeft:`2px solid ${ac}`,
                padding:"clamp(24px,2.5vw,40px) clamp(28px,3vw,48px)",
                background:"linear-gradient(135deg,rgba(255,255,255,0.03) 0%,transparent 100%)",
                opacity: 0
              }}>
                <h3 style={{fontFamily:"'Tanker',sans-serif",fontSize:"clamp(18px,2vw,26px)",
                  textTransform:"uppercase",color:"#FAFAF8",marginBottom:"12px"}}>{item.name}</h3>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"14px",fontWeight:300,
                  lineHeight:1.85,color:"rgba(255,255,255,0.42)"}}>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CtaBanner accentColor={ac} onNavigate={onNavigate}/>
    </div>
  );
}

function ServiceRow({ item, accentColor }) {
  const [hov, setHov] = useSPState(false);
  return (
    <div
      className="sp-service-row"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:"flex",gap:"clamp(28px,4vw,80px)",alignItems:"flex-start",
        padding:"clamp(28px,3vw,48px) 0 clamp(28px,3vw,48px) clamp(16px,2vw,32px)",
        borderBottom:"1px solid rgba(255,255,255,0.04)",
        borderLeft:`2px solid ${hov ? accentColor : "transparent"}`,
        transition:"border-color 0.4s cubic-bezier(0.22,1,0.36,1)",
        opacity: 0
      }}
    >
      <div style={{width:"clamp(140px,22%,260px)",flexShrink:0,paddingLeft:"16px"}}>
        <span style={{fontFamily:"'Tanker',sans-serif",fontSize:"clamp(18px,2.5vw,30px)",
          textTransform:"uppercase",color:accentColor,lineHeight:"1.1"}}>{item.title}</span>
      </div>
      <div style={{flex:1}}>
        <div style={{height:"1px",width:"36px",background:"rgba(255,255,255,0.07)",marginBottom:"16px"}}/>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(14px,1.2vw,17px)",
          fontWeight:300,lineHeight:1.85,color:"rgba(255,255,255,0.46)"}}>{item.description}</p>
      </div>
    </div>
  );
}

function CtaBanner({ accentColor, onNavigate }) {
  const [btnHov, setBtnHov] = useSPState(false);
  const ref = useSPRef(null);
  
  useSPEffect(() => {
    if(window.gsap && window.ScrollTrigger && ref.current) {
        gsap.fromTo(ref.current.children, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 80%" } });
    }
  }, []);

  return (
    <section ref={ref} style={{
      background:"linear-gradient(180deg,#FAFAF8 0%,#F5F5F0 100%)",
      padding:"clamp(80px,8vw,140px) clamp(24px,5vw,120px)",
      textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",
    }}>
      <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",fontWeight:500,
        textTransform:"uppercase",letterSpacing:"0.22em",color:"rgba(0,0,0,0.28)",marginBottom:"28px", opacity:0}}>
        Következő Lépés
      </div>
      <h2 style={{
        fontFamily:"'Tanker',sans-serif",fontSize:"clamp(2rem,5vw,4.5rem)",
        textTransform:"uppercase",lineHeight:"0.92",color:"#0D0D0D",
        marginBottom:"48px",maxWidth:"720px", opacity:0
      }}>
        Kérj személyre szabott ajánlatot.
      </h2>
      <button
        onClick={() => onNavigate("contact")}
        onMouseEnter={() => setBtnHov(true)}
        onMouseLeave={() => setBtnHov(false)}
        style={{
          background: btnHov ? accentColor : "#0D0D0D",
          color:"#FAFAF8",border:"none",cursor:"pointer",
          padding:"20px 60px",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:500,
          textTransform:"uppercase",letterSpacing:"0.2em", opacity:0,
          transition:"background 0.4s cubic-bezier(0.23,1,0.32,1), transform 0.3s",
          transform: btnHov ? "scale(1.03)" : "scale(1)",
          boxShadow: btnHov ? "0 16px 48px rgba(0,0,0,0.15)" : "none",
        }}>
        Kérj ajánlatot
      </button>
    </section>
  );
}

Object.assign(window, { ServicePage, CtaBanner });
