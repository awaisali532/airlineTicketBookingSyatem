// import jwt from "jsonwebtoken";

// const userAuth = async (req, res, next) => {
//   const { token } = req.cookies;

//   if (!token) {
//     return res.json({ success: false, message: "Please login first" });
//   }

//   try {
//     const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

//     if (tokenDecode.id) {
//       req.user = { id: tokenDecode.id }; // ✅ Use req.user
//       next();
//     } else {
//       return res.json({
//         success: false,
//         message: "Not Authorized. Login Again",
//       });
//     }
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

// export default userAuth;

import jwt from "jsonwebtoken";
import "dotenv/config";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    // Token is missing, return a 401 Unauthorized status
    return res
      .status(401)
      .json({ success: false, message: "Please login first" });
  }

  try {
    // Try to verify the token
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.user = { id: tokenDecode.id, role: tokenDecode.role }; // Attach user ID to the request object
      next(); // Proceed to the next middleware or route handler
    } else {
      // If the token is invalid or does not contain the id
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Login Again",
      });
    }
  } catch (error) {
    // If there's an error during token verification (e.g., expired token)
    console.error("Token verification error:", error); // Log error for debugging purposes
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export default userAuth;
