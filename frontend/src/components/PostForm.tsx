import { useState, FormEvent, useEffect } from 'react';
import { 
  StyledForm, 
  FormGroup, 
  StyledLabel, 
  StyledInput, 
  StyledTextArea, 
  PrimaryButton 
} from './FormStyles'; 
import { CreatePostBody } from '../types/post';

interface PostFormProps {
  onSubmit: (data: CreatePostBody) => void;
  initialData?: CreatePostBody;
  buttonText: string;
}

export function PostForm({ onSubmit, initialData, buttonText }: PostFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
    }
  }, [initialData]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, isPublished: true });
  };


  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormGroup>
        <StyledLabel htmlFor="title">Título</StyledLabel>
        <StyledInput 
          id="title"
          type="text" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          placeholder="Título do post" 
          required 
        />
      </FormGroup>

      <FormGroup>
        <StyledLabel htmlFor="description">Conteúdo</StyledLabel>
        <StyledTextArea 
          id="description"
          value={description} 
          onChange={e => setDescription(e.target.value)} 
          placeholder="Escreva o conteúdo do seu post aqui..." 
          required 
        />
      </FormGroup>

      <PrimaryButton type="submit">{buttonText}</PrimaryButton>
    </StyledForm>
  );
}