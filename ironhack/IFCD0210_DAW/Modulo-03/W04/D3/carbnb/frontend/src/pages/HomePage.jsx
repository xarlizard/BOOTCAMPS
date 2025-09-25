import { Link } from "react-router-dom";
import { useHealth } from "../contexts/HealthContext";
import { LoadingSpinner } from "../components/Loading";
import { SiReact, SiNodedotjs, SiSqlite, SiDocker } from "react-icons/si";
import { FiLink, FiSearch, FiPlus, FiEdit } from "react-icons/fi";
import { FaDatabase, FaCar } from "react-icons/fa";

export function HomePage() {
  const { healthData, loading: healthLoading } = useHealth();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          textAlign: "center",
          padding: "4rem 0",
          background:
            "linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%)",
          color: "white",
          borderRadius: "var(--border-radius)",
          marginBottom: "3rem",
        }}
      >
        <div className="container">
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: "900",
              marginBottom: "1rem",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
              }}
            >
              <FaCar size={48} aria-hidden="true" />
              Bienvenido a CarBnB
            </span>
          </h1>
          <p
            style={{
              fontSize: "1.25rem",
              marginBottom: "2rem",
              opacity: 0.9,
              maxWidth: "600px",
              margin: "0 auto 2rem",
            }}
          >
            Tu plataforma favorita para explorar, crear y gestionar información
            de coches. Descubre nuestra amplia colección de vehículos.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/items"
              className="btn"
              style={{
                backgroundColor: "white",
                color: "var(--primary-color)",
                padding: "1rem 2rem",
                fontSize: "1.1rem",
                fontWeight: "600",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <FiSearch size={18} aria-hidden="true" />
              <span>Explorar Coches</span>
            </Link>
            <Link
              to="/create"
              className="btn"
              style={{
                backgroundColor: "transparent",
                color: "white",
                border: "2px solid white",
                padding: "1rem 2rem",
                fontSize: "1.1rem",
                fontWeight: "600",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <FiPlus size={18} aria-hidden="true" />
              <span>Añadir Coche</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" style={{ marginBottom: "3rem" }}>
        <div className="container">
          <h2
            className="heading-2"
            style={{ textAlign: "center", marginBottom: "2rem" }}
          >
            ¿Qué puedes hacer en CarBnB?
          </h2>
          <div className="grid grid-cols-3">
            <div className="feature-card card">
              <div className="card-content" style={{ textAlign: "center" }}>
                <div className="icon-wrapper icon-large">
                  <FiSearch size={36} aria-hidden="true" />
                </div>
                <h3 className="heading-3">Explorar</h3>
                <p className="text-lg">
                  Navega por nuestra extensa colección de coches con búsqueda
                  avanzada y filtros.
                </p>
              </div>
            </div>

            <div className="feature-card card">
              <div className="card-content" style={{ textAlign: "center" }}>
                <div className="icon-wrapper icon-large">
                  <FiPlus size={36} aria-hidden="true" />
                </div>
                <h3 className="heading-3">Crear</h3>
                <p className="text-lg">
                  Añade nuevos coches a la plataforma con información detallada
                  y etiquetas.
                </p>
              </div>
            </div>

            <div className="feature-card card">
              <div className="card-content" style={{ textAlign: "center" }}>
                <div className="icon-wrapper icon-large">
                  <FiEdit size={36} aria-hidden="true" />
                </div>
                <h3 className="heading-3">Gestionar</h3>
                <p className="text-lg">
                  Edita y actualiza la información de los coches existentes
                  fácilmente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="stats"
        style={{
          backgroundColor: "var(--surface)",
          padding: "3rem 2rem",
          borderRadius: "var(--border-radius)",
          marginBottom: "3rem",
        }}
      >
        <div className="container">
          <h2
            className="heading-2"
            style={{ textAlign: "center", marginBottom: "2rem" }}
          >
            Estado del Sistema
          </h2>
          <div className="grid grid-cols-2">
            <div style={{ textAlign: "center" }}>
              <div className="icon-wrapper icon-small">
                {healthLoading ? (
                  <LoadingSpinner size="sm" text="" />
                ) : (
                  <FiLink size={36} aria-hidden="true" />
                )}
              </div>
              <h3 className="heading-3">Conexión API</h3>
              <p
                className={
                  healthData?.status === "ok"
                    ? "status-success"
                    : "status-error"
                }
              >
                {healthLoading
                  ? "Verificando..."
                  : healthData?.status === "ok"
                  ? "Conectado"
                  : "Desconectado"}
              </p>
            </div>

            <div style={{ textAlign: "center" }}>
              <div className="icon-wrapper icon-small">
                <FaDatabase size={36} aria-hidden="true" />
              </div>
              <h3 className="heading-3">Base de Datos</h3>
              <p
                className={
                  healthData?.database?.status === "connected"
                    ? "status-success"
                    : "status-error"
                }
              >
                {healthLoading
                  ? "Verificando..."
                  : healthData?.database?.status === "connected"
                  ? "Conectada"
                  : "Desconectada"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="technology">
        <div className="container">
          <h2
            className="heading-2"
            style={{ textAlign: "center", marginBottom: "2rem" }}
          >
            Tecnologías Utilizadas
          </h2>
          <div className="grid grid-cols-4">
            <div className="tech-card card">
              <div className="card-content" style={{ textAlign: "center" }}>
                <div className="icon-wrapper icon-small">
                  <SiReact size={40} aria-hidden="true" />
                </div>
                <h4 style={{ fontWeight: "600", marginBottom: "0.5rem" }}>
                  React
                </h4>
                <p className="text-sm">Frontend moderno y reactivo</p>
              </div>
            </div>

            <div className="tech-card card">
              <div className="card-content" style={{ textAlign: "center" }}>
                <div className="icon-wrapper icon-small">
                  <SiNodedotjs size={40} aria-hidden="true" />
                </div>
                <h4 style={{ fontWeight: "600", marginBottom: "0.5rem" }}>
                  Node.js
                </h4>
                <p className="text-sm">Backend rápido y escalable</p>
              </div>
            </div>

            <div className="tech-card card">
              <div className="card-content" style={{ textAlign: "center" }}>
                <div className="icon-wrapper icon-small">
                  <SiSqlite size={40} aria-hidden="true" />
                </div>
                <h4 style={{ fontWeight: "600", marginBottom: "0.5rem" }}>
                  SQLite
                </h4>
                <p className="text-sm">Base de datos ligera</p>
              </div>
            </div>

            <div className="tech-card card">
              <div className="card-content" style={{ textAlign: "center" }}>
                <div className="icon-wrapper icon-small">
                  <SiDocker size={40} aria-hidden="true" />
                </div>
                <h4 style={{ fontWeight: "600", marginBottom: "0.5rem" }}>
                  Docker
                </h4>
                <p className="text-sm">Containerización completa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2.5rem !important;
          }

          .hero p {
            font-size: 1.1rem !important;
          }

          .hero .btn {
            width: 100%;
            margin-bottom: 0.5rem;
          }
        }

        @media (max-width: 480px) {
          .hero {
            padding: 2rem 0 !important;
          }

          .hero h1 {
            font-size: 2rem !important;
          }
        }

        /* Extracted utility classes for icons */
        .icon-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .icon-large {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .icon-small {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
}
