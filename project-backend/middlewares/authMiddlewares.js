import jwt from "jsonwebtoken";
import UserSchema from "../models/user.schema.js";

export const tokenDecoder = async (req, res, next) => {
  try {
    console.log(req.cookies.token, "req.cookies.token");
    const token = req.cookies?.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized..." });
    }
    const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedData, "decodedData");

    const isUserExist = await UserSchema.findOne({ email: decodedData.email });

    if (!isUserExist) {
      return res
        .status(404)
        .json({ success: false, message: "Unauthorized..." });
    }

    req.user = isUserExist;

    return next();
  } catch (error) {
    console.log(error, "error");
    return res.status(400).json({ success: false, error });
  }
};

export const roleValidator = (role) => {
  return (req, res, next) => {
    const roleFromToken = req.user.role;
    if (roleFromToken !== role) {
      return res
        .status(403)
        .json({ success: false, message: "Access denied." });
    }
    next();
  };
};
