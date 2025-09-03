# Proyecto React: Ironhack Modulo 3 Semana 3 Dia 1

Este proyecto implementa un CRUD completo conectado a la API de JSONPlaceholder para gestionar posts.

## Estructura de datos

La aplicación trabaja con posts que tienen la siguiente estructura:

```js
{
  "userId": 1,
  "id": 1,
  "title": "Título del post",
  "body": "Contenido del post"
}
```

> `https://jsonplaceholder.typicode.com/posts`

## Componentes en la carpeta [`components`](./src/components/)

La carpeta [`src/components`](./src/components/) contiene los siguientes archivos principales:

- [`Posts.jsx`](./src/components/Posts.jsx): Componente principal que gestiona toda la lógica CRUD para los posts.
- [`PostForm.jsx`](./src/components/PostForm.jsx): Formulario reutilizable para crear y editar posts.
- [`CustomButton.jsx`](./src/components/CustomButton.jsx): Componente de botón personalizado y reutilizable con diferentes estilos según el tipo (crear, editar, eliminar, etc.).
- [`Posts.module.css`](./src/components/Posts.module.css): Archivo de estilos CSS modernos y responsive para todos los componentes.

## Utilidades en la carpeta [`utils`](./src/utils/)

La carpeta [`src/utils`](./src/utils/) contiene funciones de ayuda para la aplicación:

- [`helpers.js`](./src/utils/helpers.js): Funciones de utilidad como validación de formularios, manejo de errores de API y formateo de datos.

## Funcionamiento del CRUD

La aplicación implementa las siguientes operaciones:

- **Crear (Create)**: Permite crear un nuevo post mediante un formulario.
- **Leer (Read)**: Carga y muestra automáticamente todos los posts al iniciar la aplicación.
- **Actualizar (Update)**: Permite editar posts existentes mediante un formulario.
- **Eliminar (Delete)**: Permite eliminar posts con confirmación previa mediante una ventana de diálogo.

## Ejemplos en la carpeta [`examples`](./src/examples/)

La carpeta [`examples`](./src/examples/) contiene ejemplos de respuestas JSON de la API para cada tipo de operación CRUD:

- [`GET.json`](./src/examples/GET.json): Ejemplo de respuesta al obtener posts.
- [`POST.json`](./src/examples/POST.json): Ejemplo de respuesta al crear un nuevo post.
- [`PUT.json`](./src/examples/PUT.json): Ejemplo de respuesta al actualizar un post existente.
- [`DELETE.json`](./src/examples/DELETE.json): Ejemplo de respuesta al eliminar un post.

## Limitaciones conocidas

### Bug predecible con la API JSONPlaceholder

**IMPORTANTE**: Existe un bug predecible al utilizar la API de JSONPlaceholder. Cada vez que se realiza una llamada POST para crear un nuevo post, la API siempre devuelve un objeto con `id: 101`. Esto causa un problema cuando:

1. Se crean múltiples posts (todos tendrán id: 101)
2. Se intenta eliminar uno de estos posts

Como no podemos rastrear cuál de los múltiples posts con id 101 ha sido eliminado (si no son todos), estos pueden quedar "atascados" en nuestro array de posts mostrados. Esta limitación es inherente a la naturaleza de demostración de JSONPlaceholder, que no está diseñado para mantener datos persistentes reales.

## Personalización

- Los colores y estilos principales se definen como variables CSS en [`index.css`](./src/index.css), permitiendo cambiar el tema general del proyecto simplemente modificando los valores de estas variables.

---

> Programado por [@xarlizard](https://github.com/xarlizard)
