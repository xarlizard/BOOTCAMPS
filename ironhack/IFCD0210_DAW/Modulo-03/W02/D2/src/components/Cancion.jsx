import { useParams, useNavigate } from "react-router";
import styles from "./Cancion.module.css";

import canciones from "../assets/data.json";
import slugify from "../utils/slugify";

const Cancion = () => {
  const { songName } = useParams();
  const navigate = useNavigate();
  const cancion = canciones.find((c) => slugify(c.titulo) === songName);

  if (!cancion) {
    navigate("/404", { replace: true });
    return null;
  }

  return (
    <div className={styles["cancion-root"]}>
      <img
        src={cancion.imagenAlbum}
        alt="fondo"
        className={styles["cancion-bg"]}
      />
      <div className={styles["cancion-card"]}>
        <h2>{cancion.titulo}</h2>
        <img src={cancion.imagenAlbum} alt={cancion.album} />
        <p>
          <strong>Álbum:</strong> {cancion.album}
        </p>
        <p>
          <strong>Duración:</strong> {cancion.duracion} s
        </p>
        <p>
          <strong>Valoración:</strong> {cancion.valoracion}/10
        </p>
        <button
          onClick={() => navigate("/home")}
          className={styles["volver-btn"]}
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default Cancion;
