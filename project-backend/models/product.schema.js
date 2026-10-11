import { Schema, model } from "mongoose";

const productSchema = Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  image: { type: String, require: true },
  category: { type: String, enum: ["clothing", "electronics", "footwear","kitchen"] },
  price: { type: Number },
  stock: { type: Number },
  sellerId: { type: Schema.Types.ObjectId, ref: "users" },
  approvedByAdmin : {type : Boolean, default : false}
});

const ProductSchema = model("products", productSchema);

export default ProductSchema;
