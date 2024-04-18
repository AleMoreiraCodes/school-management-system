import React, { useState } from 'react';
import Dropdown from '../../components/Dropdown/Dropdown';
import Input from '../../components/Input/Input';
import './style.css'

const Estudante = () => {

    const alunoData = {
        nome: 'John Doe',
        dataNascimento: '01-01-1990',
        turma: 'A',
        curso: 'Ciência da Computação',
        email: 'email@email.com',
        telefone: '123456789',
        cep: '12345678'
    };

    return (
        <>
            <div className='Form'>
                <div className='FormRow'>
                    <Dropdown options={['Enfermagem', 'Radiologia', 'Farmácia']} /> 
                    {/*<Dropdown options={['Anatomia', 'Fisiologia Humana', 'Higiene e Conforto']} />*/}
                    <Dropdown  options={['2024/1', '2023/2', '2023/1']} /> 
                    <Input label="Nome" aluno={alunoData} nmCampo='Nome:' />
                </div>
                <div className='FormRow'>
                    <Dropdown options={['Enfermagem', 'Radiologia', 'Farmácia']} /> 
                    {/*<Dropdown options={['Anatomia', 'Fisiologia Humana', 'Higiene e Conforto']} />*/}
                    <Dropdown  options={['2024/1', '2023/2', '2023/1']} /> 
                    <Input label="Nome" aluno={alunoData} nmCampo='Nome:' />
                </div>
            </div>
        </>
    );
};

export default Estudante;
