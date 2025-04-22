import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { AppProvider } from "@/context/AppContext";
//Nuestro layout principal (solo hay uno)
import Layout from "@/routes/Layout";
//Nuestras paginas
import Home from "@/pages/Home";
import Project from "@/pages/Project";
import Contact from "@/pages/Contact";
//Nuestros estilos
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "project",
        element: <Project />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);
