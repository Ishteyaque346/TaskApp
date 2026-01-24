import React, {  useState, useCallback, useEffect } from 'react';
import { tokenStorage } from '../utils/tokenStorage.js';


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ FIXED: Load token from storage on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = tokenStorage.get(); // Get token from localStorage
        
        if (token) {
          // Token exists, verify it's valid
          setIsAuthenticated(true);
          // Optionally fetch user profile here
          // const user = await usersAPI.getProfile();
          // setUser(user);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // ← Must call this to stop loading
      }
    };

    initializeAuth();
  }, []); // Run only on mount

  const login = useCallback((userData, token) => {
    tokenStorage.set(token); // Save token
    setUser(userData);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    tokenStorage.remove(); // Remove token
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