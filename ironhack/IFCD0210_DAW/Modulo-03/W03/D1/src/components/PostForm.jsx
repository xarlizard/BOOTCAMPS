import { useState } from "react";

import styles from "./Posts.module.css";

import CustomButton from "./CustomButton";

import { validatePostData } from "../utils/helpers";

const PostForm = ({ post, onSubmit, onCancel, submitLabel }) => {
  const [formData, setFormData] = useState({
    title: post?.title || "",
    body: post?.body || "",
    userId: post?.userId || 1, // Valor por defecto
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validacion avanzada usando la funcion de helpers
    const validation = validatePostData(formData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    // Limpiar errores previos
    setFormErrors({});

    const success = await onSubmit(formData);
    if (success) {
      // Limpiar formulario si es exitoso
      if (!post) {
        setFormData({ title: "", body: "", userId: 1 });
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>{post ? "Editar Post" : "Crear Nuevo Post"}</h2>
      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>
          Título:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`${styles.input} ${
            formErrors.title ? styles.inputError : ""
          }`}
          placeholder="Introduce el título del post"
          required
        />
        {formErrors.title && (
          <div className={styles.fieldError}>{formErrors.title}</div>
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="body" className={styles.label}>
          Contenido:
        </label>
        <textarea
          id="body"
          name="body"
          value={formData.body}
          onChange={handleChange}
          className={`${styles.textarea} ${
            formErrors.body ? styles.inputError : ""
          }`}
          placeholder="Introduce el contenido del post"
          required
          rows={5}
        />
        {formErrors.body && (
          <div className={styles.fieldError}>{formErrors.body}</div>
        )}
      </div>
      <div className={styles.formActions}>
        <CustomButton type="cancelar" text="Cancelar" onClick={onCancel} />{" "}
        <CustomButton
          type={submitLabel === "Actualizar" ? "actualizar" : "guardar"}
          text={submitLabel || "Guardar"}
          buttonType="submit"
        />
      </div>
    </form>
  );
};

export default PostForm;
