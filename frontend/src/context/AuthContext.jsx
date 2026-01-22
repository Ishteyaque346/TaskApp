import React, { useState, useCallback } from 'react';
import { tokenStorage } from '../utils/tokenStorage.js';
import { AuthContext } from './authContext.js';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!tokenStorage.get());
  const [loading] = useState(false);

  const login = useCallback((userData, token) => {
    tokenStorage.set(token);
    setUser(userData);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    tokenStorage.remove();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const updateUser = useCallback((userData) => {
    setUser(userData);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      loading,
      login,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};