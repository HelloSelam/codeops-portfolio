import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("addis-eats-user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  function saveUser(name, email) {
    const newUser = { name, email };

    setUser(newUser);
    localStorage.setItem(
      "addis-eats-user",
      JSON.stringify(newUser)
    );
  }

  function signIn(name, email) {
    saveUser(name, email);
  }

  function signUp(name, email) {
    saveUser(name, email);
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem("addis-eats-user");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}