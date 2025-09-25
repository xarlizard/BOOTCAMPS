import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useItem } from "../hooks/useApi";
import apiService from "../services/api";
import { LoadingSkeleton, LoadingSpinner } from "../components/Loading";
import { FiPlus, FiX, FiChevronLeft } from "react-icons/fi";
import { FaSave } from "react-icons/fa";
import { ErrorMessage } from "../components/ErrorStates";
import { validateItem } from "../utils/helpers";

export function ItemFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const {
    data: existingItem,
    loading: loadingItem,
    error: loadError,
  } = useItem(id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: [],
  });

  const [newTag, setNewTag] = useState("");
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  // Load existing item data
  useEffect(() => {
    if (isEdit && existingItem) {
      setFormData({
        title: existingItem.title || "",
        description: existingItem.description || "",
        tags: existingItem.tags || [],
      });
    }
  }, [isEdit, existingItem]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleAddTag = () => {
    const tag = newTag.trim().toLowerCase();
    if (!tag) return;

    if (formData.tags.includes(tag)) {
      alert("Esta etiqueta ya existe");
      return;
    }

    if (formData.tags.length >= 10) {
      alert("Máximo 10 etiquetas permitidas");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, tag],
    }));
    setNewTag("");
  };

  const handleRemoveTag = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const validation = validateItem(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      setSaving(true);
      setErrors({});

      if (isEdit) {
        await apiService.updateItem(id, formData);
        navigate(`/items/${id}`, {
          state: { message: "Coche actualizado correctamente" },
        });
      } else {
        const newItem = await apiService.createItem(formData);
        navigate(`/items/${newItem.id}`, {
          state: { message: "Coche creado correctamente" },
        });
      }
    } catch (err) {
      if (err.status === 400) {
        setErrors({ submit: err.message });
      } else {
        setErrors({ submit: "Error al guardar el coche. Inténtalo de nuevo." });
      }
    } finally {
      setSaving(false);
    }
  };

  if (isEdit && loadingItem) {
    return <LoadingSkeleton lines={8} title={true} />;
  }

  if (isEdit && loadError) {
    return <ErrorMessage error={loadError} title="Error al cargar el coche" />;
  }

  return (
    <div className="item-form-page">
      {/* Header */}
      <div className="page-header" style={{ marginBottom: "2rem" }}>
        <nav className="breadcrumb" style={{ marginBottom: "1rem" }}>
          <Link
            to="/items"
            className="breadcrumb-link"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <FiChevronLeft aria-hidden="true" />
            <span>Volver a la lista</span>
          </Link>
        </nav>

        <h1 className="heading-1">
          {isEdit ? "Editar Coche" : "Añadir Nuevo Coche"}
        </h1>
        <p className="text-lg">
          {isEdit
            ? "Actualiza la información del coche"
            : "Completa los detalles del nuevo coche"}
        </p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="card-content">
            {/* Title */}
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Título *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
                className={`form-control ${errors.title ? "error" : ""}`}
                placeholder="Ej: BMW X5 2023, Tesla Model 3..."
                maxLength={200}
                required
              />
              {errors.title && <div className="form-error">{errors.title}</div>}
              <div className="form-help">
                El título debe ser descriptivo y único ({formData.title.length}
                /200)
              </div>
            </div>

            {/* Description */}
            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className={`form-control ${errors.description ? "error" : ""}`}
                placeholder="Describe las características, estado, y detalles importantes del coche..."
                rows={4}
                maxLength={1000}
              />
              {errors.description && (
                <div className="form-error">{errors.description}</div>
              )}
              <div className="form-help">
                Información adicional sobre el coche (
                {formData.description.length}/1000)
              </div>
            </div>

            {/* Tags */}
            <div className="form-group">
              <label className="form-label">
                Etiquetas ({formData.tags.length}/10)
              </label>

              {/* Tag input */}
              <div
                style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}
              >
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), handleAddTag())
                  }
                  className="form-control"
                  placeholder="Añadir etiqueta (ej: suv, luxury, electric...)"
                  maxLength={50}
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="btn btn-secondary"
                  disabled={!newTag.trim() || formData.tags.length >= 10}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <FiPlus aria-hidden="true" />
                  <span>Añadir</span>
                </button>
              </div>

              {/* Tags display */}
              {formData.tags.length > 0 && (
                <div className="tags" style={{ marginBottom: "0.5rem" }}>
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="tag"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        backgroundColor: "var(--primary-light)",
                        color: "var(--primary-color)",
                      }}
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(index)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "inherit",
                          cursor: "pointer",
                          fontSize: "0.875rem",
                          display: "inline-flex",
                          alignItems: "center",
                        }}
                        title="Eliminar etiqueta"
                        aria-label={`Eliminar etiqueta ${tag}`}
                      >
                        <FiX aria-hidden="true" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {errors.tags && <div className="form-error">{errors.tags}</div>}
              <div className="form-help">
                Las etiquetas ayudan a categorizar y encontrar el coche (marca,
                tipo, combustible, etc.)
              </div>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="error-message">{errors.submit}</div>
            )}
          </div>

          {/* Form Actions */}
          <div className="card-footer">
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "flex-end",
              }}
            >
              <Link
                to={isEdit ? `/items/${id}` : "/items"}
                className="btn btn-secondary"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="btn btn-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                {saving ? (
                  <LoadingSpinner size="sm" text="Guardando..." />
                ) : isEdit ? (
                  <>
                    <FaSave aria-hidden="true" />
                    <span>Actualizar</span>
                  </>
                ) : (
                  <>
                    <FiPlus aria-hidden="true" />
                    <span>Crear Coche</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
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

        textarea.form-control {
          resize: vertical;
          min-height: 100px;
        }

        @media (max-width: 768px) {
          .card-footer > div {
            flex-direction: column;
          }

          .card-footer .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
