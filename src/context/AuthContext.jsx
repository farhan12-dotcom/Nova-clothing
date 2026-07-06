// context/AuthContext.jsx
//
// CartContext jaisa hi pattern — Context + Provider + custom hook.
// Farq: yahan "users" (fake database) aur "currentUser" (kaun login hai)
// dono ko localStorage mein persist kar rahe hain, taake page reload
// karne pe bhi login session yaad rahe.

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  // App load hote hi localStorage se pichla session restore karo
  useEffect(() => {
    const saved = localStorage.getItem("currentUser");
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentUser(JSON.parse(saved));
    }
  }, []);

  // Helper — localStorage se "fake users database" nikalna
  function getUsers() {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : [];
  }

  function signup(name, email, password) {
    const users = getUsers();

    // Check karo email already registered to nahi
    const exists = users.find((u) => u.email === email);
    if (exists) {
      throw new Error("An account with this email already exists.");
    }

    const newUser = { name, email, password };
    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Signup ke baad seedha login bhi kar do
    setCurrentUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
  }

  function login(email, password) {
    const users = getUsers();
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  }

  function logout() {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  }

  const value = { currentUser, signup, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
//eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
