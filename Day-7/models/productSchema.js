import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: String,
  price: Number,
  stock: Number,
  category: String,
  img: String,
});

const ProductModel = model("products", productSchema);

export default ProductModel;
