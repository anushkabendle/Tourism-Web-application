import { createContext, useContext, useState, useEffect } from "react";

// Create the context
export const AuthContext = createContext();

// Custom hook
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // NEW
  

  // Optional: persist user in localStorage
  useEffect(() => {
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (storedToken && storedUser) {
    setUser(JSON.parse(storedUser));
  }
  setLoading(false); 
}, []);


  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
    localStorage.setItem("user" , JSON.stringify(userData.user));
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout , loading }}>
      {children}
    </AuthContext.Provider>
  );
};
