import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({ success: false, message: "Please login first" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.user = { id: tokenDecode.id }; // ✅ Use req.user
      next();
    } else {
      return res.json({
        success: false,
        message: "Not Authorized. Login Again",
      });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default userAuth;
