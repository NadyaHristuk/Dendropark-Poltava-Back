const { HttpError } = require("../helpers");
const { Product } = require("../models/product");

const getAllProducts = async (page = 1, limit = 20) => {
  const skip = (page - 1) * limit;
  return await Product.find({}, "-createdAt -updatedAt -owner", { skip, limit });
};

const getProductById = async (id) => {
  const result = await Product.findById(id);
  if (!result) {
    throw HttpError(404);
  }
  return result;
};

const updateProduct = async (id, newData) => {
  const result = await Product.findByIdAndUpdate(id, newData, { new: true });
  if (!result) {
    throw HttpError(404);
  }
  return result;
};

const deleteProduct = async (id) => {
  const result = await Product.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404);
  }
  return { message: "delete success" };
};

const createProduct = async (productData) => {
  return await Product.create(productData);
};

module.exports = {
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProduct,
};
