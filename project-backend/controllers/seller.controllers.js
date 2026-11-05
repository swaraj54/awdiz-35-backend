import ProductSchema from "../models/product.schema.js";
import SellerOrderSchema from "../models/sellerOrders.schema.js";

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

    return res.status(200).json({ success: true, product, message: "Product created successfully." });
  } catch (error) {
    return res.status(500).json({ error, success: false });
  }
};


export const getOrders = async (req, res) => {
  try {
    const sellerId = req.user._id;
    const orders = await SellerOrderSchema.find({ seller: sellerId }).populate("user product seller");
    return res
      .status(200)
      .json({ success: true, orders: orders.length > 0 ? orders : [] });
  } catch (error) {
    return res.status(500).json({ error, success: false });
  }
};

export const changePaymentStatus = async (req, res) => {
  try {
    const { orderId, newStatus: payment_status } = req.body;
    if (!orderId || !payment_status) {
      return res.status(404).json({ success: false, message: "All fields are required." });
    }
    const sellerId = req.user._id;
    const updatedOrderDocument = await SellerOrderSchema.findOneAndUpdate({ _id: orderId, seller: sellerId }, { payment_status }, { new: true });
    const orders = await SellerOrderSchema.find({ seller: sellerId }).populate("user product seller");
    return res
      .status(200)
      .json({ success: true, orders });
  } catch (error) {
    return res.status(500).json({ error, success: false });
  }
}

export const changeDeliveryStatus = async (req, res) => {
  try {
    const { orderId, newStatus: delivery_status } = req.body;
    if (!orderId || !delivery_status) {
      return res.status(404).json({ success: false, message: "All fields are required." });
    }
    const sellerId = req.user._id;
    const updatedOrderDocument = await SellerOrderSchema.findOneAndUpdate({ _id: orderId, seller: sellerId }, { delivery_status }, { new: true });
    const orders = await SellerOrderSchema.find({ seller: sellerId }).populate("user product seller");
    return res
      .status(200)
      .json({ success: true, orders });
  } catch (error) {
    return res.status(500).json({ error, success: false });
  }
}

export const getDashboardData = async (req, res) => {
  try {

    const sellerId = req.user._id;
    const totalOrders = await SellerOrderSchema.countDocuments({ seller: sellerId });

    const totalProfit = await SellerOrderSchema.aggregate([
      { $match: { seller: sellerId } },
      { $group: { _id: null, totalProfit: { $sum: "$profit" } } }
    ]);
    const totalProducts = await ProductSchema.countDocuments({ sellerId });
    const totalStock = await ProductSchema.aggregate([
      { $match: { sellerId } },
      { $group: { _id: null, totalStock: { $sum: "$stock" } } }
    ]);
    const totalPendingOrders = await SellerOrderSchema.countDocuments({ seller: sellerId, delivery_status: "booked" });
    const totalDispatchedOrders = await SellerOrderSchema.countDocuments({ seller: sellerId, delivery_status: "dispatched" });
    const totalDeliveredOrders = await SellerOrderSchema.countDocuments({ seller: sellerId, delivery_status: "delivered" });

    return res.status(200).json({
      success: true,
      data: {
        totalOrders,
        totalProfit: totalProfit[0]?.totalProfit || 0,
        totalProducts,
        totalStock: totalStock[0]?.totalStock || 0,
        totalPendingOrders,
        totalDispatchedOrders,
        totalDeliveredOrders
      }
    });
  } catch (error) {
    return res.status(500).json({ error, success: false });
  }
}