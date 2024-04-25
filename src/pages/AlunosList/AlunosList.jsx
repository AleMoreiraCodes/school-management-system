import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import './style.css'; // Importe o arquivo CSS para aplicar estilos
import Dropdown from '../../components/Dropdown/Dropdown';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';


const AlunosList = () => {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cursoSelecionado, setCursoSelecionado] = useState('');
  const [turmaSelecionada, setTurmaSelecionada] = useState('');
  const [cursosOptions, setCursosOptions] = useState([]);
  const [turmasOptions, setTurmasOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/cursos/');
        setCursosOptions(response.data);
      } catch (error) {
        console.error('Erro ao buscar cursos:', error);
      }
    };

    fetchCursos();
  }, []);

  useEffect(() => {
    const fetchTurmasDoCurso = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/turmas/curso/${cursoSelecionado}`);
        setTurmasOptions(response.data);
      } catch (error) {
        console.error('Erro ao buscar turmas do curso:', error);
      }
    };

    if (cursoSelecionado !== '') {
      fetchTurmasDoCurso();
    }
  }, [cursoSelecionado]);

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

    if (turmaSelecionada !== '') {
      fetchData();
    }
  }, [turmaSelecionada]);

  const handleCursoChange = (cursoId) => {
    setCursoSelecionado(cursoId);
    // Limpar os alunos ao selecionar um novo curso
    setAlunos([]);
    setTurmaSelecionada('');
  };

  const handleTurmaChange = (turmaId) => {
    setTurmaSelecionada(turmaId);
    // Limpar os alunos ao selecionar uma nova turma
    setAlunos([]);
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
        <Dropdown options={cursosOptions} onChange={handleCursoChange} placeHolder='Selecione o curso' />
        <Dropdown options={turmasOptions} onChange={handleTurmaChange} placeHolder='Selecione a turma'/>
      </div>
      <div className="alunos-list-container">
        <h3>Estudantes: </h3>
        <table className="alunos-table">
          <thead>
            <tr>
              <th id='matriculaHeader'>Matrícula</th>
              <th id='nomeHeader'>Nome</th>
              <th id='editHeader'>Editar</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <tr key={aluno.idAluno} >
                <td id='matricula'>{aluno.matricula}</td>
                <td id='nome' >
                    {aluno.nome}
                </td>
                <td id='edit'>
                  <Link to={`/Estudante/${aluno.idAluno}`}>
                    <FontAwesomeIcon id='editIcon' icon={faPencilAlt} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlunosList;
