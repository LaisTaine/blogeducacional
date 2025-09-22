import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PostForm } from '../components/PostForm';
import { getPostById, updatePost } from '../services/api';
import { Post, CreatePostBody } from '../types/post';
import { FormContainer, BackButton } from '../components/FormStyles';

function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (id) {
      getPostById(id)
        .then(response => setPost(response.data))
        .catch(error => console.error("Erro ao buscar post para edição:", error));
    }
  }, [id]);

  const handleUpdate = async (data: CreatePostBody) => {
    if (!id) return;
    try {
      await updatePost(id, data);
      alert('Post atualizado com sucesso!');
      navigate('/admin');
    } catch (error) {
      alert('Falha ao atualizar o post.');
    }
  };

  if (!post) return <p>Carregando...</p>;

  return (
     <FormContainer>
      <BackButton to="/admin">&larr; Voltar para o Painel</BackButton>
      <h1>Editar Post</h1>
      <PostForm 
        onSubmit={handleUpdate} 
        initialData={post} 
        buttonText="Salvar Alterações" 
      />
     </FormContainer>
  );
}
export default EditPostPage;