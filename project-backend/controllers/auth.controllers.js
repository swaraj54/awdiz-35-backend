import UserSchema from "../models/user.schema.js";
import bcrypt from "bcrypt";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res
        .status(404)
        .json({ success: false, message: "All fields are required." });
    }

    const isEmailExists = await UserSchema.findOne({ email: email });

    if (isEmailExists) {
      return res.status(404).json({
        success: false,
        message: "Email is already exists, please login or try new email.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserSchema.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // console.log(newUser, "newUser");

    return res
      .status(201)
      .json({ success: true, message: "Registeration sucessfull." });
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ error, success: false });
  }
};
