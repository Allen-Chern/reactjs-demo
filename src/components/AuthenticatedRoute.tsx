import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

export const AuthenticatedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};