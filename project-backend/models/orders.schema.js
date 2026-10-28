import mongoose, { model, Schema } from "mongoose";

const orderSchema = Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
      price: { type: Number },
    },
  ],
  address: {
    street: { type: String },
    city: { type: String },
    pincode: { type: String },
    addressId: { type: String },
  },
  delivery_status: {
    type: String,
    default: "booked",
    enum: ["dispatched", "delivered", "booked"],
  },
  payment_status: { type: String, default: "unpaid", enum: ["paid", "unpaid"] },

});

// user
// products -> id , price
// address,
// delivery status,
// payment status
// total price ,

const OrderSchema = model("orders", orderSchema);

export default OrderSchema;
