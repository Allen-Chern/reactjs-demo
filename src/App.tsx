import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthenticatedRoute } from './components/AuthenticatedRoute';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './context/auth-context';
import Dashboard from './pages/Dashboard';
import Inactivate from './pages/Inactivate';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Verification from './pages/Verification';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verification/:token" element={<Verification />} />
          <Route path="/inactivate" element={(
            <AuthenticatedRoute>
              <Inactivate />
            </AuthenticatedRoute>
          )} />
          <Route path="/dashboard" element={(
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          )} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
