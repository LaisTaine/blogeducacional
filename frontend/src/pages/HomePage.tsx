import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getPublishedPosts, searchPosts } from '../services/api';
import { Post } from '../types/post';
import PostListItem from '../components/PostListItem';
import { useAuth } from '../contexts/AuthContext';
import { PrimaryButton } from '../components/FormStyles';

const Container = styled.div`
  width: 100%;
  max-width: 800px;  
  margin: 40px auto; 
  padding: 0 16px;   
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: #e3e7edff;
  text-align: center;
  margin-bottom: 32px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 40px 12px 16px;
  margin-bottom: 32px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 20px; 

  &:focus {
    outline: none;
    border-color: #1877f2;
    box-shadow: 0 0 0 2px rgba(24, 119, 242, 0.2);
  }
`;

const SearchForm = styled.form`
  position: relative; 
  width: 100%;
  margin-bottom: 32px;
`;

const SearchIconButton = styled.button`
  position: absolute;
  right: 10px;
  top: 32%; 
  transform: translateY(-50%); 

  background: transparent; 
  border: none; 
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem; 
  color: #555; 

  &:hover {
    color: #1877f2;
  }
`;

function HomePage() {
  const { isAuthenticated } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchInitialPosts = async () => {
      setLoading(true);
      try {
        const response = await getPublishedPosts();
        setPosts(response.data);
      } catch (err) {
        setError('Falha ao carregar os posts.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialPosts();
  }, []);

    const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setLoading(true);
    setError(null);

    try {
      const response = searchTerm 
        ? await searchPosts(searchTerm) 
        : await getPublishedPosts();

      setPosts(response.data);
    } catch (err) {
      setError('Falha ao realizar a busca.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <Container>
      <PageTitle>Blog Educativo</PageTitle>
      {isAuthenticated && (
        <Link to="/admin/criar" style={{ marginBottom: '20px', display: 'inline-block' }}>
          <PrimaryButton>Novo Post</PrimaryButton>
        </Link>
      )}

      <SearchForm onSubmit={handleSearch}>
        <SearchInput 
          type="text" 
          placeholder="Buscar posts por palavra-chave..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <SearchIconButton type="submit">
          <FaSearch />
        </SearchIconButton>
      </SearchForm>
      
      <div>
        {posts.map(post => (
          <PostListItem key={post._id} post={post} isAdmin={isAuthenticated} />
        ))}
      </div>
    </Container>
  );
}

export default HomePage;