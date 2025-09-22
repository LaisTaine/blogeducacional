import { useNavigate } from 'react-router-dom';
import { PostForm } from '../components/PostForm';
import { createPost } from '../services/api';
import { CreatePostBody } from '../types/post';
import { FormContainer, BackButton } from '../components/FormStyles';

function CreatePostPage() {
  const navigate = useNavigate();

  const handleCreate = async (data: CreatePostBody) => {
    try {
      await createPost(data);
      alert('Post criado com sucesso!');
      navigate('/admin'); 
    } catch (error) {
      alert('Falha ao criar o post.');
    }
  };

  return (
    <FormContainer>
      <BackButton to="/admin">&larr; Voltar para o Painel</BackButton> 
      <h1>Criar Novo Post</h1>
      <PostForm onSubmit={handleCreate} buttonText="Criar Post" />
    </FormContainer>
  );
}

export default CreatePostPage;