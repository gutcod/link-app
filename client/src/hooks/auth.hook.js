import { useState, useCallback, useEffect } from "react";

const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();

  const login = useCallback((jtwToken, id) => {
    setToken(jtwToken);
    setUserId(id);
    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: id,
        token: jtwToken,
      })
    );
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data && data.token) {
      login(data.token, data.userId);
    }
  }, [login]);
  return { login, logout, token, userId };
};