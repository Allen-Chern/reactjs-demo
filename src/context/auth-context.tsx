import React, { createContext, useContext, useEffect, useState } from "react";
import { sendMeRequest } from "../services/api";

interface User {
  id: string;
  name: string;
  email: string;
  isActivate: boolean;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthenticated: boolean;
  isActivated: boolean;
}

const AuthContext = createContext({} as AuthContextType)

interface AuthProviderProps {
  children: React.ReactNode;
}

export const useAuth = (): AuthContextType => useContext(AuthContext)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await sendMeRequest();
        if(response.status === 200) {
          const data = response.data;
          setUser(data);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const isAuthenticated = Boolean(user);
  const isActivated = user ? user.isActivate : false;

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, isActivated }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};