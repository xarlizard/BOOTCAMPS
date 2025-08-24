# Proyecto React: Ironhack Modulo 3 Semana 1 Dia 3

Este proyecto muestra una hoja de presentacion personal usando React, con componentes customizados.

## Estructura de datos

En el archivo [`App.jsx`](./src/App.jsx) existe una variable llamada `data`:

```js
const data = {
  nombre: "Charlie",
  apellidos: "Rios",
  aficiones: ["Musica", "Programar", "Idiomas"],
  imagen: {
    nombre: "Ironhack Logo",
    enlace: "https://ebootcamp.net/wp-content/uploads/2021/11/ironhack.jpg",
  },
  interes: { nombre: "Github", enlace: "https://github.com/" },
};
```

Esta variable contiene toda la informacion que se muestra en la pantalla: nombre, apellidos, aficiones, imagen y enlace de interes. Cada componente recibe solo la parte de la informaciosn que necesita mediante props.

## Componentes en la carpeta [`components`](./src/components/)

La carpeta [`src/components`](./src/components/) contiene los siguientes archivos:

- [`Nombre.jsx`](./src/components/Nombre.jsx): Muestra el nombre en un `<h1>` con estilos personalizados.
- [`Apellidos.jsx`](./src/components/Apellidos.jsx): Muestra los apellidos en un `<h2>` con estilos personalizados.
- [`Aficiones.jsx`](./src/components/Aficiones.jsx): Muestra una lista de aficiones en un `<ul>`, cada afición en un `<li>` estilizado.
- [`Imagen.jsx`](./src/components/Imagen.jsx): Muestra una imagen centrada y con sombra, usando los datos de la variable `data`.
- [`EnlaceInteres.jsx`](./src/components/EnlaceInteres.jsx): Muestra un enlace estilizado a una página de interés.

Cada archivo `.jsx` importa su respectivo archivo `.module.css` para aplicar estilos modernos y responsive.

Los colores principales se definen como variables CSS en [`index.css`](./src/index.css), permitiendo cambiar el tema general del proyecto simplemente cambiando los valores de estas variables.

---

> Programado por [@xarlizard](https://github.com/xarlizard)
