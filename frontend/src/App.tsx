import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostReaderPage from './pages/PostReaderPage';
import LoginPage from './pages/LoginPage'; 
import { ProtectedRoute } from './components/ProtectedRoute';
import { GlobalStyle } from './styles/GlobalStyle';
import Header from './components/Header'; 

import AdminPage from './pages/AdminPage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';

function App() {
  return (
    <>
    <GlobalStyle />
    <Header />
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/post/:id" element={<PostReaderPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Rotas Protegidas */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/criar"
        element={
          <ProtectedRoute>
            <CreatePostPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/editar/:id"
        element={
          <ProtectedRoute>
            <EditPostPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  </>
  );
}

export default App;
