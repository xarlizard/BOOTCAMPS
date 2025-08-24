import styles from "./EnlaceInteres.module.css";

function EnlaceInteres({ data: interes = { nombre: "", enlace: "" } }) {
  return (
    <div className={styles.enlaceContainer}>
      <a href={interes?.enlace} target="_blank" className={styles.enlace}>
        Ir a {interes?.nombre}
      </a>
    </div>
  );
}

export default EnlaceInteres;
