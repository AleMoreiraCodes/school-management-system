import React, { useState } from 'react';
import styled from 'styled-components';
import './style.css';

const StyledInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  width: 100%;
  max-width: 700px; /* ajuste conforme necessário */
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;
  margin: 1%;
`;

const Input = ({ campoValue, nmCampo, label, handleInputChange, campo}) => { 

  const [propsInfo, setPropsInfo] = useState(campoValue);

  const inputType = nmCampo === 'dataNascimento' ? 'date' : 'text';

  return (
    <div className='input-container'>
      <label className='input-label'>{label}</label>
      <StyledInput type={inputType} placeholder={nmCampo} value={campoValue} onChange={ (e) => handleInputChange(campo, e.target.value)}/>
    </div>
  );
};


export default Input;