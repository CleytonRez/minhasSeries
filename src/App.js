// Imports
import React, { useState, useEffect } from 'react';
import Header from "./components/Header"
import axios from 'axios'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Generos from './components/Generos';
import NovoGenero from './components/NovoGenero';
import EditarGenero from './components/EditarGenero';

// Componente que retorna um Titulo "Home".
const Home = () => {
  return <h1>Home</h1>
}
// Componente Principal.
function App() {

  // Estadp que salva a data.
  const [data, setData] = useState({})

  // useEffect que carrega a API.
  useEffect(() => {
    axios.get("/api").then(res => {
      setData(res.data)
    })
  }, []) // [] indicando que so executa 1 vez.

  // Retorna a Pagina Principal.
  return (
    <Router>
      <div>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/generos/:id" exact component={EditarGenero} />
        <Route path="/generos/novo" exact component={NovoGenero} />
        <Route path="/generos" exact component={Generos} />
        <pre>{JSON.stringify(data)}</pre>
      </div>
    </Router>
  );
}

export default App;
