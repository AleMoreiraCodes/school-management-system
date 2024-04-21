import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import './style.css'; // Importe o arquivo CSS para aplicar estilos
import Dropdown from '../../components/Dropdown/Dropdown';

const AlunosList = () => {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [turmaSelecionada, setTurmaSelecionada] = useState(''); // Estado para armazenar a turma selecionada

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/alunos/turma/${turmaSelecionada}`);
        setAlunos(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados dos alunos:', error);
        setLoading(false);
      }
    };

    if (turmaSelecionada !== '') { // Verifica se a turma foi selecionada antes de fazer a requisição
      fetchData();
    }
  }, [turmaSelecionada]); // O useEffect será executado sempre que turmaSelecionada mudar

  const handleBuscarAlunos = () => {
    // Chama a função para buscar os alunos apenas se uma turma foi selecionada
    if (turmaSelecionada !== '') {
      //setLoading(true); // Define loading como true enquanto a requisição é feita
      // O useEffect será acionado novamente devido à mudança em turmaSelecionada, executando a busca dos alunos
    }
  };

  const schema = Yup.object().shape({
    matricula: Yup.string().required(),
    nome: Yup.string().required(),
    turma: Yup.string().required(),
    idCurso: Yup.number().required(),
    dataNasc: Yup.string().required(),
    idAluno: Yup.number().required(),
    email: Yup.string().email().required(),
    endereco: Yup.string().required(),
    telefone: Yup.string().required(),
    idTurma: Yup.number().required(),
  });

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  return (
    <div>
      <div className="alunos-form-container">
        <h1>Estudantes por turma</h1>
      </div>
      <div className='FormRow'>
        {/* Dropdown para selecionar a turma */}
        <select value={turmaSelecionada} onChange={(e) => setTurmaSelecionada(e.target.value)}>
          <option value="">Selecione a turma</option>
          <option value="1">Turma 1</option>
          <option value="2">Turma 2</option>
          <option value="3">Turma 3</option>
        </select>
        {/* Botão para buscar os alunos da turma selecionada */}
        <button onClick={handleBuscarAlunos}>Buscar Alunos</button>
      </div>
      <div className="alunos-list-container">
        <h3>Estudantes da turma {turmaSelecionada}</h3>
        <table className="alunos-table">
          <thead>
            <tr>
              <th>Matrícula</th>
              <th>Nome</th>
              <th>Data de Nascimento</th>
              <th>Email</th>
              <th>Endereço</th>
              <th>Telefone</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <tr key={aluno.idAluno}>
                <td>{aluno.matricula}</td>
                <td>{aluno.nome}</td>
                <td>{aluno.dataNasc}</td>
                <td>{aluno.email}</td>
                <td>{aluno.endereco}</td>
                <td>{aluno.telefone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlunosList;
