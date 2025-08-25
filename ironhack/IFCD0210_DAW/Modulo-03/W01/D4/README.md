# Proyecto React: Ironhack Modulo 3 Semana 1 Dia 4

Este proyecto muestra una lista de canciones favoritas y aficiones personales usando React.

## Estructura de datos

En el archivo [`assets/data.json`](./src/assets/data.json) existe un array de canciones:

```json
[
  {
    "titulo": "Bohemian Rhapsody",
    "album": "A Night at the Opera",
    "imagenAlbum": "https://upload.wikimedia.org/wikipedia/en/9/9f/Queen_A_Night_At_The_Opera.png",
    "duracion": 354,
    "valoracion": 10
  }
  // ...mas canciones
]
```

Las aficiones se encuentran en el componente [`Aficiones.jsx`](./src/components/Aficiones.jsx) como un array de strings.

## Componentes en la carpeta [`components`](./src/components/)

- [`Canciones.jsx`](./src/components/Canciones.jsx): Muestra la lista de canciones en un layout tipo tabla.
- [`Aficiones.jsx`](./src/components/Aficiones.jsx): Muestra las aficiones en tarjetas horizontales que se apilan y adaptan al ancho del contenedor.

Cada archivo `.jsx` importa su respectivo archivo `.module.css` para aplicar estilos modernos y responsive.

Los colores principales y el tema se definen como variables CSS en [`index.css`](./src/index.css), permitiendo cambiar el tema general del proyecto simplemente cambiando los valores de estas variables.

---

> Programado por [@xarlizard](https://github.com/xarlizard)
