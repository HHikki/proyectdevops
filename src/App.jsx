import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './componets/button';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-green-700 font-bold" >PRISMA</h1>
      <div className="card">
        <p>
          Hola Soy Edinson Este es el inicio de la pagina prisma por chicos de <code>undc</code>
        </p>
      </div>

      <Button onClick={()=>console.log("Hola")} >touch me</Button>
      
    </>
  )
}

export default App
