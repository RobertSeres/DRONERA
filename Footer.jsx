// DRONERA — Footer (Static, New Design)

// Fallback for Next.js Link in the current static standalone React environment
const Link = window.Link || (({ href, children, ...props }) => (
  <a href={href} {...props}>{children}</a>
));

function Footer() {
  const headingsStyle = {
    color: "#FFFFFF",
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    fontFamily: "'DM Sans', sans-serif",
    marginBottom: "20px",
  };

  const linkStyle = {
    color: "rgba(255,255,255,0.6)",
    fontSize: "13px",
    lineHeight: "2",
    display: "block",
    textDecoration: "none",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 400,
  };

  return (
    <footer style={{
      background: "#000000",
      padding: "80px clamp(24px, 5vw, 120px) 32px",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        .footer-grid-new {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
          gap: 48px;
          margin-bottom: 48px;
        }
        .footer-bottom-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        @media (max-width: 1024px) {
          .footer-grid-new {
            grid-template-columns: 1fr 1fr;
          }
          .footer-col-brand {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 640px) {
          .footer-grid-new {
            grid-template-columns: 1fr;
          }
          .footer-bottom-bar {
            flex-direction: column;
            gap: 20px;
            align-items: flex-start;
          }
        }
        .footer-new-link {
          color: rgba(255,255,255,0.6);
          font-size: 13px;
          text-decoration: none;
          display: block;
          line-height: 2;
        }
      `}</style>

      <div className="footer-grid-new">
        {/* Column 1 - Brand */}
        <div className="footer-col-brand">
          <div style={{
            fontFamily: "'Tanker', sans-serif",
            fontSize: "28px",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "#FFFFFF",
            marginBottom: "16px"
          }}>
            DRONERA
          </div>
          <p style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "13px",
            lineHeight: 1.6,
            marginBottom: "24px",
            maxWidth: "320px"
          }}>
            Prémium ipari drón szolgáltatások — energetika, mezőgazdaság, geodézia.
          </p>
          <div style={{
            height: "1px",
            background: "rgba(255,255,255,0.1)",
            marginBottom: "24px",
            width: "100%"
          }} />
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
            {["EASA Certified", "ISO 9001", "EU Drone Operator"].map(badge => (
              <span key={badge} style={{
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "4px 12px",
                borderRadius: "2px",
                fontSize: "11px",
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase"
              }}>
                {badge}
              </span>
            ))}
          </div>
          <div style={{
            fontFamily: "monospace",
            fontSize: "11px",
            color: "rgba(255,255,255,0.3)"
          }}>
            N 47.4979° E 19.0402°
          </div>
        </div>

        {/* Column 2 - Szolgáltatások */}
        <div>
          <div style={headingsStyle}>SZOLGÁLTATÁSOK</div>
          <Link href="/energetika" className="footer-new-link">Energetika</Link>
          <Link href="/mezogazdasag" className="footer-new-link">Mezőgazdaság</Link>
          <Link href="/geodezia" className="footer-new-link">Geodézia</Link>
          <Link href="/ipari-inspekcio" className="footer-new-link">Ipari Inspekció</Link>
          <Link href="/terkepeszet" className="footer-new-link">Térképészet</Link>
          <Link href="/legi-fotozas" className="footer-new-link">Légi Fotózás</Link>
        </div>

        {/* Column 3 - Vállalat */}
        <div>
          <div style={headingsStyle}>VÁLLALAT</div>
          <Link href="/rolunk" className="footer-new-link">Rólunk</Link>
          <Link href="/technologia" className="footer-new-link">Technológia</Link>
          <Link href="/referenciak" className="footer-new-link">Referenciák</Link>
          <Link href="/karrier" className="footer-new-link">Karriér</Link>
          <Link href="/sajto" className="footer-new-link">Sajtó</Link>
          <Link href="/gyik" className="footer-new-link">GYIK</Link>
        </div>

        {/* Column 4 - Jogi */}
        <div>
          <div style={headingsStyle}>JOGI</div>
          <Link href="/adatvedelem" className="footer-new-link">Adatvédelmi Irányelvek</Link>
          <Link href="/felhasznalasi-feltetelek" className="footer-new-link">Felhasználási Feltételek</Link>
          <Link href="/cookie-szabalyzat" className="footer-new-link">Cookie Szabályzat</Link>
          <Link href="/impresszum" className="footer-new-link">Impresszum</Link>
        </div>

        {/* Column 5 - Kapcsolat */}
        <div>
          <div style={headingsStyle}>KAPCSOLAT</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { label: "E-MAIL", val: "info@dronera.hu", isLink: true, href: "mailto:info@dronera.hu" },
              { label: "TELEFON", val: "+36 20 342 4132", isLink: true, href: "tel:+36203424132" },
              { label: "SZÉKHELY", val: "Budapest, Magyarország" },
              { label: "MUNKAIDŐ", val: "H–P: 08:00–17:00" },
            ].map(item => (
              <div key={item.label}>
                <div style={{
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  marginBottom: "4px"
                }}>
                  {item.label}
                </div>
                {item.isLink ? (
                  <a href={item.href} style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.7)",
                    fontWeight: 400,
                    textDecoration: "none"
                  }}>
                    {item.val}
                  </a>
                ) : (
                  <div style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.7)",
                    fontWeight: 400
                  }}>
                    {item.val}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        height: "1px",
        background: "rgba(255,255,255,0.08)",
        marginBottom: "24px",
        width: "100%"
      }} />

      <div className="footer-bottom-bar">
        <div style={{
          fontSize: "11px",
          color: "rgba(255,255,255,0.25)",
          letterSpacing: "0.05em"
        }}>
          © 2026 DRONERA. Minden jog fenntartva.
        </div>
        
        <div style={{ display: "flex", gap: "20px" }}>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: "rgba(255,255,255,0.35)", display: "flex", textDecoration: "none" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: "rgba(255,255,255,0.35)", display: "flex", textDecoration: "none" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" style={{ color: "rgba(255,255,255,0.35)", display: "flex", textDecoration: "none" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: "rgba(255,255,255,0.35)", display: "flex", textDecoration: "none" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
        </div>

        <div style={{
          fontStyle: "italic",
          color: "rgba(255,255,255,0.2)",
          fontSize: "11px",
          fontFamily: "'DM Sans', sans-serif"
        }}>
          the new era
        </div>
      </div>
    </footer>
  );
}

// Support for the current vanilla React CDN setup
Object.assign(window, { Footer });
