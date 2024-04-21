import React, { useState } from 'react';
import Dropdown from '../../components/Dropdown/Dropdown';
import Input from '../../components/Input/Input';
import './style.css'

const Estudante = () => {

    const [alunoData, setAlunoData] = useState({
        nome: 'John Doe',
        dataNascimento: '01/01/1990',
        turma: 'A',
        curso: 'Ciência da Computação',
        email: 'email@email.com',
        telefone: '123456789',
        cep: '12345678',
        matricula: '123456',
        endereco: 'Rua dos Bobos, 0'
      });

    const handleAtualizarEstudante = () => {
        // Implemente aqui a lógica para enviar a requisição para a API Spring Boot
        // para atualizar os dados do estudante no banco de dados
        console.log(alunoData); // Exemplo de saída dos dados do estudante após edição
      };

    return (
        <>
            <div className='Form'>
                {/*<div className='FormRow'>
                    <Dropdown options={['Enfermagem', 'Radiologia', 'Farmácia']} /> 
                    {/*<Dropdown options={['Anatomia', 'Fisiologia Humana', 'Higiene e Conforto']} />
                    <Dropdown  options={['2024/1', '2023/2', '2023/1']} /> 
                </div>*/}
                <div className='FormRow'>
                    <Input label="Nome:" campoValue={alunoData.nome} nmCampo='Nome:' />
                    <Input label="E-mail:" campoValue={alunoData.email} nmCampo="E-mail:" />
                </div>
                <div className='FormRow'>
                    <Input label="Data Nascimento:" campoValue={alunoData.dataNascimento} nmCampo="dataNascimento" />
                    <Input label="CEP:" campoValue={alunoData.cep} nmCampo="Cep:" />
                    <Input label="Telefone:" campoValue={alunoData.telefone} nmCampo="Telefone:" o/>
                    <Input label="Matrícula:" campoValue={alunoData.matricula} nmCampo="Matricula:" />
                </div>
                <div className='FormRow'>
                    <Input label="Endereço:" campoValue={alunoData.endereco} nmCampo="Endereco:" />
                    <button onClick={handleAtualizarEstudante}>Atualizar Estudante</button>
                </div>
            </div>
        </>
    );
};

export default Estudante;
