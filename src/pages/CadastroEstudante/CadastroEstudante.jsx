import React, { useState, useEffect } from 'react';
import Dropdown from '../../components/Dropdown/Dropdown';
import Input from '../../components/Input/Input';
import axios from 'axios'; // Importe o axios
import './style.css'
import { Link } from 'react-router-dom';

const CadastroEstudante = () => {
    const [alunoData, setAlunoData] = useState({
        nome: '',
        dataNasc: 29-11-2002, // Inicializado com a data atual no formato YYYY-MM-DD
        turma: '',
        curso: '',
        email: '',
        telefone: '',
        cep: '',
        matricula: '',
        endereco: '',
        idCurso: '',
        idTurma: ''
    });
    const [cursoSelecionado, setCursoSelecionado] = useState('');
    const [turmaSelecionada, setTurmaSelecionada] = useState('');
    const [cursosOptions, setCursosOptions] = useState([]);
    const [turmasOptions, setTurmasOptions] = useState([]);
    const [errorMessage, setErrorMessage] = useState(''); // Estado para exibir mensagens de erro
    const [successMessage, setSuccessMessage] = useState(''); // Estado para exibir mensagens de erro

    useEffect(() => {
        //Fetch cursos and turmas options using axios or any other method
        const fetchCursos = async () => {
            axios.get('http://localhost:8080/cursos/')
                .then(response => {
                    setCursosOptions(response.data);
                   //console.log('Cusos obtidos com sucesso:');
                })
                .catch(error => {
                    console.error('Erro ao obter cursos:', error);
                });
        };
        
        fetchCursos();

    }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

    useEffect(() => {
        //Fetch turmas options based on the selected course
        const fetchTurmasDoCurso = async () => {
            axios.get(`http://localhost:8080/turmas/curso/${cursoSelecionado}`)
                .then(response => { 
                    setTurmasOptions(response.data);
                    //console.log('Turmas obtidas com sucesso:');
                })
                .catch(error => {
                    console.error('Erro ao obter turmas do curso:', error);
                });
        };

        if (cursoSelecionado !== '') {
            fetchTurmasDoCurso();
        }

    }, [cursoSelecionado]); // This effect runs whenever the selected course changes


    const handleCadastrarEstudante = async () => {

        // Adiciona o curso e a turma selecionados aos dados do aluno
        const updatedAlunoData = {
            ...alunoData,
            idCurso: cursoSelecionado,
            idTurma: turmaSelecionada
        };

        //verifica se a data de nascimento n esta vazia
        if (!alunoData.dataNasc) {
            setErrorMessage('Data de Nascimento é obrigatória.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/alunos/', updatedAlunoData); // Use POST method for creating a new student
            console.log('Estudante cadastrado:', response.data);
            setErrorMessage('');
            setSuccessMessage('Estudante cadastrado com sucesso!');
            // Handle success, such as redirecting or displaying a success message
        } catch (error) {
            console.error('Erro ao cadastrar estudante:', error);
            setSuccessMessage('');
            setErrorMessage('Erro ao cadastrar o estudante. Por favor, entre em contato com o administrador e tente novamente mais tarde.');
            // Handle error, such as displaying an error message to the user
        }
    };

    const handleInputChange = (campo, valor) => {
        setAlunoData((prevData) => ({
            ...prevData,
            [campo]: valor,
        }));
        console.log(alunoData)
    };


    const handleCursoChange = (cursoId) => {
        setCursoSelecionado(cursoId);
    };
    
    const handleTurmaChange = (turmaId) => {
        setTurmaSelecionada(turmaId);
    };

    return (
        <>
            <div>
                <h1>Cadastro de estudantes</h1>
            </div>
            <div className='FormRow'>
                <Dropdown options={cursosOptions} onChange={handleCursoChange} placeHolder='Selecione o curso' />
                <Dropdown options={turmasOptions} onChange={handleTurmaChange} placeHolder='Selecione a turma'/>
            </div>
            <div className='Form'>
                 {/* Adicionar a exibição da mensagem de erro */}
                {errorMessage && <div className='error-message'>{errorMessage}</div>}
                {successMessage && <div className='success-message'>{successMessage}</div>}
                <div className='FormRow'>
                    <Input label="Nome:" campoValue={alunoData.nome} nmCampo='Nome:' campo='nome' handleInputChange={handleInputChange} />
                    <Input label="E-mail:" campoValue={alunoData.email} nmCampo="E-mail:" campo='email' handleInputChange={handleInputChange}/>
                </div>
                <div className='FormRow'>
                    <Input label="Data Nascimento:" campoValue={alunoData.dataNascimento} nmCampo="dataNascimento" campo='dataNasc' handleInputChange={handleInputChange}/>
                    <Input label="Telefone:" campoValue={alunoData.telefone} nmCampo="Telefone:" campo='telefone' handleInputChange={handleInputChange}/>
                    <Input label="Matrícula:" campoValue={alunoData.matricula} nmCampo="Matricula:" campo='matricula' handleInputChange={handleInputChange}/>
                </div>
                <div className='FormRow'>
                    {/*<Input label="CEP:" campoValue={alunoData.cep} nmCampo="Cep:" campo='cep' handleInputChange={handleInputChange}/>*/}
                    <Input label="Endereço:" campoValue={alunoData.endereco} nmCampo="Endereco:" campo='endereco' handleInputChange={handleInputChange}/>
                </div>
                <div>
                    <button className='btnAtualizar' onClick={handleCadastrarEstudante}>Cadastrar Estudante</button>
                    <Link className='standardBtn' to={`/AlunosList`}>Voltar</Link>
                </div>    
            </div>
        </>
    );
};

export default CadastroEstudante;
