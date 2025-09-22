import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaSignInAlt, FaSignOutAlt, FaUserCog } from 'react-icons/fa'; 
import { useAuth } from '../contexts/AuthContext'; 

// --- Estilos ---

const Nav = styled.nav`
  // ... (o estilo que já tínhamos)
  background-color: #ffffff;
  padding: 0 40px;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
`;

const Logo = styled(Link)`
  // ... (o estilo que já tínhamos)
  font-family: 'Montserrat', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1877f2;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 24px; // Espaço entre os links
`;

const NavLink = styled(Link)`
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px; // Espaço entre o ícone e o texto
  font-weight: 600;
  transition: color 0.2s;

  &:hover {
    color: #1877f2;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  transition: color 0.2s;

  &:hover {
    color: #1877f2;
  }
`;

// --- Componente Header ---

function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Nav>
      <Logo to="/">Blog Educativo</Logo>
      <NavLinks>
        {isAuthenticated ? (
          <>
            <NavLink to="/admin">
              <FaUserCog />
              Admin
            </NavLink>
            <LogoutButton onClick={logout}>
              <FaSignOutAlt />
              Sair
            </LogoutButton>
          </>
        ) : (
          <NavLink to="/login">
            <FaSignInAlt />
            Login
          </NavLink>
        )}
      </NavLinks>
    </Nav>
  );
}

export default Header;