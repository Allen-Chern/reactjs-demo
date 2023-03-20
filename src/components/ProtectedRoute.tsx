import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isActivated } = useAuth();
  
  if (!isActivated) {
    return <Navigate to="/inactivate" />;
  }

  return children;
};