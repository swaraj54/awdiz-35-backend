import ProductSchema from "../models/product.schema.js";
import UserSchema from "../models/user.schema.js";

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await UserSchema.findById(userId).select("name email");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found." });
    }
    return res.status(200).json({ success: true, profile: user });
  } catch (error) {
    return res.status(500).json({ error, success: false });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductSchema.find({
      approvedByAdmin: true,
      stock: { $gt: 0 },
    });
    return res.status(200).json({success : true, products})
  } catch (error) {
    return res.status(500).json({ error, success: false });
  }
};
