import { Route, Routes, Navigate } from "react-router";

import Canciones from "../components/Canciones";
import Cancion from "../components/Cancion";
import Error404 from "../components/Error404";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Canciones />} />
      <Route path="/home" element={<Canciones />} />
      <Route path="/:songName" element={<Cancion />} />
      <Route path="/404" element={<Error404 />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default AppRouter;
