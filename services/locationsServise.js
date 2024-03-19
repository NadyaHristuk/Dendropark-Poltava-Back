const { HttpError } = require("../helpers");
const { Location } = require("../models/location");

const getAllLocations = async (page = 1, limit = 20) => {
  const skip = (page - 1) * limit;
  return await Location.find({}, "-createdAt -updatedAt -owner", { skip, limit });
};

const getLocationById = async (id) => {
  const result = await Location.findById(id);
  if (!result) {
    throw HttpError(404);
  }
  return result;
};

const updateLocation = async (id, newData) => {
  const result = await Location.findByIdAndUpdate(id, newData, { new: true });
  if (!result) {
    throw HttpError(404);
  }
  return result;
};

const deleteLocation = async (id) => {
  const result = await Location.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404);
  }
  return { message: "delete success" };
};

const createLocation = async (locationData) => {
  return await Location.create(locationData);
};

module.exports = {
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
  createLocation,
};
