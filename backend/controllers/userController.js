import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      success: true,
      userData: {
        name: user.name,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
