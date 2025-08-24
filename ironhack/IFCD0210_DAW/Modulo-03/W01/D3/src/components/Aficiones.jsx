import styles from "./Aficiones.module.css";

function Aficiones({ data: aficiones = ["Aficion1", "Aficion2"] }) {
  return (
    <>
      <h3 className={styles.header3}>Aficiones:</h3>
      <ul className={styles.listaAficiones}>
        {aficiones.map((aficion, idx) => (
          <li key={idx} className={styles.aficion}>
            {aficion}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Aficiones;
