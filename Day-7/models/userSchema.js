import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  contact: Number,
});

const UserModel = model("Users", userSchema);

export default UserModel;

