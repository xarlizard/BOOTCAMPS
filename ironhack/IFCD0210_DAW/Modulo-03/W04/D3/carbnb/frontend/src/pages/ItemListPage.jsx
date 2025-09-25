import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import apiService from "../services/api";
import { LoadingSpinner, ItemCardSkeleton } from "../components/Loading";
import { ErrorMessage, EmptyState } from "../components/ErrorStates";
import { formatRelativeTime, getCarIcon, getTagColor } from "../utils/helpers";
import { FiPlus, FiEye, FiEdit } from "react-icons/fi";
import { FaTrash, FaCar } from "react-icons/fa";

export function ItemListPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({});
  const [loadingMore, setLoadingMore] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  const loadItems = async (searchTerm = "", pageNum = 1, append = false) => {
    try {
      if (!append) setLoading(true);
      else setLoadingMore(true);

      setError(null);

      const response = await apiService.getItems({
        search: searchTerm,
        page: pageNum,
        pageSize: 12,
      });

      if (append) {
        setItems((prev) => [...prev, ...response.data]);
      } else {
        setItems(response.data);
      }

      setMeta(response.meta);
    } catch (err) {
      setError(err);
      if (!append) setItems([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Load items when search changes
  useEffect(() => {
    setPage(1);
    loadItems(debouncedSearch, 1, false);
  }, [debouncedSearch]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadItems(debouncedSearch, nextPage, true);
  };

  const handleRetry = () => {
    loadItems(debouncedSearch, 1, false);
  };

  const handleDeleteItem = async (id) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este coche?")) return;

    try {
      await apiService.deleteItem(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      // Show success message
    } catch (err) {
      alert("Error al eliminar el coche: " + err.message);
    }
  };

  if (loading && items.length === 0) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="heading-1">Explorar Coches</h1>
          <p className="text-lg">Encuentra el coche perfecto para ti</p>
        </div>
        <div className="grid grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <ItemCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="item-list-page">
      {/* Header */}
      <div className="page-header" style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <h1 className="heading-1">Explorar Coches</h1>
            <p className="text-lg">
              {meta.total
                ? `${meta.total} coches disponibles`
                : "Encuentra el coche perfecto para ti"}
            </p>
          </div>
          <Link
            to="/create"
            className="btn btn-primary"
            style={{
              display: "inline-flex",
              gap: "0.5rem",
              alignItems: "center",
            }}
          >
            <FiPlus aria-hidden="true" />
            <span>Añadir Coche</span>
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="search-section" style={{ marginBottom: "2rem" }}>
        <div className="form-group">
          <label htmlFor="search" className="form-label">
            Buscar coches
          </label>
          <input
            id="search"
            type="text"
            placeholder="Buscar por título, descripción o etiquetas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
            style={{ maxWidth: "500px" }}
          />
          <p className="form-help">
            Puedes buscar por marca, modelo, tipo de combustible, etc.
          </p>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <ErrorMessage
          error={error}
          onRetry={handleRetry}
          title="Error al cargar los coches"
        />
      )}

      {/* Empty State */}
      {!loading && !error && items.length === 0 && (
        <EmptyState
          title={
            search ? "No se encontraron coches" : "No hay coches disponibles"
          }
          message={
            search
              ? `No hay coches que coincidan con "${search}"`
              : "Sé el primero en añadir un coche a la plataforma"
          }
          icon={<FaCar aria-hidden="true" />}
          actionLabel={search ? undefined : "Añadir primer coche"}
          onAction={search ? undefined : () => navigate("/create")}
        />
      )}

      {/* Items Grid */}
      {items.length > 0 && (
        <>
          <div className="grid grid-cols-3" style={{ marginBottom: "2rem" }}>
            {items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onDelete={() => handleDeleteItem(item.id)}
              />
            ))}
          </div>

          {/* Load More Button */}
          {meta.page < meta.totalPages && (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="btn btn-secondary"
              >
                {loadingMore ? (
                  <LoadingSpinner size="sm" text="Cargando más..." />
                ) : (
                  `Cargar más coches (${meta.total - items.length} restantes)`
                )}
              </button>
            </div>
          )}

          {/* Pagination Info */}
          <div
            style={{
              textAlign: "center",
              marginTop: "1rem",
              color: "var(--text-secondary)",
              fontSize: "0.875rem",
            }}
          >
            Mostrando {items.length} de {meta.total} coches
          </div>
        </>
      )}
    </div>
  );
}

function ItemCard({ item, onDelete }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="card fade-in">
      {/* Car Icon Header */}
      <div className="card-header">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: "2rem" }}>{getCarIcon(item.tags)}</span>
          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {formatRelativeTime(item.createdAt)}
          </span>
        </div>
      </div>

      <div className="card-content">
        {/* Title */}
        <h3 className="heading-3">
          <Link
            to={`/items/${item.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "block",
            }}
          >
            {item.title}
          </Link>
        </h3>

        {/* Description */}
        {item.description && (
          <p
            className="text-sm"
            style={{
              marginBottom: "1rem",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {item.description}
          </p>
        )}

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="tags" style={{ marginBottom: "1rem" }}>
            {item.tags.slice(0, 3).map((tag, index) => {
              const colors = getTagColor(tag);
              return (
                <span
                  key={index}
                  className="tag"
                  style={{
                    backgroundColor: colors.bg,
                    color: colors.color,
                  }}
                >
                  {tag}
                </span>
              );
            })}
            {item.tags.length > 3 && (
              <span className="tag">+{item.tags.length - 3}</span>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="card-footer">
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            justifyContent: "space-between",
          }}
        >
          <Link
            to={`/items/${item.id}`}
            className="btn btn-secondary btn-sm"
            style={{
              flex: 1,
              display: "inline-flex",
              gap: "0.5rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FiEye aria-hidden="true" />
            <span>Ver</span>
          </Link>
          <Link
            to={`/items/${item.id}/edit`}
            className="btn btn-secondary btn-sm"
            style={{
              flex: 1,
              display: "inline-flex",
              gap: "0.5rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FiEdit aria-hidden="true" />
            <span>Editar</span>
          </Link>
          <button
            onClick={onDelete}
            className="btn btn-danger btn-sm"
            title="Eliminar coche"
            aria-label="Eliminar coche"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FaTrash aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
