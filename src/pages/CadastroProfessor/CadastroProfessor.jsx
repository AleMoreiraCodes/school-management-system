import React, { useState, useEffect } from 'react';
import Dropdown from '../../components/Dropdown/Dropdown';
import Input from '../../components/Input/Input';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './style.css';

const CadastroProfessor = () => {
    const [professorData, setProfessorData] = useState({
        nome: '',
        email: '',
        telefone: '',
        especialidade: '',
        idCurso: '',
    });
    const [cursoSelecionado, setCursoSelecionado] = useState('');
    const [cursosOptions, setCursosOptions] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchCursos = async () => {
            try {
                const response = await axios.get('http://localhost:8080/cursos/');
                setCursosOptions(response.data);
            } catch (error) {
                console.error('Erro ao obter cursos:', error);
            }
        };

        fetchCursos();
    }, []);

    const handleInputChange = (campo, valor) => {
        setProfessorData((prevData) => ({
            ...prevData,
            [campo]: valor,
        }));
    };

    const handleCursoChange = (cursoId) => {
        setCursoSelecionado(cursoId);
    };

    const handleCadastrarProfessor = async () => {
        const updatedProfessorData = {
            ...professorData,
            idCurso: cursoSelecionado,
        };

        try {
            const response = await axios.post('http://localhost:8080/professores/', updatedProfessorData);
            console.log('Professor cadastrado:', response.data);
            setErrorMessage('');
            setSuccessMessage('Professor cadastrado com sucesso!');
        } catch (error) {
            console.error('Erro ao cadastrar professor:', error);
            setSuccessMessage('');
            setErrorMessage('Erro ao cadastrar o professor. Por favor, entre em contato com o administrador e tente novamente mais tarde.');
        }
    };

    return (
        <>
            <div>
                <h1>Cadastro de Professores</h1>
            </div>
            <div className='Form'>
                {errorMessage && <div className='error-message'>{errorMessage}</div>}
                {successMessage && <div className='success-message'>{successMessage}</div>}
                <div className='FormRow'>
                    <Input label="Nome:" campoValue={professorData.nome} campo='nome' handleInputChange={handleInputChange} />
                    <Input label="E-mail:" campoValue={professorData.email} campo='email' handleInputChange={handleInputChange}/>
                </div>
                <div className='FormRow'>
                    <Input label="Telefone:" campoValue={professorData.telefone} campo='telefone' handleInputChange={handleInputChange}/>
                    <Input label="Especialidade:" campoValue={professorData.especialidade} campo='especialidade' handleInputChange={handleInputChange}/>
                </div>
                <div>
                    <button className='btn-cadastrar' onClick={handleCadastrarProfessor}>Cadastrar Professor</button>
                    <Link className='standardBtn' to={`/ProfList`}>Voltar</Link>
                </div>
            </div>
        </>
    );
};

export default CadastroProfessor;
