// ### Funciones generales para el proyecto ###

// Limita la longitud de un texto a un maximo especificado y añade puntos suspensivos
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

// Formatea una fecha en formato ISO a un formato mas legible
export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Valida datos de un post antes de enviarlo
export const validatePostData = (postData) => {
  const errors = {};

  if (!postData.title || !postData.title.trim()) {
    errors.title = "El titulo es obligatorio";
  } else if (postData.title.trim().length < 3) {
    errors.title = "El titulo debe tener al menos 3 caracteres";
  } else if (postData.title.trim().length > 100) {
    errors.title = "El titulo no puede exceder los 100 caracteres";
  }

  if (!postData.body || !postData.body.trim()) {
    errors.body = "El contenido es obligatorio";
  } else if (postData.body.trim().length < 10) {
    errors.body = "El contenido debe tener al menos 10 caracteres";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Manejador de errores para llamadas a la API
export const handleApiError = (error) => {
  // Si el error tiene una respuesta de la API
  if (error.response) {
    const { status } = error.response;

    // Errores comunes basados en codigos HTTP
    switch (status) {
      case 400:
        return "La solicitud no es valida. Por favor, verifica los datos enviados.";
      case 401:
        return "No tienes permisos para realizar esta accion.";
      case 404:
        return "El recurso solicitado no existe.";
      case 500:
        return "Ha ocurrido un error en el servidor. Intenta de nuevo mas tarde.";
      default:
        return `Error ${status}: ${
          error.response.statusText || "Ha ocurrido un error desconocido"
        }`;
    }
  }

  // Si hay un error al configurar la peticion
  if (error.request) {
    return "No se pudo conectar con el servidor. Verifica tu conexion a internet.";
  }

  // Para otros tipos de errores
  return error.message || "Ha ocurrido un error desconocido";
};
