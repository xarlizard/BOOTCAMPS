import { Link } from "react-router-dom";
import { useState } from "react";
import { useHealth } from "../contexts/HealthContext";
import { ThemeToggle } from "./ThemeToggle";
import { FaCar } from "react-icons/fa";
import { FiLink, FiClock, FiMenu, FiX } from "react-icons/fi";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isManualLoading, setIsManualLoading] = useState(false);
  const { healthData, loading: healthLoading, checkHealth } = useHealth();

  const handleHealthCheck = async () => {
    try {
      setIsManualLoading(true);

      // Forzar un delay mínimo de 1 segundo para mostrar la animación
      const [result] = await Promise.all([
        checkHealth(true), // Force refresh
        new Promise((resolve) => setTimeout(resolve, 1000)), // 1 segundo de delay
      ]);

      return result;
    } catch (error) {
      console.error("Health check failed:", error);
    } finally {
      setIsManualLoading(false);
    }
  };

  const getConnectionStatus = () => {
    const isLoading = healthLoading || isManualLoading;
    if (isLoading)
      return { text: "Verificando...", className: "status-warning" };
    if (!healthData) return { text: "Sin conexión", className: "status-error" };
    if (healthData.status === "ok")
      return { text: "Conexión abierta", className: "status-success" };
    return { text: "Sin conexión con la DB", className: "status-error" };
  };

  const status = getConnectionStatus();

  return (
    <header
      className="header"
      style={{
        backgroundColor: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow: "var(--shadow)",
      }}
    >
      <div className="container">
        <nav
          className="navbar"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem 0",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            className="logo"
            style={{
              fontSize: "1.5rem",
              fontWeight: "800",
              color: "var(--primary-color)",
              textDecoration: "none",
              display: "inline-flex",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <FaCar aria-hidden="true" />
            <span>CarBnB</span>
          </Link>

          {/* Desktop Navigation */}
          <div
            className="nav-links"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            <Link to="/" className="nav-link">
              Inicio
            </Link>
            <Link to="/items" className="nav-link">
              Explorar
            </Link>
            <Link to="/create" className="btn btn-primary btn-sm">
              Añadir Coche
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Health Status */}
            <div
              className="health-status"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <button
                onClick={handleHealthCheck}
                className="btn btn-secondary btn-sm"
                disabled={healthLoading || isManualLoading}
                aria-label="Probar conexión con el servidor"
                style={{
                  display: "inline-flex",
                  gap: "0.5rem",
                  alignItems: "center",
                }}
              >
                {healthLoading || isManualLoading ? (
                  <FiClock aria-hidden="true" />
                ) : (
                  <FiLink aria-hidden="true" />
                )}
                <span>Probar conexión</span>
              </button>
              <span
                className={status.className}
                style={{ fontSize: "0.75rem" }}
              >
                {status.text}
              </span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            style={{
              display: "none",
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isMenuOpen ? (
              <FiX aria-hidden="true" />
            ) : (
              <FiMenu aria-hidden="true" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            className="mobile-nav"
            style={{
              display: "none",
              paddingBottom: "1rem",
              borderTop: "1px solid var(--border)",
              marginTop: "1rem",
              paddingTop: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <Link
                to="/"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                to="/items"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Explorar
              </Link>
              <Link
                to="/create"
                className="btn btn-primary btn-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Añadir Coche
              </Link>

              {/* Theme Toggle Mobile */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                <ThemeToggle size="md" />
              </div>

              <div className="health-status-mobile">
                <button
                  onClick={handleHealthCheck}
                  className="btn btn-secondary btn-sm"
                  disabled={healthLoading || isManualLoading}
                  style={{
                    width: "100%",
                    marginBottom: "0.5rem",
                    display: "inline-flex",
                    gap: "0.5rem",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {healthLoading || isManualLoading ? (
                    <FiClock aria-hidden="true" />
                  ) : (
                    <FiLink aria-hidden="true" />
                  )}{" "}
                  <span>Probar conexión</span>
                </button>
                <span
                  className={status.className}
                  style={{ fontSize: "0.75rem" }}
                >
                  Estado: {status.text}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .nav-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          transition: var(--transition);
        }

        .nav-link:hover {
          color: var(--primary-color);
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none !important;
          }

          .mobile-menu-btn {
            display: block !important;
          }

          .mobile-nav {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
