import React, { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios'; // Import axios for API calls

// Create the AuthContext
const AuthContext = createContext(null);

// AuthProvider component wraps your app and provides auth state and actions
export const AuthProvider = ({ children }) => {
  // User state; null if not logged in
  const [user, setUser] = useState(() => {
    // Check if user data exists in localStorage
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Loading state (e.g., while checking persisted login)
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling

  // On mount, check for a stored user (simulate persistent auth)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function with API call
  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:5000/login', credentials); // Replace with your API endpoint
      const userData = response.data; // Assuming the API returns user data
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Login failed. Please check your credentials.'); // Set error message
      console.error(err);
    }
  };

  // Logout function clears the user state and localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Registration function (optional)
  const register = async (userData) => {
    try {
      const response = await axios.post('http://localhost:5000/register', userData); // Replace with your API endpoint
      const newUser = response.data; // Assuming the API returns user data
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Registration failed. Please try again.'); // Set error message
      console.error(err);
    }
  };

  // The value provided to consuming components
  const value = {
    user,
    login,
    logout,
    register,
    isAuthenticated: !!user,
    isLoading,
    error, // Provide error state to consuming components
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming the AuthContext easily
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
