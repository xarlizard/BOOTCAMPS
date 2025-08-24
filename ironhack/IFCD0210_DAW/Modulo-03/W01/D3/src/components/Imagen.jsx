import styles from "./Imagen.module.css";

function Imagen({ data: imagen = { nombre: "", enlace: "" } }) {
  return (
    <div className={styles.imagenContainer}>
      <img
        src={imagen?.enlace}
        alt={imagen?.nombre}
        className={styles.imagen}
      />
    </div>
  );
}

export default Imagen;
