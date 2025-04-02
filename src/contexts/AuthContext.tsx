import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { auth } from '../firebase/config';
import { registerUser, loginUser, loginWithGoogle, logoutUser, resetPassword } from '../firebase/auth';

// Create auth context type
type AuthContextType = {
  currentUser: User | null;
  loading: boolean;
  register: (email: string, password: string, displayName: string) => Promise<{ success: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<{ success: boolean; error?: string }>;
  resetUserPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
};

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  register: async () => ({ success: false, error: 'Auth context not initialized' }),
  login: async () => ({ success: false, error: 'Auth context not initialized' }),
  loginGoogle: async () => ({ success: false, error: 'Auth context not initialized' }),
  logout: async () => ({ success: false, error: 'Auth context not initialized' }),
  resetUserPassword: async () => ({ success: false, error: 'Auth context not initialized' }),
});

// Hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Register function
  const register = async (email: string, password: string, displayName: string) => {
    try {
      const result = await registerUser(email, password, displayName);
      
      if (result.error) {
        return { success: false, error: result.error };
      }
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const result = await loginUser(email, password);
      
      if (result.error) {
        return { success: false, error: result.error };
      }
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  // Google login function
  const loginGoogle = async () => {
    try {
      const result = await loginWithGoogle();
      
      if (result.error) {
        return { success: false, error: result.error };
      }
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const result = await logoutUser();
      
      if (!result.success) {
        return { success: false, error: result.error };
      }
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  // Reset password function
  const resetUserPassword = async (email: string) => {
    try {
      const result = await resetPassword(email);
      return result;
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup subscription
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    register,
    login,
    loginGoogle,
    logout,
    resetUserPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 