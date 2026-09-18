export const createProduct = async (req, res, next) => {
  try {
    const { name, price, description, stock, img, category } = req.body;

    if (!name || !price || !description || !stock || !img || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    return res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    throw new Error("Database connection failed");
    // return res
    //   .status(200)
    //   .json({ message: "All products retrieved successfully" });
  } catch (error) {
    // console.log(error,"error")
    next(error);
  }
};
