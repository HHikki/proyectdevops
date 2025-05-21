import { useState } from "react";
import "./App.css";
import Navbar from "./componets/Navbar";
import Button_A from "./componets/Button_A";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Button_A />
    </>
  );
}

export default App;
