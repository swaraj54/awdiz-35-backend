import UserSchema from "../models/user.schema.js";

export const getAllSellers = async (req, res) => {
  try {
    const sellers = await UserSchema.find({ role: "seller" }).select(
      "name email isApprovedByAdmin",
    );
    return res.status(200).json({ success: true, sellers });
  } catch (error) {
    return res.status(500).json({ error, success: false });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserSchema.find({ role: "user" }).select("name email");
    return res.status(200).json({ success: true, users });
  } catch (error) {
    return res.status(500).json({ error, success: false });
  }
};

export const approveSeller = async (req, res) => {
  try {
    const sellerId = req.body.sellerId;
    if (!sellerId) {
      return res
        .status(404)
        .json({ success: false, message: "Seller is required." });
    }
    await UserSchema.findByIdAndUpdate(sellerId, { isApprovedByAdmin: true });
    return res.status(200).json({ success: true, message : "Seller approved." });
  } catch (error) {
    return res.status(500).json({ error, success: false });
  }
};
