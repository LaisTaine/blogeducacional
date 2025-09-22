import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { getPostById } from '../services/api';
import { Post } from '../types/post';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  .post-content {
    line-height: 1.6;
  }
`;

const PostContainer = styled.article`
  width: 100%;
  max-width: 740px; 
  margin: 40px auto;
  padding: 0 20px;
  box-sizing: border-box;
`;

const BackButton = styled(Link)`
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

const PostTitle = styled.h1`
  font-size: 2.8rem;
  margin-top: 0;
  margin-bottom: 16px;
  line-height: 1.2;
`;

const PostContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
`;

function PostReaderPage() {
  const { id } = useParams<{ id: string }>(); 
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // O 'guardião' que verifica se o ID existe.
      if (!id) {
        setLoading(false);
        setError('ID do post não encontrado na URL.');
        return;
      }
      
      try {
        setLoading(true); 
        setError(null);
        
        // A chamada da API
        const response = await getPostById(id); 
        setPost(response.data);

      } catch (err) {
        setError('Falha ao carregar o post.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

 return (
    <PostContainer>
      <BackButton to="/">&larr; Voltar para a lista</BackButton>
      {post ? (
        <>
          <PostTitle>{post.title}</PostTitle>
          <PostContent>
            {/* TODO: ideal é usar um parser de markdown no futuro.
                Por enquanto, manter <pre> para manter a formatação. */}
            <p style={{ whiteSpace: 'pre-wrap' }}>{post.description}</p>
          </PostContent>
        </>
      ) : (
        !loading && <p>Post não encontrado.</p>
      )}
    </PostContainer>
  );
}


export default PostReaderPage;