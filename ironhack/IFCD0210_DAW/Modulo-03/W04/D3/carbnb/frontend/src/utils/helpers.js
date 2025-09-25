export function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch (error) {
    return "Fecha inválida";
  }
}

export function formatRelativeTime(dateString) {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return "Ahora mismo";
    if (diffInMinutes < 60)
      return `Hace ${diffInMinutes} minuto${diffInMinutes > 1 ? "s" : ""}`;
    if (diffInHours < 24)
      return `Hace ${diffInHours} hora${diffInHours > 1 ? "s" : ""}`;
    if (diffInDays < 7)
      return `Hace ${diffInDays} día${diffInDays > 1 ? "s" : ""}`;

    return formatDate(dateString);
  } catch (error) {
    return "Fecha inválida";
  }
}

export function validateItem(item) {
  const errors = {};

  if (!item.title || item.title.trim().length === 0) {
    errors.title = "El título es obligatorio";
  } else if (item.title.length > 200) {
    errors.title = "El título no puede exceder 200 caracteres";
  }

  if (item.description && item.description.length > 1000) {
    errors.description = "La descripción no puede exceder 1000 caracteres";
  }

  if (item.tags && item.tags.length > 10) {
    errors.tags = "Máximo 10 etiquetas permitidas";
  }

  if (item.tags) {
    for (const tag of item.tags) {
      if (typeof tag !== "string" || tag.trim().length === 0) {
        errors.tags = "Las etiquetas no pueden estar vacías";
        break;
      }
      if (tag.length > 50) {
        errors.tags = "Las etiquetas no pueden exceder 50 caracteres";
        break;
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export function capitalizeFirst(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function getCarIcon(tags = []) {
  if (tags.includes("electric") || tags.includes("hybrid")) return "⚡";
  if (tags.includes("suv")) return "🚙";
  if (tags.includes("sport") || tags.includes("luxury")) return "🏎️";
  if (tags.includes("convertible")) return "🛺";
  return "🚗";
}

export function getTagColor(tag) {
  const colors = {
    electric: { bg: "#dcfce7", color: "#166534" },
    hybrid: { bg: "#dcfce7", color: "#166534" },
    luxury: { bg: "#fef3c7", color: "#92400e" },
    sport: { bg: "#fecaca", color: "#991b1b" },
    suv: { bg: "#ddd6fe", color: "#5b21b6" },
    sedan: { bg: "#e0e7ff", color: "#3730a3" },
    hatchback: { bg: "#cffafe", color: "#155e75" },
    coupe: { bg: "#fed7d7", color: "#9b2c2c" },
    automatic: { bg: "#f0f9ff", color: "#0c4a6e" },
    manual: { bg: "#fef7ed", color: "#9a3412" },
  };

  return colors[tag.toLowerCase()] || { bg: "#f1f5f9", color: "#475569" };
}
