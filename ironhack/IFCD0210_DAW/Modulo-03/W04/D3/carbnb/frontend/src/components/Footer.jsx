import { FaCar, FaCoffee, FaGithub } from "react-icons/fa";

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--surface)",
        borderTop: "1px solid var(--border)",
        marginTop: "2rem",
        padding: "2rem 0",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem",
            marginBottom: "2rem",
          }}
        >
          {/* About */}
          <div>
            <h3
              className="heading-3"
              style={{
                marginBottom: "1rem",
                display: "inline-flex",
                gap: "0.5rem",
                alignItems: "center",
              }}
            >
              <FaCar aria-hidden="true" />
              <span>CarBnB</span>
            </h3>
            <p className="text-sm" style={{ marginBottom: "1rem" }}>
              Tu plataforma de confianza para encontrar el coche perfecto.
              Explora nuestra amplia selección de vehículos.
            </p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <span className="tag">React</span>
              <span className="tag">Node.js</span>
              <span className="tag">SQLite</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                marginBottom: "1rem",
                color: "var(--text-primary)",
              }}
            >
              Enlaces Rápidos
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <a href="/" className="footer-link">
                Inicio
              </a>
              <a href="/items" className="footer-link">
                Explorar Coches
              </a>
              <a href="/create" className="footer-link">
                Añadir Coche
              </a>
            </div>
          </div>

          {/* Tech Info */}
          <div>
            <h4
              style={{
                fontSize: "1rem",
                fontWeight: "600",
                marginBottom: "1rem",
                color: "var(--text-primary)",
              }}
            >
              Información Técnica
            </h4>
            <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
              <p style={{ marginBottom: "0.5rem" }}>
                <strong>Frontend:</strong> React + Vite
              </p>
              <p style={{ marginBottom: "0.5rem" }}>
                <strong>Backend:</strong> Node.js + Express
              </p>
              <p style={{ marginBottom: "0.5rem" }}>
                <strong>Base de Datos:</strong> SQLite + Prisma
              </p>
              <p>
                <strong>Containerización:</strong> Docker
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            paddingTop: "2rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p className="text-sm">
            © 2025 CarBnB. Proyecto desarrollado para Ironhack IFCD0210.
          </p>
          <p
            className="text-sm"
            style={{
              display: "inline-flex",
              gap: "0.25rem",
              alignItems: "center",
            }}
          >
            Desarrollado por
            <a
              href="https://github.com/xarlizard"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub - xarlizard"
              style={{
                display: "inline-flex",
                alignItems: "center",
                margin: "0 0.25rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <FaGithub
                aria-hidden="true"
                style={{
                  fontSize: "1rem",
                  verticalAlign: "middle",
                  marginRight: "0.35rem",
                }}
              />
              <span style={{ lineHeight: 1 }}>@xarlizard</span>
            </a>
            . Apoyame
            <a
              href="https://www.buymeacoffee.com/xarlizard"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Buy me a coffee - xarlizard"
              style={{
                display: "inline-flex",
                alignItems: "center",
                marginLeft: "0.25rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <FaCoffee
                aria-hidden="true"
                style={{
                  fontSize: "1rem",
                  verticalAlign: "middle",
                  marginRight: "0.35rem",
                }}
              />
              <span style={{ lineHeight: 1 }}>comprandome un cafe</span>
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        .footer-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.875rem;
          transition: var(--transition);
        }

        .footer-link:hover {
          color: var(--primary-color);
        }

        @media (max-width: 768px) {
          .container > div:last-child {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
