// Imports
import React, { useState, useEffect } from 'react';
import Header from "./components/Header"
import axios, { AUTH_TOKEN } from 'axios'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

// Componente que retorna um Titulo "Home".
const Home = () => {
  return <h1>Home</h1>
}

// Componente que retorna um Titulo "Genero".
const Generos = () => {
  return <h1>Generos</h1>
}

axios.defaults.baseURL = 'https://localhost:3002/';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

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
        <Route path="/generos" component={Generos} />
        <pre>{JSON.stringify(data)}</pre>
      </div>
    </Router>
  );
}

export default App;
