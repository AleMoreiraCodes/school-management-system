import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AlunosList from './pages/AlunosList/AlunosList';
import Estudante from './pages/Estudante/FormAtualizacaoEstudante';
import CadastroEstudante from './pages/CadastroEstudante/CadastroEstudante';
import ProfList from './pages/ProfList/ProfList';
import FormAtualizacaoProfessor from './pages/AtualizaProfessores/FormAtualizacaoProfessor';
import CadastroProfessor from './pages/CadastroProfessor/CadastroProfessor';

function App() {
  return (
    <div > 
      <Router>
        <Navbar /> 
          <Routes className='pages'>
            <Route path="/" element={<Home />} />
            <Route exact path="/AlunosList" element={<AlunosList />} />
            <Route path="/FormAtualizacaoEstudante/:id" element={<Estudante />} />
            <Route path="/CadastroEStudante" element={<CadastroEstudante />} />
            <Route path="/ProfList" element={<ProfList />} />
            <Route path="/FormAtualizacaoProfessor/:id" element={<FormAtualizacaoProfessor />} />
            <Route path="/CadastroProfessor" element={<CadastroProfessor />} />
          </Routes>
          
      </Router>
    </div>
  );
}

export default App;
