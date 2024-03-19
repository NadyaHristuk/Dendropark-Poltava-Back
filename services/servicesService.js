const { HttpError } = require("../helpers");
const { Service } = require("../models/service");

const getAllServices = async (page = 1, limit = 20) => {
  const skip = (page - 1) * limit;
  return await Service.find({}, "-createdAt -updatedAt -owner", {
    skip,
    limit,
  });
};

const getServiceById = async (id) => {
  const result = await Service.findById(id);
  if (!result) {
    throw HttpError(404);
  }
  return result;
};

const updateService = async (id, newData) => {
  const updatedDocument = await Service.findByIdAndUpdate(id, newData, { new: true });
  if (!updatedDocument) {
    throw HttpError(404, "Document not found");
  }
  return updatedDocument;
};

const deleteService = async (id) => {
  const result = await Service.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404);
  }
  return { message: "delete success" };
};

const createService = async (documentData) => {
  return await Service.create(documentData);
};

module.exports = {
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
  createService,
};
