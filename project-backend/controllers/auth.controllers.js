import UserSchema from "../models/user.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(404)
        .json({ success: false, message: "All fields are required." });
    }

    const user = await UserSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Credentials are wrong, please check or please register.",
      });
    }
    console.log(user, "user");
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(404)
        .json({ success: false, message: "Password is wrong." });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);

    console.log(token, "token");

    res.cookie("token", token);

    return res.status(200).json({
      success: true,
      message: "Login successfull.",
      user: { name: user.name, email: user.email, role : user.role },
    });
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ error, success: false });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    console.log(req.user, "req.user");
    return res
      .status(200)
      .json({
        success: true,
        user: { name: req.user.name, email: req.user.email, role : req.user.role },
      });
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ error, success: false });
  }
};


export const logoutController = async (req, res)=>{
  try {
    res.clearCookie("token");
    return res.status(200).json({success : true, message : "Logout successfull."})

  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ error, success: false });
  }
}
