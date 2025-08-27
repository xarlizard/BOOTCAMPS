import "./App.css";
import { Route, Routes, Navigate } from "react-router";

import Canciones from "./components/Canciones";
import Cancion from "./components/Cancion";
import Error404 from "./components/Error404";


function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Canciones />} />
        <Route path="/home" element={<Canciones />} />
        <Route path=":songName" element={<Cancion />} />
        <Route path="/404" element={<Error404 />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </div>
  );
}

export default App;
