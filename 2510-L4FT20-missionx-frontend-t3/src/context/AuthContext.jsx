
// In React, context is a way to share data across many components without having to pass props down through every level of the tree. It creates a central “store” where you can keep values such as the current user, theme settings, or language preferences, and any component inside the provider can access that data directly. This removes the need for repetitive prop‑drilling and keeps your component structure cleaner and easier to maintain. Context is especially useful for global state like authentication, because it ensures that every part of the app always has access to the same up‑to‑date information.


import { createContext, useContext, useEffect, useState } from "react"; // Imports tools for context, state, and effects

const AuthContext = createContext(); // Creates a shared place to store login information

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Stores the current logged‑in user or null if logged out

  // Load saved user from localStorage when the page first loads
  useEffect(() => {
    const stored = localStorage.getItem("loggedInUser"); // Gets saved user data from localStorage
    if (stored) setUser(JSON.parse(stored)); // Restores user state if data exists
  }, []); // Runs only once when the component mounts

  // Saves the user after a successful login
  const login = (userData) => {
    setUser(userData); // Updates the user state
    localStorage.setItem("loggedInUser", JSON.stringify(userData)); // Saves user data to localStorage
  };

  // Clears the user when logging out
  const logout = () => {
    setUser(null); // Removes user from state
    localStorage.removeItem("loggedInUser"); // Deletes saved user from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}> {/* Makes user, login, and logout available to all components */}
      {children} {/* Renders everything inside the provider */}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext); // Allows components to access the authentication data
}

