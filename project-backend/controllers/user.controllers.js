import AddressSchema from "../models/address.schema.js";
import CartSchema from "../models/cart.schema.js";
import OrderSchema from "../models/orders.schema.js";
import ProductSchema from "../models/product.schema.js";
import UserSchema from "../models/user.schema.js";
import bcrypt from "bcrypt";

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await UserSchema.findById(userId).select("name email");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found." });
    }
    return res.status(200).json({ success: true, profile: user });
  } catch (error) {
    return res.status(500).json({ error, success: false });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductSchema.find({
      approvedByAdmin: true,
      stock: { $gt: 0 },
    });
    return res.status(200).json({ success: true, products });
  } catch (error) {
    return res.status(500).json({ error, success: false });
  }
};

export const getProductDetails = async (req, res) => {
  try {
    const productId = req.params.productId;
    if (!productId) {
      return res
        .status(401)
        .json({ success: false, message: "Product id is required." });
    }
    const productDocument = await ProductSchema.findById(productId);
    if (!productDocument) {
      return res
        .status(401)
        .json({ success: false, message: "Product not found." });
    }
    return res.status(200).json({ success: true, product: productDocument });
  } catch (error) {
    return res.status(500).json({ error, success: false });
  }
};

export const addToCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    if (!productId) {
      return res
        .status(401)
        .json({ success: false, message: "Product id is required." });
    }
    const userId = req.user._id;

    const existingCart = await CartSchema.findOne({ user: userId });
    if (existingCart) {
      console.log(existingCart, "existingCart");
      existingCart.products.push(productId);
      await existingCart.save();
    } else {
      var cartData = CartSchema.create({
        user: userId,
        products: [productId],
      });
      console.log(cartData, "cartData");
    }
    return res.status(201).json({
      success: true,
      cart: cartData,
      message: "Product successfully added to cart.",
    });
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ error, success: false });
  }
};

export const getCartProducts = async (req, res) => {
  try {
    const userId = req.user._id;

    const cartData = await CartSchema.findOne({ user: userId }).populate(
      "products",
    );
    return res
      .status(200)
      .json({ success: true, products: cartData?.products || [] });
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ error, success: false });
  }
};

export const createAddress = async (req, res) => {
  try {
    const { street, city, pincode } = req.body;
    const userId = req.user._id;

    const isUserAddressDocumentExists = await AddressSchema.findOne({
      user: userId,
    });

    if (isUserAddressDocumentExists) {
      isUserAddressDocumentExists.addresses.push({ street, city, pincode });
      const updatedDocument = await isUserAddressDocumentExists.save();

      return res
        .status(200)
        .json({ success: true, addresses: updatedDocument.addresses });
    } else {
      const newAddress = AddressSchema.create({
        user: userId,
        addresses: [{ street, city, pincode }],
      });

      return res
        .status(200)
        .json({ success: true, addresses: [{ street, city, pincode }] });
    }
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ error, success: false });
  }
};

export const getAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await AddressSchema.findOne({ user: userId });
    return res
      .status(200)
      .json({ success: true, addresses: user?.addresses || [] });
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ error, success: false });
  }
};

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { street, city, pincode, _id } = req.body;
    const userCart = await CartSchema.findOne({ user: userId }).populate({
      path: "products",
      select: "_id price",
    });

    console.log(userCart, "userCart");
    const newOrder = OrderSchema.create({
      user: userId,
      address: { street, city, pincode, addressId: _id },
      products: userCart.products.map((product) => ({
        productId: product._id,
        price: product.price,
      })),
    });
    console.log(newOrder, "newOrder");
    if (newOrder) {
      for (let i = 0; i < userCart.products.length; i++) {
        await ProductSchema.findByIdAndUpdate(userCart.products[i]._id, {
          $inc: { stock: -1 },
        });
      }
      userCart.products = [];
      await userCart.save();
    }

    // stock reduce -1

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ error, success: false });
  }
};

export const getOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await OrderSchema.find({ user: userId }).populate({ path: "products.productId", select: "name category image" });
    return res
      .status(200)
      .json({ success: true, orders: orders.length > 0 ? orders : [] });
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ error, success: false });
  }
};



export const changePassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({ error: "All fields are required.", success: false });
    }
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ error: "New password and confirm password do not match.", success: false });
    }

    const userData = await UserSchema.findById(userId);
    if (!userData) {
      return res.status(404).json({ error: "User not found.", success: false });
    }

    const isMatch = await bcrypt.compare(currentPassword, userData.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Current password is incorrect.", success: false });
    }

    const encryptedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    userData.password = encryptedNewPassword;

    await userData.save();

    return res.status(200).json({ success: true, message: "Password changed successfully." });

  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({ error, success: false });
  }
}