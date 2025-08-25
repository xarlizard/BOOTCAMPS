import styles from "./Aficiones.module.css";

const aficiones = [
  "Programacion web y blockchain",
  "Musica, tocar la guitarra y el piano",
  "Aprendizaje de nuevos idiomas (actualmente Japones e Italiano)",
  "Deportes de aventura (snowboard y submarinismo)",
  "Videojuegos de simulacion y VR",
  "Series y peliculas (ciencia ficcion)",
];

function Aficiones() {
  return (
    <div className={styles["aficiones-container"]}>
      <h2 className={styles["aficiones-title"]}>Mis Aficiones</h2>
      <div className={styles["aficiones-list"]}>
        {aficiones.map((aficion, index) => (
          <div key={index} className={styles["aficion-item"]}>
            {aficion}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Aficiones;
