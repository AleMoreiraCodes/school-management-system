import React, { useState, useEffect } from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

const schema = yup.object({
  nome: yup.string().required('Nome completo obrigatório'),
  dataNascimento: yup.date().required('Data de nascimento obrigatória'),
  turma: yup.string().required('Turma obrigatória'),
  curso: yup.string().required('Curso obrigatório'),
  email: yup.string().email('Email inválido').required('Email obrigatório'),
  telefone: yup.string().required('Telefone obrigatório'),
  cep: yup.string().required('CEP obrigatório').min(8).max(8),
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
        <FormGroup>
          <Form.Label>Nome Completo</Form.Label>
          <Form.Control type="text" name="nome" value={formData.nome} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Form.Label>Data de Nascimento</Form.Label>
          <Form.Control type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Form.Label>Turma</Form.Label>
          <Form.Control type="text" name="turma" value={formData.turma} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Form.Label>Curso</Form.Label>
          <Form.Control type="text" name="curso" value={formData.curso} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Form.Label>Telefone</Form.Label>
          <Form.Control type="text" name="telefone" value={formData.telefone} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Form.Label>CEP</Form.Label>
          <Form.Control type="text" name="cep" value={formData.cep} onChange={handleChange} />
        </FormGroup>
        <Button type="submit">Atualizar Aluno</Button>
      </Form>
    </div>
  );
};

export default AlunoForm;