import styles from "../components/Posts.module.css";

import { 
  FaPlus, 
  FaPencilAlt, 
  FaTrash, 
  FaTimes, 
  FaCheck, 
  FaUpload
} from "react-icons/fa";

const CustomButton = ({ 
  type,                 // Tipo de boton: "crear", "editar", "eliminar", "actualizar", "cancelar"
  text,                 // Texto a mostrar en el boton
  onClick,              // Funcion a ejecutar al hacer clic en el boton
  className = "",       // Clases adicionales para el boton
  buttonType = "button" // Tipo HTML del boton (button, submit, etc)
}) => {
  // Configuracion predeterminada para cada tipo de boton
  const buttonConfig = {
    crear: {
      icon: <FaPlus />,
      baseClass: styles.buttonPrimary,
    },
    editar: {
      icon: <FaPencilAlt />,
      baseClass: `${styles.button} ${styles.editButton}`,
    },
    eliminar: {
      icon: <FaTrash />,
      baseClass: `${styles.button} ${styles.deleteButton}`,
    },
    actualizar: {
      icon: <FaCheck />,
      baseClass: styles.buttonPrimary,
    },
    guardar: {
      icon: <FaUpload />,
      baseClass: styles.buttonPrimary,
    },
    cancelar: {
      icon: <FaTimes />,
      baseClass: styles.button,
    }
  };

  // Obtener la configuracion segun el tipo, o usar valores por defecto
  const config = buttonConfig[type.toLowerCase()] || {
    icon: null,
    baseClass: styles.button,
  };

  return (
    <button
      type={buttonType}
      onClick={onClick}
      className={`${config.baseClass} ${className}`}
    >
      {config.icon} {text}
    </button>
  );
};

export default CustomButton;
