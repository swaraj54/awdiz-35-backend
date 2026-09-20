import ProductModel from "../models/productSchema.js";

export const createProduct = async (req, res, next) => {
  try {
    const { name, price, stock, img, category } = req.body;

    if (!name || !price || !stock || !img || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new ProductModel({
      name: name,
      price: price,
      stock: stock,
      category,
      img: img,
    });

    await newProduct.save();

    return res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    // throw new Error("Database connection failed");
    const allProducts = await ProductModel.find();
    return res
      .status(200)
      .json({ allProducts, message: "All products retrieved successfully" });
  } catch (error) {
    // console.log(error,"error")
    next(error);
  }
};
