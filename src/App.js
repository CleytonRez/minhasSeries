// Imports
import React, { useState, useEffect } from 'react';
import Header from "./components/Header"
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'

import {
  NavButton,
  NavLink
} from "reactstrap"

import Generos from './components/Generos';
import NovoGenero from './components/NovoGenero';
import EditarGenero from './components/EditarGenero';
import Series from './components/Series';
import NovaSerie from './components/NovaSerie';
import InfoSerie from './components/InfoSerie';


// Componente que retorna um Titulo "Home".
const Home = () => {
  return ( 
    <div className='home'>
      <h1>Home</h1>
      <br/>
        <NavLink tag={Link} to="/series" className='btn btn-warning'><span className='fontColor'>Séries</span></NavLink>
        <br/>
        <NavLink tag={Link} to="/generos" className='btn btn-danger'><span className='fontColor'>Genêros</span></NavLink>


    </div>
  )
}


// Componente Principal.
function App() {

  // Retorna a Pagina Principal.
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/generos" exact component={Generos} />
          <Route path="/generos/novo" exact component={NovoGenero} />
          <Route path="/generos/:id" exact component={EditarGenero} />
          <Route path="/series" exact component={Series} />
          <Route path="/series/novo" exact component={NovaSerie} />
          <Route path="/series/:id" exact component={InfoSerie} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
