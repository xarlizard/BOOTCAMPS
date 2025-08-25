import "./App.css";
import Canciones from "./components/Canciones";
import Aficiones from "./components/Aficiones";
import canciones from "./assets/data.json";

function App() {
  return (
    <div className="app-container">
      <Canciones data={canciones} />
      <Aficiones />
    </div>
  );
}

export default App;
