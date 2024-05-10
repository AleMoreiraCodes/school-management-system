import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Input from '../../components/Input/Input';
import axios from 'axios';
import './style.css';
import { FaTrash } from 'react-icons/fa';

const FormAtualizacaoProfessor = () => {
    const [professorData, setProfessorData] = useState({
        nome: '',
        email: '',
        telefone: '',
        especialidade: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [relacaoProfDiscList, setRelacaoProfDiscList] = useState([]);  
    const [disciplinasDisponiveis, setDisciplinasDisponiveis] = useState([]);
    const { id } = useParams();

    const fetchRelacaoProfDisc = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/profdisc/professor/${id}`);
            setRelacaoProfDiscList(response.data);
        } catch (error) {
            console.error('Erro ao buscar dados da relação professor-disciplina:', error);
        }
    };

    useEffect(() => {
        const buscarProfessor = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/professores/${id}`);
                const data = await response.data;
                setProfessorData(data);
            } catch (error) {
                console.error('Erro ao buscar dados do professor:', error);
            }
        };

        buscarProfessor();
    }, [id]);

    useEffect(() => {
        fetchRelacaoProfDisc();
    }, [id]);

    useEffect(() => {
        const fetchDisciplinasDisponiveis = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/disciplinas/professor/${id}`);
                setDisciplinasDisponiveis(response.data);
                console.log('Disciplinas disponíveis:', response.data);
            } catch (error) {
                console.error('Erro ao buscar disciplinas disponíveis:', error);
            }
        };
    
        fetchDisciplinasDisponiveis();
    }, []);

    const handleInputChange = (campo, valor) => {
        setProfessorData((prevData) => ({
            ...prevData,
            [campo]: valor,
        }));
    };

    const handleAtualizarProfessor = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/professores/${id}`, professorData);
            console.log('Dados do professor atualizados:', response.data);
            setSuccessMessage('Professor atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar professor:', error);
            setErrorMessage('Erro ao atualizar o professor. Por favor, entre em contato com o administrador e tente novamente mais tarde.');
        }
    };

    const handleIncluirDisciplina = async (idDisciplina) => {
        try {
            await axios.post(`http://localhost:8080/profdisc/incluir`, { idProfessor: id, idDisciplina });
            setSuccessMessage('Disciplina incluída para o professor com sucesso!');
            fetchRelacaoProfDisc();
        } catch (error) {
            console.error('Erro ao incluir disciplina:', error);
            setErrorMessage('Erro ao incluir a disciplina para o professor. Por favor, entre em contato com o administrador e tente novamente mais tarde.');
        }
    };

    const handleExcluirDisciplina = async (idRelacao) => {
        try {
            await axios.delete(`http://localhost:8080/profdisc/${idRelacao}`);
            setSuccessMessage('Disciplina excluída do professor com sucesso!');
            fetchRelacaoProfDisc();
        } catch (error) {
            console.error('Erro ao excluir disciplina:', error);
            setErrorMessage('Erro ao excluir a disciplina do professor. Por favor, entre em contato com o administrador e tente novamente mais tarde.');
        }
    };

    return (
        <>
            <h1>Atualizar Professor</h1>
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
                    <button className='btnAtualizar' onClick={handleAtualizarProfessor}>Atualizar</button>
                    <Link className='standardBtn' to={`/ProfList`}>Voltar</Link>
                </div>
            </div>

            <div>
                <h1>Relação Professor-Disciplina</h1>
                        <button onClick={() => handleIncluirDisciplina()}>Incluir Disciplina</button>
                <table  className="alunos-table">
                    <thead>
                        <tr>
                            <th id='nome'>Nome da Disciplina</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {disciplinasDisponiveis.map((disciplina) => (
                            <tr key={disciplina.idDisciplina}>
                                <td>{disciplina.nome}</td>
                                <td className='table-icon'>
                                    <FaTrash 
                                        onClick={() => handleExcluirDisciplina(disciplina.id)}
                                        className='delete-icon'
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default FormAtualizacaoProfessor;
