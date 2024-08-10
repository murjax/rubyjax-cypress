import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('js-posts-auth-token'));

  const login = (newToken) => {
    localStorage.setItem('js-posts-auth-token', newToken);
    setToken(newToken);
  }

  const logout = () => {
    localStorage.clear();
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
