import { useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);

  const login = () => {
    setUser({ id: 1, name: "Ahmed" });
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    isLoggedIn: !!user,
    login,
    logout,
  };
}
