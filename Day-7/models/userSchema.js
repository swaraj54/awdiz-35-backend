import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, default: "User" },
  email: { type: String, unique: true },
  password: String,
  contact: Number,
  role: { type: String, enum: ["user", "admin", "seller"], default: "user" },
});

const UserModel = model("Users", userSchema);

export default UserModel;
