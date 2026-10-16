import mongoose, { model, Schema } from "mongoose";

const cartSchema = Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
});

const CartSchema = model("carts", cartSchema);

export default CartSchema;
