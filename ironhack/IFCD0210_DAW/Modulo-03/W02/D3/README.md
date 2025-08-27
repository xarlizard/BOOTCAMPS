# Proyecto React: Ironhack Modulo 3 Semana 2 Dia 3

Este proyecto muestra un formulario de contacto hecho con React 19

## Estructura de datos

El formulario gestiona el estado de los siguientes campos:

```js
{
  nombre: "",
  email: "",
  mensaje: ""
}
```

Todos los datos se almacenan en el estado del componente y se muestran en pantalla tras el envío.

## Componentes en la carpeta [`components`](./src/components/)

La carpeta [`src/components`](./src/components/) contiene los siguientes archivos principales:

- [`Formulario.jsx`](./src/components/Formulario.jsx): Componente principal del formulario de contacto. Gestiona el estado de los campos, muestra un estado de carga al enviar y una confirmación con los datos enviados.
- [`Formulario.module.css`](./src/components/Formulario.module.css): Archivo de estilos CSS modernos y responsive para el formulario y la pantalla de confirmación.

## Funcionamiento del formulario

- El formulario permite introducir nombre, email y mensaje.
- Al pulsar "Enviar", se muestra un estado de carga durante 2 segundos.
- Tras el envío, aparece una pantalla de confirmación con un símbolo de tick y los datos introducidos.
- Un botón permite volver al formulario para rellenarlo de nuevo desde cero.
- Todos los colores y estilos principales se definen como variables CSS en [`index.css`](./src/index.css), permitiendo cambiar el tema general del proyecto simplemente cambiando los valores de estas variables.

## Personalización

- Para cambiar los campos del formulario, edita el estado inicial en [`Formulario.jsx`](./src/components/Formulario.jsx).
- Para modificar el diseño, edita los estilos en [`Formulario.module.css`](./src/components/Formulario.module.css) y las variables en [`index.css`](./src/index.css).

---

> Programado por [@xarlizard](https://github.com/xarlizard)
