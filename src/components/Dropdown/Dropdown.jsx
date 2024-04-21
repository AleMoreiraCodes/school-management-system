import React from 'react';
import styled from 'styled-components';

const StyledDropdown = styled.select`
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

  &:focus {
    outline: none;
    border-color: #4481eb;
  }
`;

const Dropdown = ({ options, onChange }) => {
  const handleInput = (event) => {
    onChange(event.target.value);
  };

  return (
    <StyledDropdown onChange={handleInput}>
      <option value="">Selecione a turma</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.nome}
        </option>
      ))}
    </StyledDropdown>
  );
};

export default Dropdown;
