# Proyecto React: Ironhack Modulo 3 Semana 2 Dia 2

Este proyecto muestra una lista de canciones favoritas usando React, con navegación entre ellas mediante React Router y una página de error 404 cuando la ruta no existe.

## Estructura de datos

En el archivo [`src/assets/data.json`](./src/assets/data.json) existe un array de objetos, cada uno representando una canción:

```json
[
  {
    "titulo": "Bohemian Rhapsody",
    "album": "A Night at the Opera",
    "imagenAlbum": "...",
    "duracion": 354,
    "valoracion": 10
  }
  // ...más canciones
]
```

Cada objeto contiene el título, álbum, imagen, duración en segundos y valoración de la canción.

## Componentes en la carpeta [`components`](./src/components/)

La carpeta [`src/components`](./src/components/) contiene los siguientes archivos principales:

- [`Canciones.jsx`](./src/components/Canciones.jsx): Muestra la lista de canciones en formato tabla. Permite alternar la visualización de la duración entre segundos y minutos/segundos. Al hacer clic en una canción, navega a la página de detalle.
- [`Cancion.jsx`](./src/components/Cancion.jsx): Muestra la información detallada de una canción seleccionada, con fondo personalizado y botón para volver.
- [`Error404.jsx`](./src/components/Error404.jsx): Página de error que se muestra cuando la ruta no existe o la canción no se encuentra.
- [`Canciones.module.css`](./src/components/Canciones.module.css), [`Cancion.module.css`](./src/components/Cancion.module.css): Archivos de estilos CSS modernos y responsive para cada componente.
- [`utils/slugify.js`](./src/utils/slugify.js): Función para convertir títulos de canciones en slugs para las rutas.

## Funcionamiento de la navegación

- Rutas definidas en [`src/App.jsx`](./src/App.jsx)
- La ruta principal `/` muestra la lista de canciones.
- Al hacer clic en una canción, se navega a `/:songName`, donde `songName` es el slug generado a partir del título.
- Si la canción no existe, se redirige automáticamente a la página de error `/404`.

## Personalización

- Para cambiar las canciones, edita el archivo [`data.json`](./src/assets/data.json).
- Los colores y estilos principales se definen como variables CSS en [`index.css`](./src/index.css), permitiendo cambiar el tema general del proyecto simplemente cambiando los valores de estas variables.

---

> Programado por [@xarlizard](https://github.com/xarlizard)
