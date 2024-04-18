import React, { useState } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  width: 100%;
  max-width: 300px; /* ajuste conforme necessário */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;
  margin: 1%;
`;

const Dropdown = ({ aluno, nmCampo }) => {

  return (
    <StyledInput type="text" placeholder={nmCampo} value={aluno.nome}/>
  );
};


export default Dropdown;