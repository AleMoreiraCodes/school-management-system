import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Importe o hook useParams do react-router-dom
import Dropdown from '../../components/Dropdown/Dropdown';
import Input from '../../components/Input/Input';
import axios from 'axios'; // Importe o axios
import './style.css'

const Estudante = () => {
    const [alunoData, setAlunoData] = useState({
        nome: '',
        dataNascimento: '',
        turma: '',
        curso: '',
        email: '',
        telefone: '',
        cep: '',
        matricula: '',
        endereco: ''
    });

    const [errorMessage, setErrorMessage] = useState(''); // Estado para exibir mensagens de erro
    const { id } = useParams(); // Extraia o id do estudante do path

    useEffect(() => {
        // Função para buscar os dados do estudante
        const buscarEstudante = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/alunos/${id}`);
                const data = await response.data;
                setAlunoData(data); // Atualize o estado com os dados recebidos
            } catch (error) {
                console.error('Erro ao buscar dados do estudante:', error);
            }
        };

        buscarEstudante(); // Dispare a busca quando o componente for montado
    }, [id]);

    const handleInputChange = (campo, valor) => {
        console.log(alunoData)
        setAlunoData((prevData) => ({
            ...prevData,
            [campo]: valor,
        }));
        console.log(alunoData)
    };

    const handleAtualizarEstudante = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/alunos/${id}`, alunoData);
            console.log('Dados do estudante atualizados:', response.data);
            // Lógica para lidar com o sucesso da atualização, como redirecionar ou exibir uma mensagem
        } catch (error) {
            console.error('Erro ao atualizar estudante:', error);
            setErrorMessage('Erro ao atualizar o estudante. Por favor, entre em contato com o administrador e tente novamente mais tarde.');
            // Lógica para lidar com o erro, como exibir uma mensagem ao usuário
        }
    };


    return (
        <>
            <div className='Form'>
                 {/* Adicionar a exibição da mensagem de erro */}
                {errorMessage && <div className='error-message'>{errorMessage}</div>}
                <div className='FormRow'>
                    <Input label="Nome:" campoValue={alunoData.nome} nmCampo='Nome:' campo='nome' handleInputChange={handleInputChange} />
                    <Input label="E-mail:" campoValue={alunoData.email} nmCampo="E-mail:" campo='email' handleInputChange={handleInputChange}/>
                </div>
                <div className='FormRow'>
                    <Input label="Data Nascimento:" campoValue={alunoData.dataNascimento} nmCampo="dataNascimento" campo='dataNascimento' handleInputChange={handleInputChange}/>
                    <Input label="Telefone:" campoValue={alunoData.telefone} nmCampo="Telefone:" campo='telefone' handleInputChange={handleInputChange}/>
                    <Input label="Matrícula:" campoValue={alunoData.matricula} nmCampo="Matricula:" campo='matricula' handleInputChange={handleInputChange}/>
                </div>
                <div className='FormRow'>
                    {/*<Input label="CEP:" campoValue={alunoData.cep} nmCampo="Cep:" campo='cep' handleInputChange={handleInputChange}/>*/}
                    <Input label="Endereço:" campoValue={alunoData.endereco} nmCampo="Endereco:" campo='endereco' handleInputChange={handleInputChange}/>
                </div>
                <button className='btnAtualizar' onClick={handleAtualizarEstudante}>Atualizar</button>
            </div>
        </>
    );
};

export default Estudante;
