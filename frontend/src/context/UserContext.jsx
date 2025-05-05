// // import { createContext, useState, useEffect } from "react";

// // export const UserContext = createContext();

// // export const UserProvider = ({ children }) => {
// //   const backendUrl = import.meta.env.VITE_BACKEND_URL; // ✅ Vite-compatible
// //   const [isLogin, setIsLogin] = useState(false);
// //   const [userdata, setuserdata] = useState(null);

// //   useEffect(() => {
// //     const token = localStorage.getItem("token");
// //     if (token) {
// //       setIsLogin(true);
// //       // Optionally, fetch user data here if needed (from backend)
// //       // For example: fetchUserData();
// //     } else {
// //       setIsLogin(false);
// //     }
// //   }, []);

// //   const logout = () => {
// //     localStorage.removeItem("token"); // Remove token from localStorage
// //     setIsLogin(false);
// //     setuserdata(null); // Clear userdata
// //   };

// //   const value = {
// //     backendUrl,
// //     isLogin,
// //     setIsLogin,
// //     userdata,
// //     setuserdata,
// //     logout, // Expose logout function to the context
// //   };

// //   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// // };

// import { createContext, useState, useContext, useEffect } from "react";

// export const UserContext = createContext();
// export const useAuth = () => useContext(UserContext);

// export const UserProvider = ({ children }) => {
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   const [isLogin, setIsLogin] = useState(false);
//   const [userdata, setuserdata] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsLogin(true);
//     } else {
//       setIsLogin(false);
//     }
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("token");
//     setIsLogin(false);
//     setuserdata(null);
//   };

//   const value = {
//     backendUrl,
//     isLogin,
//     setIsLogin,
//     userdata,
//     setuserdata,
//     logout,
//   };

//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// };

import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();
export const useAuth = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLogin, setIsLogin] = useState(false);
  const [userdata, setuserdata] = useState(null);
  const [loading, setLoading] = useState(true); // NEW: loading state

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Try to fetch the user details
      axios
        .get(`${backendUrl}/api/user/data`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
        .then((res) => {
          setuserdata(res.data.user);
          setIsLogin(true);
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
          setIsLogin(false);
          setuserdata(null);
        })
        .finally(() => {
          setLoading(false); // Done loading either way
        });
    } else {
      setIsLogin(false);
      setuserdata(null);
      setLoading(false); // No token, done loading
    }
  }, [backendUrl]);

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
    loading, // provide loading status
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
