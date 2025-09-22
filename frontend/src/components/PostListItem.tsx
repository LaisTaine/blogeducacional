import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Post } from '../types/post';
import { ActionButton } from './FormStyles';

interface PostListItemProps {
  post: Post;
  isAdmin: boolean; 
}


const PostCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #dddfe2;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  h2 {
    margin-top: 0;
    margin-bottom: 8px;
    font-size: 1.5rem;
    color: #1877f2; 
  }

  p {
    margin-bottom: 0;
    line-height: 1.6;
    font-weight: 300;
  }
`;

const ActionButtons = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 10px;
`;

function PostListItem({ post, isAdmin }: PostListItemProps) {
  const shortDescription = post.description.length > 150
    ? `${post.description.substring(0, 150)}...`
    : post.description;

  return (
    <PostCard>
      <Link to={`/post/${post._id}`}>
        <h2>{post.title}</h2>
      </Link>
      <p><p>{shortDescription}</p></p>
      
      {isAdmin && (
        <ActionButtons>
          <Link to={`/admin/editar/${post._id}`}>
            <ActionButton className="edit">Editar</ActionButton>
          </Link>
          <ActionButton className="delete">Excluir</ActionButton> 
        </ActionButtons>
      )}
    </PostCard>
  );
}

export default PostListItem;