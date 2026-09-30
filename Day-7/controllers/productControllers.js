import ProductModel from "../models/productSchema.js";

export const createProduct = async (req, res, next) => {
  try {
    const { name, price, stock, img, category, userId } = req.body;

    if (!name || !price || !stock || !img || !category || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new ProductModel({
      name: name,
      price: price,
      stock: stock,
      category,
      img: img,
      sellerId : userId
    });
    console.log(newProduct, "newProduct");
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

export const operators = async (req, res, next) => {
  try {
    // const products = await ProductModel.find({ price: { $gt: 10000 } });
    // const products = await ProductModel.find({ price: { $gte: 10000 } });
    // const products = await ProductModel.find({ price: { $lt: 2000 } });
    // const products = await ProductModel.find({ price: { $lte: 2000 } });
    // const products = await ProductModel.find({
    //   category: { $in: ["electronics","clothing","footwear"] },
    // });
    // const products = await ProductModel.find({
    //   category: { $nin: ["electronics", "clothing"] },
    // });

    // const products = await ProductModel.find({
    //   $and: [
    //     { price: { $gt: 1000 } },
    //     { category: { $in: ["clothing", "footwear"] } },
    //     { stock: { $lt: 100 } },
    //   ],
    // });
    // const products = await ProductModel.find({
    //   $or: [
    //     { price: { $gt: 1000 } },
    //     { category: { $in: ["clothing", "footwear"] } },
    //     { stock: { $lt: 100 } },
    //   ],
    // });
    // page = 1
    // docuemnt = 10
    // skip = (page - 1) * document
    //       =  1 - 1  * 10 = 10
    //       =. 0 * 10 = 0
    const products = await ProductModel.find(
      {
        price: { $not: { $gt: 2000 } },
      },
      { name: 1, price: 1, _id: 0, stock: 1 },
    )
      .sort({ stock: 1 })
      .limit(10)
      .skip(skip);
    return res.status(200).json({ products });
  } catch (error) {
    next(error);
  }
};

export const aggregationPipeline = async (req, res, next) => {
  try {
    const result = await ProductModel.aggregate([
      // { $match: { category: { $in: ["footwear", "clothing", "electronics"] } } },
      // { $match: { category: "footwear" } },
      { $match: { price: { $gt: 100 } } },
      // {
      //   $group: {
      //     _id: "$name",
      //     totalPrice: { $sum: { $multiply: ["$price", "$stock"] } },
      //   },
      // },
      {
        $group: {
          _id: "$category",
          totalProducts: {
            $sum: 1,
          },
          totalStock: {
            $sum: "$stock",
          },
          totalPrice: {
            $sum: { $multiply: ["$price", "$stock"] },
          },
          categoryWiseAvgPrice: {
            $avg: "$price",
          },
          minimumPrice: {
            $min: "$price",
          },
          maximumPrice: {
            $max: "$price",
          },
          extra: { $sum: "$price" },
        },
      },
      { $sort: { totalPrice: 1 } },
      { $project: { extra: 0 } },
    ]);
    [
      // {=
      //   "_id": "footwear",
      //   "totalProduct": 2
      // },
      // {
      //   "_id": "electronics",
      //   "totalProduct": 2
      // },
      // {
      //   "_id": "clothing",
      //   "totalProduct": 3
      // }
    ];
    return res.json(result);
  } catch (error) {
    next(error);
  }
};
