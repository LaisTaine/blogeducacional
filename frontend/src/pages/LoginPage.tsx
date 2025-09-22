import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 70px); // Subtrai a altura do header
  padding: 20px;
`;

const LoginForm = styled.form`
  padding: 40px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const FormTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 24px;
  font-size: 1.8rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 16px;
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

const Button = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #1877f2;
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #166fe5;
  }
`;

const ErrorMessage = styled.p`
  color: #c9302c; 
  font-size: 0.9rem;
  margin-top: -8px; 
  margin-bottom: 16px;
  text-align: left; 
`;

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setError(null);

      const isLoginSuccessful = await login({ email, password });

      if (isLoginSuccessful) {
        navigate('/admin'); 
      } else {
        setError('Email ou senha inválidos.');
      }
    };


  return (
    <LoginContainer> 
      <LoginForm onSubmit={handleSubmit}>
        
        <FormTitle>Login de Professor</FormTitle> 
        
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        {error && <ErrorMessage>{error}</ErrorMessage>} 
        
        <Button type="submit">Entrar</Button> 

      </LoginForm>
    </LoginContainer>
  );
}

export default LoginPage;