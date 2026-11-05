import mongoose, { model, Schema } from "mongoose";

const sellerOrderSchema = Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
    mfgCost: { type: Number },  // 50
    price: { type: Number },  // 100
    finalCost: { type: Number },// price - deliverycost - serviceCost   100  -> -10% + -5% =  -15% -> 85
    serviceCost: { type: Number }, // 10% -> 10
    deliveryCost: { type: Number }, // 5% -> 5
    profit: { type: Number }, //  finalCost - mfgCost => 85 - 50 =? 35
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

const SellerOrderSchema = model("sellerOrders", sellerOrderSchema);

export default SellerOrderSchema;
