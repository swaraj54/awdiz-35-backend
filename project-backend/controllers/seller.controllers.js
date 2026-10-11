import ProductSchema from "../models/product.schema.js";

export const getProducts = async (req, res) => {
  try {
    const products = await ProductSchema.find({});
    return res.status(200).json({ success: true, products });
  } catch (error) {
    return res.status(500).json({ error, success: false });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { category, description, image, name, price, stock } = req.body;
    if (!category || !description || !image || !name || !price || !stock) {
      return res
        .status(404)
        .json({ success: false, message: "All fields are requird." });
    }
    const sellerId = req.user._id;
    const product = await ProductSchema.create({
      category,
      description,
      image,
      name,
      price,
      stock,
      sellerId,
    });

    return res.status(200).json({ success: true, product, message : "Product created successfully." });
  } catch (error) {
    return res.status(500).json({ error, success: false });
  }
};
