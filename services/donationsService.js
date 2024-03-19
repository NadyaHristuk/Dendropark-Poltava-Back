const { HttpError } = require("../helpers");
const { Donation } = require("../models/donation");

const getDonations = async (page = 1, limit = 20) => {
  const skip = (page - 1) * limit;
  return await Donation.find({}, "-createdAt -updatedAt -owner", {
    skip,
    limit,
  });
};

const getDonationById = async (id) => {
  const result = await Donation.findById(id);
  if (!result) {
    throw HttpError(404);
  }
  return result;
};

const updateDonation = async (id, newData) => {
  const updatedDocument = await Donation.findByIdAndUpdate(id, newData, { new: true });
  if (!updatedDocument) {
    throw HttpError(404, "Document not found");
  }
  return updatedDocument;
};

const deleteDonation = async (id) => {
  const result = await Donation.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404);
  }
  return { message: "delete success" };
};

const createDonation = async (documentData) => {
  return await Donation.create(documentData);
};

module.exports = {
  getDonations,
  getDonationById,
  updateDonation,
  deleteDonation,
  createDonation,
};
