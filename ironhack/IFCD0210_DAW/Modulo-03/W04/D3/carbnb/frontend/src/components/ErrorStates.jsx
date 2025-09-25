import { FiAlertTriangle, FiRefreshCw, FiSearch } from "react-icons/fi";
import { FaClipboardList } from "react-icons/fa";

export function ErrorMessage({
  error,
  onRetry,
  title = "Error",
  showDetails = false,
}) {
  const getErrorMessage = (error) => {
    if (error?.message) return error.message;
    if (typeof error === "string") return error;
    return "Ha ocurrido un error inesperado";
  };

  const getErrorStatus = (error) => {
    if (error?.status === 404) return "No encontrado";
    if (error?.status === 400) return "Datos inválidos";
    if (error?.status === 500) return "Error del servidor";
    if (error?.status === 0) return "Error de conexión";
    return null;
  };

  const errorMessage = getErrorMessage(error);
  const errorStatus = getErrorStatus(error);

  return (
    <div className="error-message" role="alert">
      <div
        style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}
      >
        <span style={{ fontSize: "1.25rem", flexShrink: 0 }}>
          <FiAlertTriangle aria-hidden="true" />
        </span>
        <div style={{ flex: 1 }}>
          <h3
            style={{
              fontWeight: "600",
              marginBottom: "0.5rem",
              color: "var(--danger-color)",
            }}
          >
            {title}
            {errorStatus && (
              <span
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "400",
                  marginLeft: "0.5rem",
                  opacity: 0.8,
                }}
              >
                ({errorStatus})
              </span>
            )}
          </h3>
          <p style={{ marginBottom: onRetry ? "1rem" : 0 }}>{errorMessage}</p>

          {showDetails && error?.data && (
            <details style={{ marginTop: "0.5rem" }}>
              <summary
                style={{
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  color: "var(--text-secondary)",
                }}
              >
                Ver detalles técnicos
              </summary>
              <pre
                style={{
                  fontSize: "0.75rem",
                  marginTop: "0.5rem",
                  padding: "0.5rem",
                  backgroundColor: "#f1f5f9",
                  borderRadius: "4px",
                  overflow: "auto",
                  whiteSpace: "pre-wrap",
                }}
              >
                {JSON.stringify(error.data, null, 2)}
              </pre>
            </details>
          )}

          {onRetry && (
            <button
              onClick={onRetry}
              className="btn btn-secondary btn-sm"
              style={{
                display: "inline-flex",
                gap: "0.5rem",
                alignItems: "center",
              }}
            >
              <FiRefreshCw aria-hidden="true" />
              <span>Reintentar</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function NotFoundMessage({
  title = "No encontrado",
  message = "El elemento que buscas no existe o ha sido eliminado.",
  actionLabel = "Volver al inicio",
  onAction,
}) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "3rem 1rem",
        maxWidth: "500px",
        margin: "0 auto",
      }}
    >
      <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>
        <FiSearch aria-hidden="true" />
      </div>
      <h2 className="heading-2">{title}</h2>
      <p className="text-lg" style={{ marginBottom: "2rem" }}>
        {message}
      </p>
      {onAction && (
        <button onClick={onAction} className="btn btn-primary">
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export function EmptyState({
  title = "No hay elementos",
  message = "No se encontraron elementos para mostrar.",
  actionLabel,
  onAction,
  icon = <FaClipboardList aria-hidden="true" />,
}) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "3rem 1rem",
        backgroundColor: "var(--surface)",
        borderRadius: "var(--border-radius)",
        border: "2px dashed var(--border)",
      }}
    >
      <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{icon}</div>
      <h3 className="heading-3">{title}</h3>
      <p
        className="text-lg"
        style={{
          marginBottom: actionLabel ? "2rem" : 0,
          color: "var(--text-secondary)",
        }}
      >
        {message}
      </p>
      {actionLabel && onAction && (
        <button onClick={onAction} className="btn btn-primary">
          {actionLabel}
        </button>
      )}
    </div>
  );
}
