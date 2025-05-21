import { useState } from "react";
import "./App.css";
import Navbar from "./componets/Navbar";
import Button_l from "./componets/button_l";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-[400px]">
        <Button_l>Hola mundo soy un boton</Button_l>
      </div>
      
    </>
  );
}

export default App;
