// DRONERA — Contact Page (Hungarian, Premium GSAP)

const { useState: useCState, useEffect: useCEffect, useRef: useCRef } = React;

function ContactPage() {
  const [form, setForm] = useCState({ name:"", company:"", email:"", phone:"", service:"", message:"" });
  const [errors, setErrors] = useCState({});
  const [submitted, setSubmitted] = useCState(false);
  const [focused, setFocused] = useCState(null);
  
  const containerRef = useCRef(null);

  useCEffect(() => {
    if(!window.gsap) return;
    const q = gsap.utils.selector(containerRef);
    gsap.fromTo(q(".cp-hero-elem"), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power4.out", delay: 0.2 });
    if(window.ScrollTrigger) {
        gsap.fromTo(q(".cp-form-elem"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: q(".cp-form-wrapper"), start: "top 85%" } });
    }
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Kötelező";
    if (!form.company.trim()) e.company = "Kötelező";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Érvénytelen e-mail";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  function Field({ id, placeholder, type="text", as="input", rows, options }) {
    const isFocused = focused === id;
    const base = {
      width:"100%",background:"transparent",border:"none",
      borderBottom:`1px solid ${isFocused ? "transparent" : "rgba(0,0,0,0.15)"}`,
      padding:"14px 0",fontSize:"15px",fontWeight:300,
      color:"#0D0D0D",fontFamily:"'DM Sans',sans-serif",outline:"none",
    };
    const el = as === "textarea"
      ? <textarea placeholder={placeholder} value={form[id]} rows={rows||5}
          onChange={e => setForm(p => ({...p,[id]:e.target.value}))}
          onFocus={() => setFocused(id)} onBlur={() => setFocused(null)}
          style={{...base, resize:"none"}}/>
      : as === "select"
      ? <select value={form[id]}
          onChange={e => setForm(p => ({...p,[id]:e.target.value}))}
          onFocus={() => setFocused(id)} onBlur={() => setFocused(null)}
          style={{...base, appearance:"none", cursor:"pointer"}}>
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      : <input type={type} placeholder={placeholder} value={form[id]}
          onChange={e => { setForm(p => ({...p,[id]:e.target.value})); if(errors[id]) setErrors(p => ({...p,[id]:undefined})); }}
          onFocus={() => setFocused(id)} onBlur={() => setFocused(null)}
          style={base}/>;

    return (
      <div style={{position:"relative", marginBottom:"28px"}}>
        {el}
        <div style={{
          position:"absolute",bottom:0,left:0,height:"2px",background:"#0D0D0D",
          width: isFocused ? "100%" : "0",
          transition:"width 0.35s cubic-bezier(0.22,1,0.36,1)",
        }}/>
        {errors[id] && <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"11px",color:"#c00",marginTop:"6px"}}>{errors[id]}</p>}
      </div>
    );
  }

  return (
    <div ref={containerRef}>
      {/* Hero */}
      <section style={{
        minHeight:"100vh",background:"#000",
        display:"flex",flexDirection:"column",justifyContent:"flex-end",
        padding:"0 clamp(24px,5vw,120px) clamp(60px,5vw,80px)",
        position:"relative",overflow:"hidden",
      }}>
        {/* Dot grid */}
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}>
          <defs>
            <pattern id="c-dots" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1" fill="white" fillOpacity="0.05"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#c-dots)"/>
        </svg>

        {/* Diagonal accent */}
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",opacity:0.08}}>
          <line x1="100%" y1="10%" x2="65%" y2="100%" stroke="white" strokeWidth="0.5" strokeDasharray="3 7"/>
        </svg>

        {/* Corner bracket */}
        <svg style={{position:"absolute",top:"80px",right:"clamp(24px,5vw,80px)",
          width:"72px",height:"72px",opacity:0.12,pointerEvents:"none"}} viewBox="0 0 80 80" fill="none">
          <path d="M80 0H32V16" stroke="white" strokeWidth="1.5"/>
          <path d="M80 0V48" stroke="white" strokeWidth="1.5"/>
        </svg>

        <div style={{position:"relative",zIndex:10,paddingTop:"120px"}}>
          <div className="cp-hero-elem" style={{height:"2px",width:"72px",background:"#FAFAF8",marginBottom:"48px", opacity:0}}/>
          <h1 className="cp-hero-elem" style={{
            fontFamily:"'Tanker',sans-serif",fontSize:"clamp(3rem,9vw,8rem)",
            textTransform:"uppercase",letterSpacing:"0.02em",lineHeight:"0.88",color:"#FAFAF8",
            display:"block", opacity:0
          }}>KAPCSOLAT</h1>
          <p className="cp-hero-elem" style={{
            fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(14px,1.4vw,19px)",fontWeight:300,
            color:"rgba(255,255,255,0.42)",marginTop:"28px",maxWidth:"440px",lineHeight:1.8,
            display:"block", opacity:0
          }}>
            Lépj kapcsolatba csapatunkkal — 24 órán belül válaszolunk.
          </p>
        </div>
        <div style={{
          position:"absolute",bottom:"28px",right:"clamp(24px,5vw,120px)",
          fontFamily:"monospace",fontSize:"11px",color:"rgba(255,255,255,0.28)",
        }}>N 47.4979° E 19.0402°</div>
      </section>

      {/* Form section */}
      <section style={{
        background:"#FAFAF8",padding:"clamp(80px,8vw,140px) clamp(24px,5vw,120px)",
        position:"relative",
      }}>
        {/* Subtle grid overlay */}
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}>
          <defs>
            <pattern id="form-grid" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M48 0H0V48" fill="none" stroke="black" strokeWidth="0.3" strokeOpacity="0.05"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#form-grid)"/>
        </svg>

        <div className="cp-form-wrapper" style={{
          position:"relative",zIndex:1,
          display:"grid",gridTemplateColumns:"1fr 1fr",gap:"clamp(40px,6vw,100px)",
        }}>
          {/* Contact info */}
          <div>
            <div className="cp-form-elem" style={{height:"2px",width:"72px",background:"#0D0D0D",marginBottom:"48px", opacity:0}}/>
            <h2 className="cp-form-elem" style={{
              fontFamily:"'Tanker',sans-serif",fontSize:"clamp(2rem,4vw,3.5rem)",
              textTransform:"uppercase",letterSpacing:"0.02em",lineHeight:"0.9",
              color:"#0D0D0D",marginBottom:"56px", opacity:0
            }}>Vedd fel velünk a kapcsolatot</h2>

            {[
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D0D0D" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
                label: "E-mail", val: "info@dronera.hu"
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D0D0D" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12 19.79 19.79 0 0 1 1.08 3.38 2 2 0 0 1 3.04 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
                label: "Telefon", val: "+36 1 234 5678"
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D0D0D" strokeWidth="1.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
                label: "Cím", val: "Budapest, Magyarország"
              },
            ].map(({ icon, label, val }) => (
              <div key={label} className="cp-form-elem" style={{display:"flex",alignItems:"flex-start",gap:"20px",marginBottom:"36px", opacity:0}}>
                <div style={{marginTop:"2px",flexShrink:0}}>{icon}</div>
                <div>
                  <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"10px",fontWeight:500,
                    textTransform:"uppercase",letterSpacing:"0.15em",color:"rgba(0,0,0,0.32)",marginBottom:"8px"}}>{label}</p>
                  <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"16px",fontWeight:300,color:"#0D0D0D"}}>{val}</p>
                </div>
              </div>
            ))}

            {/* Response time badge */}
            <div className="cp-form-elem" style={{
              display:"inline-flex",alignItems:"center",gap:"12px",
              padding:"12px 20px",border:"1px solid rgba(0,0,0,0.1)",marginTop:"16px", opacity:0
            }}>
              <div style={{width:"6px",height:"6px",background:"#91B422",borderRadius:"50%"}}/>
              <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:500,
                textTransform:"uppercase",letterSpacing:"0.15em",color:"rgba(0,0,0,0.5)"}}>
                Válasz 24 órán belül
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="cp-form-elem" style={{opacity:0}}>
            {submitted ? (
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
                height:"100%",textAlign:"center",padding:"60px 0"}}>
                <svg width="56" height="56" viewBox="0 0 64 64" fill="none" style={{marginBottom:"28px"}}>
                  <circle cx="32" cy="32" r="30" stroke="#0D0D0D" strokeWidth="1.5"/>
                  <path d="M20 32L28 40L44 24" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div style={{fontFamily:"'Tanker',sans-serif",fontSize:"clamp(36px,5vw,52px)",
                  textTransform:"uppercase",color:"#0D0D0D",marginBottom:"16px"}}>Köszönjük.</div>
                <p style={{fontFamily:"'DM Sans',sans-serif",fontWeight:300,fontSize:"15px",
                  color:"rgba(0,0,0,0.42)",lineHeight:1.7,maxWidth:"320px"}}>
                  Üzenetedet megkaptuk, hamarosan felvesszük veled a kapcsolatot.
                </p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); if(validate()) setSubmitted(true); }}>
                <Field id="name" placeholder="Név *"/>
                <Field id="company" placeholder="Cégnév *"/>
                <Field id="email" placeholder="E-mail * " type="email"/>
                <Field id="phone" placeholder="Telefonszám" type="tel"/>
                <Field id="service" as="select" options={[
                  {value:"", label:"Melyik szolgáltatás iránt érdeklődsz?"},
                  {value:"energy", label:"Energetika"},
                  {value:"agriculture", label:"Mezőgazdaság"},
                  {value:"geodesy", label:"Geodézia"},
                  {value:"other", label:"Egyéb"},
                ]}/>
                <Field id="message" placeholder="Üzenet" as="textarea" rows={5}/>
                <SubmitButton/>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );

  function SubmitButton() {
    const [hov, setHov] = useCState(false);
    return (
      <button type="submit"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: hov ? "#0D0D0D" : "transparent",
          color: hov ? "#FAFAF8" : "#0D0D0D",
          border:"1px solid #0D0D0D",cursor:"pointer",
          padding:"16px 44px",fontFamily:"'DM Sans',sans-serif",fontSize:"11px",fontWeight:500,
          textTransform:"uppercase",letterSpacing:"0.18em",marginTop:"8px",
          transition:"background 0.35s cubic-bezier(0.23,1,0.32,1), color 0.35s cubic-bezier(0.23,1,0.32,1)",
        }}>
        Üzenet Küldése
      </button>
    );
  }
}

Object.assign(window, { ContactPage });
