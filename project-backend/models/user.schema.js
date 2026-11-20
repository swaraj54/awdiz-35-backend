import { Schema, model } from "mongoose";

const userSchema = Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  role: { type: String, default: "user", enum: ["user", "seller", "admin"] },
  isApprovedByAdmin: { type: Boolean, default: false },
  isAccountDeleted: { type: Boolean, default: false },
});

const UserSchema = model("users", userSchema);

export default UserSchema;
