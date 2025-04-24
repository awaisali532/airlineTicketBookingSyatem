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
  // Get the token from the cookies
  const { token } = req.cookies;

  // Check if the token is missing
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please login first. Token missing.",
    });
  }

  try {
    // Verify the token
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    // If token is valid and contains an id, attach user info to request object
    if (tokenDecode.id) {
      req.user = { id: tokenDecode.id, role: tokenDecode.role }; // Attach user id and role
      next(); // Proceed to the next middleware or route handler
    } else {
      // Token is invalid or doesn't have an id
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please log in again.",
      });
    }
  } catch (error) {
    // If the token verification fails (e.g., token expired, invalid token format)
    console.error("Token verification error:", error); // Log error details for debugging
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token. Please log in again.",
    });
  }
};

export default userAuth;
