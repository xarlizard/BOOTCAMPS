import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";

import styles from "./Cancion.module.css";

import canciones from "../assets/data.json";

import slugify from "../utils/slugify";

const Cancion = () => {
  const { songName } = useParams();
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);
  const [cancion, setCancion] = useState(null);

  // Aseguramos que songName existe (si esto fuera un fetch async tambien funcionaria)
  useEffect(() => {
    if (!canciones || canciones.length === 0) return;
    const found = canciones.find((c) => slugify(c.titulo) === songName);
    if (!found) {
      setNotFound(true);
    } else {
      setCancion(found);
    }
  }, [songName]);

  useEffect(() => {
    if (notFound) {
      navigate("/404", { replace: true });
    }
  }, [notFound, navigate]);

  if (!canciones || canciones.length === 0) {
    return (
      <div
        className={styles["cancion-root"]}
        style={{
          textAlign: "center",
          color: "var(--color1)",
          fontSize: "2rem",
        }}
      >
        Cargando...
      </div>
    );
  }

  if (!cancion) {
    return null; // Esperamos al useEffect
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
