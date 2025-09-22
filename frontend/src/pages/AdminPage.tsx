import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getAdminPosts, deletePost } from '../services/api';
import { Post } from '../types/post';
import { PrimaryButton, ActionButton } from '../components/FormStyles';

const AdminContainer = styled.div`
  max-width: 960px;
  margin: 40px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const AdminHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const PostTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th, td {
    border-bottom: 1px solid #ddd;
    padding: 12px 8px;
    text-align: left;
  }
  th {
    background-color: #f7f7f7;
  }
  tbody tr:hover {
    background-color: #f0f2f5;
  }
`;


function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

    useEffect(() => {
    // Chame a nova função, que não precisa de argumentos
    getAdminPosts(1, 100)
        .then(response => setPosts((response.data.posts || response.data))) // Ajuste: a resposta pode ser diretamente o array
        .catch(error => console.error("Erro ao buscar posts para admin:", error));
    }, []);

    const handleDelete = async (id: number | string) => {
        if (window.confirm('Tem certeza que deseja excluir este post?')) {
        try {
            await deletePost(id);
            // Atualiza a lista de posts removendo o que foi deletado
            setPosts(posts.filter(post => post._id !== id));
            } catch (error) {
                console.error("Erro ao deletar post:", error);
                alert("Falha ao excluir o post.");
            }
        }
    };

  return (
    <AdminContainer> 
      <AdminHeader>  
        <h1>Posts</h1>
        <Link to="/admin/criar">
          <PrimaryButton>Novo Post</PrimaryButton>
        </Link>
      </AdminHeader>
      
      <PostTable> 
        <thead>
          <tr>
            <th>Título</th>
            <th style={{ width: '200px' }}>Ações</th> 
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post._id}>
              <td>{post.title}</td>
              <td>
                <Link to={`/admin/editar/${post._id}`}>
                  <ActionButton className="edit">Editar</ActionButton>
                </Link>
                
                <ActionButton 
                  className="delete" 
                  onClick={() => handleDelete(post._id)}
                >
                  Excluir
                </ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </PostTable>
    </AdminContainer>
  );
}

export default AdminPage;