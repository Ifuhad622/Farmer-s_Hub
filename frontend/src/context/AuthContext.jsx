import React, { createContext, useContext, useState, useEffect } from "react";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component wraps your app and provides auth state and actions
export const AuthProvider = ({ children }) => {
  // User state; null if not logged in
  const [user, setUser] = useState(null);
  // Loading state (e.g., while checking persisted login)
  const [isLoading, setIsLoading] = useState(true);

  // On mount, check for a stored user (simulate persistent auth)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Simulated login function (replace with your API call)
  const login = async (credentials) => {
    // For demonstration, check against static credentials:
    if (credentials.username === "user" && credentials.password === "password") {
      const fakeUser = {
        name: "John Doe",
        email: "john@example.com",
        picture: "https://via.placeholder.com/150",
      };
      setUser(fakeUser);
      localStorage.setItem("user", JSON.stringify(fakeUser));
      return true;
    }
    return false;
  };

  // Logout function clears the user state and localStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // The value provided to consuming components
  const value = { user, login, logout, isLoading };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming the AuthContext easily
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
