import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import "./index.css";

import AppRouter from "./routes/AppRouter.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <div className="app-container">
      <AppRouter />
    </div>
  </BrowserRouter>
);
