import styles from "./Aficiones.module.css";

function Aficiones() {
  return (
    <div className={styles["aficiones-container"]}>
      <h2 className={styles["aficiones-title"]}>Mis Aficiones</h2>
      <ul className={styles["aficiones-list"]}>
        <li>Programacion web y blockchain</li>
        <li>Musica, tocar la guitarra y el piano</li>
        <li>Aprendizaje de nuevos idiomas (actualmente Japones e Italiano)</li>
        <li>Deportes de aventura (snowboard y submarinismo)</li>
        <li>Videojuegos de simulacion y VR</li>
      </ul>
    </div>
  );
}

export default Aficiones;
