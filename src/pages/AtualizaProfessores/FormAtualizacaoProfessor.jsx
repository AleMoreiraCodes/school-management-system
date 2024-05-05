import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Input from '../../components/Input/Input';
import axios from 'axios';
import './style.css';
import { Link } from 'react-router-dom';

const FormAtualizacaoProfessor = () => {
    const [professorData, setProfessorData] = useState({
        nome: '',
        email: '',
        telefone: '',
        especialidade: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { id } = useParams();

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
        </>
    );
};

export default FormAtualizacaoProfessor;
