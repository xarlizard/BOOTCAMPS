import { useNavigate } from "react-router-dom";
import { FaCar, FaHome } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center",
      }}
    >
      <div>
        <div style={{ fontSize: "6rem", marginBottom: "1rem" }}>
          <FaCar aria-hidden="true" />
        </div>
        <h1 className="heading-1">404 - Página no encontrada</h1>
        <p
          className="text-lg"
          style={{ marginBottom: "2rem", maxWidth: "500px" }}
        >
          ¡Ups! Parece que esta página se fue a dar una vuelta y no ha vuelto.
          La ruta que buscas no existe.
        </p>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => navigate("/")}
            className="btn btn-primary"
            style={{
              display: "inline-flex",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <FaHome aria-hidden="true" />
            <span>Volver al inicio</span>
          </button>
          <button
            onClick={() => navigate("/items")}
            className="btn btn-secondary"
            style={{
              display: "inline-flex",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <FiSearch aria-hidden="true" />
            <span>Explorar coches</span>
          </button>
        </div>
      </div>
    </div>
  );
}
