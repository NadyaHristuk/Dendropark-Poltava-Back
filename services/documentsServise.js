const { HttpError } = require("../helpers");
const { Document } = require("../models/document");

const getAllDocuments = async (page = 1, limit = 20) => {
  const skip = (page - 1) * limit;
  return await Document.find({}, "-createdAt -updatedAt -owner", {
    skip,
    limit,
  });
};

const getDocumentById = async (id) => {
  const result = await Document.findById(id);
  if (!result) {
    throw HttpError(404);
  }
  return result;
};

const updateDocument = async (id, newData) => {
  const updatedDocument = await Document.findByIdAndUpdate(id, newData, { new: true });
  if (!updatedDocument) {
    throw HttpError(404, "Document not found");
  }
  return updatedDocument;
};

const deleteDocument = async (id) => {
  const result = await Document.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404);
  }
  return { message: "delete success" };
};

const createDocument = async (documentData) => {
  return await Document.create(documentData);
};

module.exports = {
  getAllDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
  createDocument,
};
