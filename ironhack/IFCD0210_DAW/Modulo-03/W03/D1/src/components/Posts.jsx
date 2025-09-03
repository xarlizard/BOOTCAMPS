import { useState, useEffect } from "react";
import axios from "axios";

import styles from "./Posts.module.css";

import PostForm from "./PostForm";
import CustomButton from "./CustomButton";

import { handleApiError } from "../utils/helpers";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // 'list', 'create', 'edit'

  // Cargar datos al iniciar el componente
  useEffect(() => {
    fetchPosts();
  }, []);

  // Obtener todos los posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setPosts(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  // Crear un nuevo post
  const createPost = async (postData) => {
    try {
      setLoading(true);
      const response = await axios.post(API_URL, postData);

      // En JSONPlaceholder, la API no guarda realmente los datos
      // pero devuelve el objeto como si lo hubiera hecho
      // Añadimos el nuevo post al inicio de la lista para simular persistencia
      setPosts([response.data, ...posts]);
      setViewMode("list");
      return true;
    } catch (err) {
      console.error("Error creating post:", err);
      setError(handleApiError(err));
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar un post existente
  const updatePost = async (id, postData) => {
    try {
      setLoading(true);
      const response = await axios.put(`${API_URL}/${id}`, postData);

      // Actualizar el post en la lista local
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditingPost(null);
      setViewMode("list");
      return true;
    } catch (err) {
      console.error("Error updating post:", err);
      setError(handleApiError(err));
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar un post
  const deletePost = async (id) => {
    // Preguntar antes de eliminar
    const confirmDelete = window.confirm(
      "¿Estas seguro de que deseas eliminar este post?"
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`);

      // Eliminar el post de la lista local
      setPosts(posts.filter((post) => post.id !== id));
      setError(null);
    } catch (err) {
      console.error("Error deleting post:", err);
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  // Manejar la edicion de un post
  const handleEdit = (post) => {
    setEditingPost(post);
    setViewMode("edit");
  };

  // Cancelar la creacion/edicion
  const handleCancel = () => {
    setEditingPost(null);
    setViewMode("list");
  };

  return (
    <div className={styles.postsContainer}>
      <h1 className={styles.title}>Gestion de Posts</h1>
      {error && <div className={styles.error}>{error}</div>}
      {/* Botones para alternar entre vistas */}{" "}
      <div className={styles.controls}>
        {viewMode == "list" && (
          <CustomButton
            type="crear"
            text="Crear nuevo post"
            onClick={() => setViewMode("create")}
          />
        )}
      </div>
      {/* Formulario para crear/editar */}
      {viewMode === "create" && (
        <PostForm
          onSubmit={createPost}
          onCancel={handleCancel}
          submitLabel="Crear"
        />
      )}
      {viewMode === "edit" && editingPost && (
        <PostForm
          post={editingPost}
          onSubmit={(postData) => updatePost(editingPost.id, postData)}
          onCancel={handleCancel}
          submitLabel="Actualizar"
        />
      )}
      {/* Lista de posts */}
      {viewMode === "list" && (
        <div className={styles.postsList}>
          {loading && posts.length === 0 ? (
            <div className={styles.loading}>Cargando posts...</div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className={styles.postCard}>
                <h3 className={styles.postTitle}>{post.title}</h3>
                <p className={styles.postBody}>{post.body}</p>{" "}
                <div className={styles.postActions}>
                  <CustomButton
                    type="editar"
                    text="Editar"
                    onClick={() => handleEdit(post)}
                  />
                  <CustomButton
                    type="eliminar"
                    text="Eliminar"
                    onClick={() => deletePost(post.id)}
                  />
                </div>
              </div>
            ))
          )}

          {!loading && posts.length === 0 && (
            <p className={styles.emptyMessage}>No hay posts disponibles.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Posts;
