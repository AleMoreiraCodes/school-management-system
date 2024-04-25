import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import AlunosList from './pages/AlunosList/AlunosList';
import Estudante from './pages/Estudante/Estudante';

function App() {
  return (
    <div > 
      <Router>
        <Navbar /> 
          <Routes className='pages'>
            <Route path="/" element={<Home />} />
            <Route exact path="/AlunosList" element={<AlunosList />} />
            <Route path="/About" element={<About />} />
            <Route path="/Estudante/:id" element={<Estudante />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
