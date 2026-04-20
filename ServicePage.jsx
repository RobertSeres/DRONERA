// DRONERA — Service Page (English, Premium)

const { useState: useSPState, useEffect: useSPEffect, useRef: useSPRef } = React;

const SERVICE_DATA = {
  energy: {
    accentColor: "#ED6D40",
    heroTitle: "ENERGY",
    heroSubtitle: "Aerial Inspection. Thermography. Precision.",
    introLeft: "Solar, wind & grid networks — monitored from above.",
    introRight: "The energy sector demands continuous oversight. DRONERA's thermographic and visual inspection services enable early fault detection, maintenance cost optimization, and maximum system efficiency — without scaffolding, downtime, or risk.",
    services: [
      {
        title: "Solar Farm Inspection",
        description: "High-resolution thermographic imaging for hotspot detection and panel fault identification. Covering hundreds of hectares in hours rather than days.",
      },
      {
        title: "Wind Turbine Survey",
        description: "Close-range visual inspection of rotor blades, nacelles, and towers — no scaffolding required. Full documentation of cracks, erosion, and structural anomalies.",
      },
      {
        title: "Power Line Monitoring",
        description: "Condition assessment of high- and medium-voltage lines, poles, and fittings. Vegetation zone monitoring and intervention planning.",
      },
    ],
    timeline: ["Consultation", "Mission Planning", "Flight Operations", "Data Analysis", "Report Delivery"],
    techTitle: "Equipment & Sensors",
    techItems: [
      { name: "Thermal Camera", detail: "Radiometric infrared camera with ±0.05°C accuracy and automated heat-map generation." },
      { name: "42 MP RGB", detail: "High-resolution visual sensor for detailed surface defect documentation." },
      { name: "DJI Matrice 350 RTK", detail: "Industrial drone platform with RTK positioning and extended flight endurance." },
      { name: "AI Fault Detection", detail: "Machine-learning anomaly recognition applied automatically across all captured frames." },
    ],
  },
  agriculture: {
    accentColor: "#91B422",
    heroTitle: "AGRICULTURE",
    heroSubtitle: "NDVI Analysis. Precision Monitoring. Damage Assessment.",
    introLeft: "Field mapping, vegetation analysis and damage surveys — by drone.",
    introRight: "Precision agriculture is the future of farming. DRONERA's multispectral and RGB drone imagery delivers real-time data to growers: NDVI-based crop health analysis, insurance-grade damage documentation, and variable-rate application maps.",
    services: [
      {
        title: "NDVI Analysis",
        description: "Multispectral vegetation index maps for crop health visualization and treatment zone delineation — delivered within 24 hours of flight.",
      },
      {
        title: "Damage Assessment",
        description: "Georeferenced documentation of hail, drought, flood and other agricultural damage events for insurance and legal purposes.",
      },
      {
        title: "Precision Spraying",
        description: "Variable-rate agrochemical application with reduced chemical use and maximum coverage, following zone-specific prescription maps.",
      },
    ],
    timeline: ["Consultation", "Site Survey", "Flight Operations", "Processing", "Report Delivery"],
    techTitle: "Equipment",
    techItems: [
      { name: "Multispectral Sensor", detail: "5-band multispectral camera for NDVI, NDRE and other vegetation index calculations." },
      { name: "Sprayer Drone", detail: "30L agricultural drone with variable-rate dosing and automated lane management." },
      { name: "RTK GPS", detail: "Centimeter-level positioning accuracy for fully georeferenced outputs." },
      { name: "Automated Processing", detail: "Cloud-based data processing and zone map generation within 24 hours." },
    ],
  },
  geodesy: {
    accentColor: "#4682B4",
    heroTitle: "GEODESY",
    heroSubtitle: "Photogrammetry. 3D Modeling. Point Cloud.",
    introLeft: "Centimeter-accurate surveys — from single buildings to entire sites.",
    introRight: "DRONERA's geodetic services combine photogrammetric processing, LiDAR technology, and RTK-based accuracy to deliver the data demanded by the most rigorous construction, planning, and cadastral workflows.",
    services: [
      {
        title: "Photogrammetric Survey",
        description: "High-resolution aerial photos processed into orthophotos, digital elevation models (DEM/DSM) and 3D point clouds for site and building surveys.",
      },
      {
        title: "3D Building Modeling",
        description: "Complete, detailed 3D models of buildings, structures, and infrastructure elements — for renovation, design, and documentation purposes.",
      },
      {
        title: "Cadastral Survey",
        description: "Parcel boundary surveys, area calculations, and cadastral documentation with full GIS integration.",
      },
    ],
    timeline: ["Consultation", "Ground Preparation", "Flight Operations", "Processing", "Delivery"],
    techTitle: "Equipment & Software",
    techItems: [
      { name: "LiDAR Sensor", detail: "Laser scanner-based point cloud at 100+ pts/m², with full canopy penetration capability." },
      { name: "42 MP RGB Camera", detail: "High-resolution imagery for stereo processing and orthophoto generation." },
      { name: "RTK + GCP", detail: "RTK drone combined with ground control points for 1–2 cm absolute accuracy." },
      { name: "Agisoft Metashape", detail: "Industry-standard photogrammetric processing with automated workflow pipelines." },
    ],
  },
};

