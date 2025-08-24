import styles from "./Apellidos.module.css";

function Apellidos({ data: apellidos = "Apellidos" }) {
  return <h2 className={styles.apellidos}>{apellidos}</h2>;
}

export default Apellidos;
