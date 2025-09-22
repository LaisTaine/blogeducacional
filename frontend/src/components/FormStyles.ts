import styled from 'styled-components';
import { Link } from 'react-router-dom';

// container principal para as páginas de formulário
export const FormContainer = styled.div`
  max-width: 740px;
  margin: 40px auto;
  padding: 32px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

// tag <form> estilizada
export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px; // Adiciona espaço entre os elementos do formulário
`;

// grupo para agrupar label e input
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// tag <label> estilizada
export const StyledLabel = styled.label`
  font-weight: 700;
  color: #333;
`;

// Estilo base para inputs de texto e email
export const inputStyles = `
  width: 100%;
  padding: 12px 16px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: #1877f2;
    box-shadow: 0 0 0 2px rgba(24, 119, 242, 0.2);
  }
`;

// tag <input> estilizada
export const StyledInput = styled.input`
  ${inputStyles}
`;

// tag <textarea> estilizada
export const StyledTextArea = styled.textarea`
  ${inputStyles}
  min-height: 150px;
  resize: vertical; // Permite que o usuário redimensione a altura
`;

// Botão primário 
export const PrimaryButton = styled.button`
  background-color: #1877f2;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 10px 16px; 
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center; 
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #166fe5;
  }
`;

// Botão de ação
export const ActionButton = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 8px;
  background-color: #e4e6eb;
  font-weight: 600;
  transition: background-color 0.2s, color 0.2s;

  &.edit {
    background-color: #d8dade;
    border: 
    color: white;
    &:hover { background-color: #bababdff; }
  }
  &.delete {
    background-color: #c9302c; 
    color: #eaebedff; 
    
    &:hover {
      background-color: #a52825; 
      color: #f1f1f1ff;
    }
  }
`;

export const BackButton = styled(Link)`
  display: inline-block;
  margin-bottom: 24px;
  font-weight: 700;
  color: #555;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #1877f2;
  }
`;