import styles from "./Canciones.module.css";

function Canciones({ data: canciones = [] }) {
  return (
    <div className={styles["cancion-list"]}>
      <h2>Lista de Canciones</h2>
      <div className={styles["cancion-header"]}>
        <div className={styles["cancion-img-col"]}>Álbum</div>
        <div className={styles["cancion-col"]}>Título</div>
        <div className={styles["cancion-col"]}>Álbum</div>
        <div className={styles["cancion-col"]}>Duración</div>
        <div className={styles["cancion-col"]}>Valoración</div>
      </div>
      {canciones.map((cancion, idx) => (
        <div key={idx} className={styles["cancion-item"]}>
          <div className={styles["cancion-img-col"]}>
            <img src={cancion?.imagenAlbum} alt={cancion?.album} />
          </div>
          <div className={styles["cancion-col"]}>{cancion?.titulo}</div>
          <div className={styles["cancion-col"]}>{cancion?.album}</div>
          <div className={styles["cancion-col"]}>{cancion?.duracion} s</div>
          <div className={styles["cancion-col"]}>{cancion?.valoracion}/10</div>
        </div>
      ))}
    </div>
  );
}

export default Canciones;
