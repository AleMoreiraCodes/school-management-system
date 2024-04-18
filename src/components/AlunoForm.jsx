import React, { useState, useEffect } from 'react';
import { FormGroup} from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 300px;
    margin: 0 auto;
`;

const Label = styled.label`
    margin-bottom: 10px;
`;

const Control = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
`;

const Button = styled.button`
    padding: 8px 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;


const schema = yup.object({
  nome: yup.string().required('Nome completo obrigatório'),
  dataNascimento: yup.date().required('Data de nascimento obrigatória'),
  turma: yup.string().required('Turma obrigatória'),
  curso: yup.string().required('Curso obrigatório'),
  email: yup.string().email('Email inválido').required('Email obrigatório'),
  telefone: yup.string().required('Telefone obrigatório'),
  cep: yup.string().required('CEP obrigatório').min(8).max(10),
});

const AlunoForm = ({ aluno }) => {
  const [formData, setFormData] = useState({
    nome: aluno.nome,
    dataNascimento: aluno.dataNascimento,
    turma: aluno.turma,
    curso: aluno.curso,
    email: aluno.email,
    telefone: aluno.telefone,
    cep: aluno.cep,
  });
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await schema.validate(formData);
    if (!isValid) {
      setErrors(isValid.errors);
      return;
    }

    try {
      await axios.put(`/api/alunos/${aluno.id}`, formData);
      setSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Editar Aluno</h1>
      {errors.length > 0 && (
        <ul>
          {errors.map((error) => (
            <li key={error.path}>{error.message}</li>
          ))}
        </ul>
      )}
      {success && <p>Aluno atualizado com sucesso!</p>}
      <Form onSubmit={handleSubmit}>
        <FormGroup  className="mb-3">
          <Form.Label>Nome Completo</Form.Label>
          <Control type="text" name="nome" value={formData.nome} onChange={handleChange} />
        </FormGroup>
        <FormGroup className="mb-3">
          <Form.Label>Data de Nascimento</Form.Label>
          <Control type="date" name="dataNascimento" className="form-control" value={formData.dataNascimento} onChange={handleChange} />
        </FormGroup>
        <FormGroup className="mb-3">
          <Form.Label>Turma</Form.Label>
          <Control type="text" name="turma" value={formData.turma} onChange={handleChange} />
        </FormGroup>
        <FormGroup className="mb-3">
          <Form.Label>Curso</Form.Label>
          <Control type="text" name="curso" value={formData.curso} onChange={handleChange} />
        </FormGroup>
        <FormGroup className="mb-3">
          <Form.Label>Email</Form.Label>
          <Control type="email" name="email" value={formData.email} onChange={handleChange} />
        </FormGroup>
        <FormGroup className="mb-3">
          <Form.Label>Telefone</Form.Label>
          <Control type="text" name="telefone" value={formData.telefone} onChange={handleChange} />
        </FormGroup>
        <FormGroup className="mb-3">
          <Form.Label>CEP</Form.Label>
          <Control type="text" name="cep" value={formData.cep} onChange={handleChange} />
        </FormGroup>
        <Button type="submit">Atualizar Aluno</Button>
      </Form>
    </div>
  );
};

export default AlunoForm;