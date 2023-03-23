import { CircularProgress } from '@material-ui/core';
import React, { createContext, useContext, useState } from 'react';
import { loadingStyles } from '../utils/spinner-styles';

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

const LoadingContext = createContext({} as LoadingContextType)

interface LoadingProviderProps {
  children: React.ReactNode;
}

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setLoading] = useState(false);
  const classes = loadingStyles();

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      { isLoading ? (
          <div className={classes.loading}>
            <CircularProgress />
          </div>
        ) : (
          <></>
        )
      }
      {children}
    </LoadingContext.Provider>
  );
};