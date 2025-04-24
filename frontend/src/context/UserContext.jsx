// import { createContext, useState, useEffect } from "react";

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const backendUrl = import.meta.env.VITE_BACKEND_URL; // ✅ Vite-compatible
//   const [isLogin, setIsLogin] = useState(false);
//   const [userdata, setuserdata] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsLogin(true);
//       // Optionally, fetch user data here if needed (from backend)
//       // For example: fetchUserData();
//     } else {
//       setIsLogin(false);
//     }
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("token"); // Remove token from localStorage
//     setIsLogin(false);
//     setuserdata(null); // Clear userdata
//   };

//   const value = {
//     backendUrl,
//     isLogin,
//     setIsLogin,
//     userdata,
//     setuserdata,
//     logout, // Expose logout function to the context
//   };

//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// };

import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLogin, setIsLogin] = useState(false);
  const [userdata, setuserdata] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    setuserdata(null);
  };

  const value = {
    backendUrl,
    isLogin,
    setIsLogin,
    userdata,
    setuserdata,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
