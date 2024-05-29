import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropdown from '../../components/Dropdown/Dropdown';
import './style.css';

const GerenciaCursos = () => {
    const [cursos, setCursos] = useState([]);
    const [disciplinas, setDisciplinas] = useState([]);
    const [cursoSelecionado, setCursoSelecionado] = useState(null); 
    const [loadingCursos, setLoadingCursos] = useState(true);
    const [loadingDisciplinas, setLoadingDisciplinas] = useState(false);
    
    useEffect(() => {
        fetchCursos();
    }, []);

    const fetchCursos = async () => {
        try {
            const response = await axios.get('http://localhost:8080/cursos/');
            setCursos(response.data);
        } catch (error) {
            console.error('Erro ao buscar cursos:', error);
        } finally {
            setLoadingCursos(false);
        }
    };

    const fetchDisciplinas = async (id) => {
        setLoadingDisciplinas(true);
        try {
            const response = await axios.get(`http://localhost:8080/disciplinas/curso/${id}`);
            setDisciplinas(response.data);
        } catch (error) {
            console.error('Erro ao buscar disciplinas:', error);
        } finally {
            setLoadingDisciplinas(false);
        }
    };

    const handleCursoChange = (curso) => {
        setCursoSelecionado(curso.nome);
        fetchDisciplinas(curso.id);
    };

    return (
        <div>
            <h1>Gerenciar Cursos</h1>
            <div className='main'>
                <div className='cursos-container'>
                    {loadingCursos ? (
                        <p>Carregando cursos...</p>
                    ) : (
                        <Dropdown options={cursos} onChange={handleCursoChange} placeHolder='Selecione o curso' />
                    )}
                </div>

                <div className='disciplinas-container'>
                    {cursoSelecionado && (
                        <>
                            <h2>Grade de {cursoSelecionado}</h2>
                            {loadingDisciplinas ? (
                                <p>Carregando disciplinas...</p>
                            ) : (
                                <table className='tb-disciplinas'>
                                    <thead>
                                        <tr>
                                            <th>Ordem</th>
                                            <th>Nome</th>
                                            <th>Carga Horária</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {disciplinas.map((disciplina) => (
                                            <tr key={disciplina.id}>
                                                <td>{disciplina.ordem}</td>
                                                <td>{disciplina.nome}</td>
                                                <td>{disciplina.cargaHoraria}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GerenciaCursos;
