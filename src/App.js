import React, { useState, useEffect } from 'react';
import Header from "./components/Header"
import axios, { AUTH_TOKEN } from 'axios'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

const Home = () => {
  return <h1>Home</h1>
}

const Generos = () => {
  return <h1>Generos</h1>
}

axios.defaults.baseURL = 'https://localhost:3002/';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function App() {
  const [data, setData] = useState({})
  useEffect(() => {
    axios.get("/api").then(res => {
      setData(res.data)
    })
  }, [])
  return (
    <Router>
      <div>
        <Header />
        <script type="text/javascript" src="https://www.turnjs.com/lib/turn.min.js "></script>
        <Route path="/" exact component={Home} />
        <Route path="/generos" component={Generos} />
        <pre>{JSON.stringify(data)}</pre>
      </div>
    </Router>
  );
}

export default App;
