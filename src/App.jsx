import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Button_A from "./components/Button_A";
import Button_l from "./components/Button_l";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Button_A />
      <div className="flex items-center justify-center h-[400px]">
        <Button_l>Hola mundo soy un boton</Button_l>
      </div>
      
    </>
  );
}

export default App;
