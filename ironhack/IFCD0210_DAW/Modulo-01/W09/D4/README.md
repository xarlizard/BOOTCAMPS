# Sitio Web Circle Agency

Un sitio web moderno basado en React para Circle Agency (proyecto final de Modulo-01 ironhack), mostrando su home, proyectos y pagina de contacto.

## Configuración del Proyecto

```bash
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev

# Abrir url local en navegador
http://localhost:5173

```

## Estructura del Proyecto

### Páginas

- [`Home.jsx`](./src/pages/Home.jsx) - Pagina principal
- [`Project.jsx`](./src/pages/Project.jsx) - Pagina de detalles de proyecto
- [`Contact.jsx`](./src/pages/Contact.jsx) - Pagina de contacto

### Componentes Generales

- [`Header.jsx`](./src/components/Header.jsx) - Encabezado de navegación con menú responsive
- [`Footer.jsx`](./src/components/Footer.jsx) - Pie de pagina con enlaces e información de contacto
- [`ButtonLearnMore.jsx`](./src/components/ButtonLearnMore.jsx) - Botón que se repite en diferentes componentes

### Componentes de la Pagina Home

- [`HeroSection.jsx`](./src/components/HeroSection.jsx) - Banner principal con tarjetas animadas
- [`LogosSection.jsx`](./src/components/LogosSection.jsx) - Muestra de logotipos de clientes
- [`ProjectsRow.jsx`](./src/components/ProjectsRow.jsx) - Visualización de proyectos en cuadrícula
- [`ProjectCard.jsx`](./src/components/ProjectCard.jsx) - Tarjeta individual de proyecto
- [`Testimonials.jsx`](./src/components/Testimonials.jsx) - Testimonios de clientes con animación orbital
- [`ServicesRow.jsx`](./src/components/ServicesRow.jsx) - Sección de muestra de servicios
- [`Newsletter.jsx`](./src/components/Newsletter.jsx) - Formulario de suscripción al boletín

### Componentes de la Pagina de Proyecto

- [`ProjectHero.jsx`](./src/components/ProjectHero.jsx) - Sección principal de detalles del proyecto
- [`ProjectsRow.jsx`](./src/components/ProjectsRow.jsx) - Sección de proyectos relacionados (variant: false)
- [`Newsletter.jsx`](./src/components/Newsletter.jsx) - Formulario de suscripción al boletín

### Componentes de la Pagina de Contacto

- [`ContactForm.jsx`](./src/components/ContactForm.jsx) - Formulario de contacto

## Stack Tecnológico

- React 19
- React Bootstrap
- React Router
- Vite
- CSS Modules

## Recursos del Proyecto

Todos los recursos propporcionados para empezar el proyecto están almacenados en el directorio `/google-drive-files`, siendo `mid-term-project` el fichero Figma que Ironhack presenta (archivos comprimidos a .zip para optimizar recursos):

```
google-drive-files/
├── hero-section/
├── logos/
├── newsletter/
├── projects-section/
├── testimonial-section/
└── mid-term-project/
```

La mayoria de ficheros se encuentran descomprimidos en `/public/assets` siendo asi como el resto de la aplicacion accede a ellos.

## Licencia

Este proyecto está licenciado bajo la [`Licencia MIT`](./LICENSE)
