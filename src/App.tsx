import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthenticatedRoute } from './components/AuthenticatedRoute';
import Navbar from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './context/auth-context';
import { LoadingProvider } from './context/loading-context';
import Dashboard from './pages/Dashboard';
import Inactivate from './pages/Inactivate';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Register from './pages/Register';
import ResetName from './pages/ResetName';
import ResetPassword from './pages/ResetPassword';
import Statistics from './pages/Statistics';
import Verification from './pages/Verification';

function App() {
  return (
    <LoadingProvider>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
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
            <Route path="/" element={(
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            )} />
            <Route path="/dashboard" element={(
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            )} />
            <Route path="/statistics" element={(
              <ProtectedRoute>
                <Statistics />
              </ProtectedRoute>
            )} />
            <Route path="/profile" element={(
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            )} />
            <Route path="/resetName" element={(
              <ProtectedRoute>
                <ResetName />
              </ProtectedRoute>
            )} />
            <Route path="/resetPassword" element={(
              <ProtectedRoute>
                <ResetPassword />
              </ProtectedRoute>
            )} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LoadingProvider>
  );
}

export default App;
