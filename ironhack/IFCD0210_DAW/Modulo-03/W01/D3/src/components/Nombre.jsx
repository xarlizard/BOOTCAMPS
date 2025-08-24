import styles from "./Nombre.module.css";

function Nombre({ data: nombre = "Nombre" }) {
  return <h1 className={styles.nombre}>{nombre}</h1>;
}

export default Nombre;
