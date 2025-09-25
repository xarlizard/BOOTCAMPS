import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useItem } from "../hooks/useApi";
import apiService from "../services/api";
import { LoadingSkeleton } from "../components/Loading";
import { ErrorMessage, NotFoundMessage } from "../components/ErrorStates";
import { formatDate, getCarIcon, getTagColor } from "../utils/helpers";
import { FiEdit } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";

export function ItemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: item, loading, error, execute } = useItem(id);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de que quieres eliminar este coche?")) return;

    try {
      setDeleting(true);
      await apiService.deleteItem(id);
      navigate("/items", {
        state: { message: "Coche eliminado correctamente" },
      });
    } catch (err) {
      alert("Error al eliminar el coche: " + err.message);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div>
        <LoadingSkeleton lines={8} title={true} />
      </div>
    );
  }

  if (error?.status === 404) {
    return (
      <NotFoundMessage
        title="Coche no encontrado"
        message="El coche que buscas no existe o ha sido eliminado."
        actionLabel="Ver todos los coches"
        onAction={() => navigate("/items")}
      />
    );
  }

  if (error) {
    return (
      <ErrorMessage
        error={error}
        onRetry={execute}
        title="Error al cargar el coche"
      />
    );
  }

  if (!item) return null;

  return (
    <div className="item-detail-page">
      {/* Breadcrumb */}
      <nav className="breadcrumb" style={{ marginBottom: "2rem" }}>
        <Link to="/items" className="breadcrumb-link">
          ← Volver a la lista
        </Link>
      </nav>

      <div className="card">
        {/* Header */}
        <div className="card-header">
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span style={{ fontSize: "3rem" }}>{getCarIcon(item.tags)}</span>
              <div>
                <h1 className="heading-1">{item.title}</h1>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Creado el {formatDate(item.createdAt)}
                  {item.updatedAt !== item.createdAt && (
                    <span> • Actualizado el {formatDate(item.updatedAt)}</span>
                  )}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
              <Link
                to={`/items/${item.id}/edit`}
                className="btn btn-secondary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <FiEdit aria-hidden="true" />
                Editar
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="btn btn-danger"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                {deleting ? "⏳" : <FaTrash aria-hidden="true" />} Eliminar
              </button>
            </div>
          </div>
        </div>

        <div className="card-content">
          {/* Description */}
          {item.description && (
            <div style={{ marginBottom: "2rem" }}>
              <h2 className="heading-3">Descripción</h2>
              <p className="text-lg" style={{ lineHeight: 1.6 }}>
                {item.description}
              </p>
            </div>
          )}

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div style={{ marginBottom: "2rem" }}>
              <h2 className="heading-3">Características</h2>
              <div className="tags">
                {item.tags.map((tag, index) => {
                  const colors = getTagColor(tag);
                  return (
                    <span
                      key={index}
                      className="tag"
                      style={{
                        backgroundColor: colors.bg,
                        color: colors.color,
                        fontSize: "0.875rem",
                        padding: "0.5rem 1rem",
                      }}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Metadata */}
          <div
            className="metadata"
            style={{
              backgroundColor: "var(--background)",
              padding: "1.5rem",
              borderRadius: "var(--border-radius)",
              border: "1px solid var(--border)",
            }}
          >
            <h2 className="heading-3" style={{ marginBottom: "1rem" }}>
              Información del registro
            </h2>
            <div className="grid grid-cols-2">
              <div>
                <strong>ID:</strong> {item.id}
              </div>
              <div>
                <strong>Fecha de creación:</strong>
                <br />
                {formatDate(item.createdAt)}
              </div>
              <div>
                <strong>Última actualización:</strong>
                <br />
                {formatDate(item.updatedAt)}
              </div>
              <div>
                <strong>Total de etiquetas:</strong> {item.tags?.length || 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .breadcrumb-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          transition: var(--transition);
        }

        .breadcrumb-link:hover {
          color: var(--primary-color);
        }

        @media (max-width: 768px) {
          .card-header > div {
            flex-direction: column;
            align-items: flex-start !important;
          }

          .card-header .heading-1 {
            font-size: 1.5rem;
          }

          .card-header > div > div:last-child {
            width: 100%;
            justify-content: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
