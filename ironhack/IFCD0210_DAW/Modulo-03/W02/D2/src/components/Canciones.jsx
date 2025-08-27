import styles from "./Canciones.module.css";
import { useNavigate } from "react-router";
import { useState } from "react";

import canciones from "../assets/data.json";
import slugify from "../utils/slugify";

const Canciones = () => {
  const navigate = useNavigate();
  const [showMinutes, setShowMinutes] = useState(false);
  return (
    <div className={styles["cancion-list"]}>
      <h2>Lista de Canciones</h2>
      <div className={styles["cancion-header"]}>
        <div className={styles["cancion-img-col"]}>Álbum</div>
        <div className={styles["cancion-col"]}>Título</div>
        <div className={styles["cancion-col"]}>Álbum</div>
        <div className={styles["cancion-col"]}>
          <button
            className={styles["duracion-toggle-btn"]}
            onClick={() => setShowMinutes((v) => !v)}
          >
            Duración ({showMinutes ? "min" : "seg"})
          </button>
        </div>
        <div className={styles["cancion-col"]}>Valoración</div>
      </div>
      {canciones.map((cancion, idx) => (
        <div
          key={idx}
          className={styles["cancion-item"]}
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/${slugify(cancion.titulo)}`)}
        >
          <div className={styles["cancion-img-col"]}>
            <img src={cancion?.imagenAlbum} alt={cancion?.album} />
          </div>
          <div className={styles["cancion-col"]}>{cancion?.titulo}</div>
          <div className={styles["cancion-col"]}>{cancion?.album}</div>
          <div className={styles["cancion-col"]}>
            {showMinutes
              ? `${Math.floor(cancion?.duracion / 60)}m ${
                  cancion?.duracion % 60
                }s`
              : `${cancion?.duracion} s`}
          </div>
          <div className={styles["cancion-col"]}>{cancion?.valoracion}/10</div>
        </div>
      ))}
    </div>
  );
};

export default Canciones;
