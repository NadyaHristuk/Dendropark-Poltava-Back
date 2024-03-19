const { Trial } = require("../models/trial");
const { HttpError } = require("../helpers");

const getAllTrials = async (page = 1, limit = 20) => {
  const skip = (page - 1) * limit;
  return await Trial.find({}, "-createdAt -updatedAt -owner", { skip, limit });
};

const getTrialById = async (id) => {
  const result = await Trial.findById(id);
  if (!result) {
    throw HttpError(404);
  }
  return result;
};

const updateTrial = async (id, newData) => {
  const result = await Trial.findByIdAndUpdate(id, newData, { new: true });
  if (!result) {
    throw HttpError(404);
  }
  return result;
};

const deleteTrial = async (id) => {
  const result = await Trial.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404);
  }
  return result;
};

const createTrial = async (trialData) => {
  const result = await Trial.create(trialData);
  if (!result) {
    throw HttpError(404);
  }
  return result;
};

module.exports = {
  getAllTrials,
  getTrialById,
  updateTrial,
  deleteTrial,
  createTrial,
};
