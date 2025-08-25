import React from "react";
import styles from "./Canciones.module.css";

function Canciones({ data: canciones = [] }) {
  return (
    <div>
      <h2>Lista de Canciones</h2>
      {canciones.map((cancion, idx) => (
        <div key={idx} className={styles["cancion-item"]}>
          <img
            src={cancion?.imagenAlbum}
            alt={cancion?.album}
            style={{ width: 80, height: 80 }}
          />
          <div>
            <strong>Título:</strong> {cancion?.titulo}
          </div>
          <div>
            <strong>Álbum:</strong> {cancion?.album}
          </div>
          <div>
            <strong>Duración:</strong> {cancion?.duracion} segundos
          </div>
          <div>
            <strong>Valoración:</strong> {cancion?.valoracion}/10
          </div>
        </div>
      ))}
    </div>
  );
}

export default Canciones;
