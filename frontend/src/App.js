import React from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './Home';
import About from './About';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home}></Route>
      <Route path="/about" component={About}></Route>
    </BrowserRouter>
  );
}

export default App;
