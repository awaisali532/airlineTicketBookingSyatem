import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // ✅ Vite-compatible
  const [isLogin, setIsLogin] = useState(false);
  const [userdata, setuserdata] = useState(false);

  const value = {
    backendUrl,
    isLogin,
    setIsLogin,
    userdata,
    setuserdata,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