function SPInView(threshold = 0.12) {
  const ref = useSPRef(null);
  const [vis, setVis] = useSPState(false);
  useSPEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function ServicePage({ pageId, onNavigate }) {
  const data = SERVICE_DATA[pageId];
  if (!data) return null;
  const { accentColor: ac, heroTitle, heroSubtitle, introLeft, introRight, services, timeline, techTitle, techItems } = data;

  const [scanY, setScanY] = useSPState(0);
  useSPEffect(() => {
    let raf;
    const start = performance.now();
    const animate = (now) => {
      const t = ((now - start) / 4000) % 1;
      setScanY(t * 100);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [pageId]);

  const [introRef, introVis] = SPInView();
  const [cardsRef, cardsVis] = SPInView();
  const [tlRef, tlVis] = SPInView();
  const [techRef, techVis] = SPInView();

  return (
    <div>
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
          <div style={{height:"3px",width:"72px",background:ac,marginBottom:"48px"}}/>
          <h1 style={{
            fontFamily:"'Tanker',sans-serif",
            fontSize:"clamp(3.5rem,10vw,9rem)",
            textTransform:"uppercase",letterSpacing:"0.02em",lineHeight:"0.88",color:ac,
          }}>{heroTitle}</h1>
          <p style={{
            fontFamily:"'Tanker',sans-serif",
            fontSize:"clamp(1rem,2.5vw,1.8rem)",
            textTransform:"uppercase",letterSpacing:"0.02em",lineHeight:"1.2",
            color:"rgba(255,255,255,0.45)",marginTop:"28px",maxWidth:"600px",
          }}>{heroSubtitle}</p>
        </div>
        <div style={{
          position:"absolute",bottom:"28px",right:"clamp(24px,5vw,120px)",
          fontFamily:"monospace",fontSize:"11px",color:"rgba(255,255,255,0.3)",
        }}>N 47.4979° E 19.0402°</div>
      </section>

      {/* ── Intro ── */}
      <section style={{background:"#020202",padding:"clamp(80px,8vw,160px) clamp(24px,5vw,120px)"}}>
        <div
          ref={introRef}
          style={{
            display:"grid",gridTemplateColumns:"5fr 7fr",gap:"clamp(40px,5vw,100px)",
            alignItems:"start",maxWidth:"1100px",
            opacity: introVis ? 1 : 0,
            transform: introVis ? "translateY(0)" : "translateY(32px)",
            transition:"opacity 1s cubic-bezier(0.22,1,0.36,1), transform 1s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
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
        <div ref={cardsRef} style={{maxWidth:"1000px"}}>
          <div style={{
            opacity: cardsVis ? 1 : 0,
            transform: cardsVis ? "translateY(0)" : "translateY(24px)",
            transition:"opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
            marginBottom:"clamp(56px,6vw,100px)",
          }}>
            <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"36px"}}>
              <div style={{height:"2px",width:"52px",background:ac}}/>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",fontWeight:500,
                textTransform:"uppercase",letterSpacing:"0.22em",color:"rgba(255,255,255,0.3)"}}>
                Our Offering
              </span>
            </div>
            <div style={{fontFamily:"'Tanker',sans-serif",fontSize:"clamp(2.5rem,5.5vw,5rem)",
              textTransform:"uppercase",lineHeight:"0.9",color:"#FAFAF8"}}>
              How can we <span style={{color:ac}}>help?</span>
            </div>
          </div>
          {services.map((c, i) => (
            <ServiceRow key={c.title} item={c} accentColor={ac} index={i} visible={cardsVis}/>
          ))}
        </div>
      </section>

      {/* ── Timeline ── */}
      <section style={{
        background:"linear-gradient(180deg,#FAFAF8 0%,#F5F5F0 100%)",
        padding:"clamp(80px,8vw,160px) clamp(24px,5vw,120px)",
      }}>
        <div ref={tlRef} style={{maxWidth:"1000px"}}>
          <div style={{height:"2px",width:"72px",background:ac,marginBottom:"48px"}}/>
          <h2 style={{
            fontFamily:"'Tanker',sans-serif",fontSize:"clamp(2rem,5vw,4rem)",
            textTransform:"uppercase",lineHeight:"0.9",color:"#0D0D0D",marginBottom:"16px",
          }}>Process</h2>
          <p style={{fontFamily:"'DM Sans',sans-serif",fontWeight:300,fontSize:"16px",
            color:"rgba(0,0,0,0.4)",lineHeight:1.7,marginBottom:"60px",maxWidth:"520px"}}>
            From consultation to delivery — dedicated expertise, efficient execution.
          </p>
          <div style={{display:"flex",flexDirection:"column",gap:"0"}}>
            {timeline.map((step, i) => (
              <div key={i} style={{
                display:"flex",alignItems:"baseline",gap:"28px",padding:"18px 0",
                borderBottom:"1px solid rgba(0,0,0,0.07)",
                opacity: tlVis ? 1 : 0,
                transform: tlVis ? "translateX(0)" : "translateX(-20px)",
                transition:`opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${i*0.1}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${i*0.1}s`,
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
        <div ref={techRef}>
          <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"36px"}}>
            <div style={{height:"2px",width:"52px",background:ac}}/>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",fontWeight:500,
              textTransform:"uppercase",letterSpacing:"0.22em",color:"rgba(255,255,255,0.3)"}}>Equipment</span>
          </div>
          <h2 style={{fontFamily:"'Tanker',sans-serif",fontSize:"clamp(2.5rem,5.5vw,5rem)",
            textTransform:"uppercase",lineHeight:"0.9",color:"#FAFAF8",marginBottom:"64px"}}>{techTitle}</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"24px"}}>
            {techItems.map((item, i) => (
              <div key={item.name} style={{
                borderLeft:`2px solid ${ac}`,
                padding:"clamp(24px,2.5vw,40px) clamp(28px,3vw,48px)",
                background:"linear-gradient(135deg,rgba(255,255,255,0.03) 0%,transparent 100%)",
                opacity: techVis ? 1 : 0,
                transform: techVis ? "translateY(0)" : "translateY(24px)",
                transition:`opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${i*0.12}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${i*0.12}s`,
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

function ServiceRow({ item, accentColor, index, visible }) {
  const [hov, setHov] = useSPState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:"flex",gap:"clamp(28px,4vw,80px)",alignItems:"flex-start",
        padding:"clamp(28px,3vw,48px) 0 clamp(28px,3vw,48px) clamp(16px,2vw,32px)",
        borderBottom:"1px solid rgba(255,255,255,0.04)",
        borderLeft:`2px solid ${hov ? accentColor : "transparent"}`,
        transition:"border-color 0.4s cubic-bezier(0.22,1,0.36,1)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-16px)",
        transitionDelay: visible ? `${index * 0.1 + 0.2}s` : "0s",
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
  const [ref, vis] = SPInView(0.2);
  return (
    <section ref={ref} style={{
      background:"linear-gradient(180deg,#FAFAF8 0%,#F5F5F0 100%)",
      padding:"clamp(80px,8vw,140px) clamp(24px,5vw,120px)",
      textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",
    }}>
      <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",fontWeight:500,
        textTransform:"uppercase",letterSpacing:"0.22em",color:"rgba(0,0,0,0.28)",marginBottom:"28px"}}>
        Next Step
      </div>
      <h2 style={{
        fontFamily:"'Tanker',sans-serif",fontSize:"clamp(2rem,5vw,4.5rem)",
        textTransform:"uppercase",lineHeight:"0.92",color:"#0D0D0D",
        marginBottom:"48px",maxWidth:"720px",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(24px)",
        transition:"opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
      }}>
        Request a tailored quote.
      </h2>
      <button
        onClick={() => onNavigate("contact")}
        onMouseEnter={() => setBtnHov(true)}
        onMouseLeave={() => setBtnHov(false)}
        style={{
          background: btnHov ? accentColor : "#0D0D0D",
          color:"#FAFAF8",border:"none",cursor:"pointer",
          padding:"20px 60px",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:500,
          textTransform:"uppercase",letterSpacing:"0.2em",
          transition:"background 0.4s cubic-bezier(0.23,1,0.32,1), transform 0.3s",
          transform: btnHov ? "scale(1.03)" : "scale(1)",
          boxShadow: btnHov ? "0 16px 48px rgba(0,0,0,0.15)" : "none",
        }}>
        Get a Quote
      </button>
    </section>
  );
}

Object.assign(window, { ServicePage, CtaBanner });
