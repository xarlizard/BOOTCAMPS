import "./App.css";
import Nombre from "./components/Nombre";
import Apellidos from "./components/Apellidos";
import Aficiones from "./components/Aficiones";
import Imagen from "./components/Imagen";
import EnlaceInteres from "./components/EnlaceInteres";

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

function App() {
  return (
    <div className="App">
      <Nombre data={data?.nombre} />
      <Apellidos data={data?.apellidos} />
      <Aficiones data={data?.aficiones} />
      <Imagen data={data?.imagen} />
      <EnlaceInteres data={data?.interes} />
    </div>
  );
}

export default App;
