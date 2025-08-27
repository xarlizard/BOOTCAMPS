import { useState } from "react";

import styles from "./Formulario.module.css";

const initialState = {
  nombre: "",
  email: "",
  mensaje: "",
};

const Formulario = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [sentData, setSentData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 2000));
    setLoading(false);
    setSent(true);
    setSentData(form);
  };

  const handleReset = () => {
    setForm(initialState);
    setSent(false);
    setSentData(null);
  };

  if (sent) {
    return (
      <div
        className={`${styles.formularioRoot} ${styles.confirmationContainer}`}
      >
        <div className={styles.tick}>✓</div>
        <h2 className={styles.formTitle}>Formulario enviado</h2>
        <div className={styles.confirmationData}>
          <div>
            <strong>Nombre:</strong> {sentData.nombre}
          </div>
          <div>
            <strong>Email:</strong> {sentData.email}
          </div>
          <div>
            <strong>Mensaje:</strong> {sentData.mensaje}
          </div>
        </div>
        <button className={styles.formButton} onClick={handleReset}>
          Volver al formulario
        </button>
      </div>
    );
  }

  return (
    <form className={styles.formularioRoot} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>Contacto</h2>
      <label className={styles.formLabel}>
        Nombre
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          className={styles.formInput}
          required
          disabled={loading}
        />
      </label>
      <label className={styles.formLabel}>
        Email
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className={styles.formInput}
          required
          disabled={loading}
        />
      </label>
      <label className={styles.formLabel}>
        Mensaje
        <textarea
          name="mensaje"
          value={form.mensaje}
          onChange={handleChange}
          className={styles.formTextarea}
          rows={4}
          required
          disabled={loading}
        />
      </label>
      <button type="submit" className={styles.formButton} disabled={loading}>
        {loading ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
};

export default Formulario;
