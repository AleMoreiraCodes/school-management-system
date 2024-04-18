import React, { useState } from 'react';
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

const Dropdown = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleInput = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <StyledDropdown value={selectedOption} onInput={handleInput}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </StyledDropdown>
  );
};


export default Dropdown;