const { ctrlWrapper } = require("../helpers");
const {
  getAllDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
  createDocument,
} = require("../services/documentsServise");

const getAll = async (req, res) => {
  const { page, limit } = req.query;
  const result = await getAllDocuments(page, limit);
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await getDocumentById(id);
  res.json(result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const result = await updateDocument(id, req.body);
  res.json(result);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const result = await deleteDocument(id);
  res.json(result);
};

const post = async (req, res) => {
  const { _id: owner } = req.user;
  const { ua, en, document } = req.body;
  const newDocument = {
    ua: {
      title: ua.title,
      subtitle: ua.subtitle,
      description: ua.description,
    },
    en: {
      title: en.title,
      subtitle: en.subtitle,
      description: en.description,
    },
    document,
    owner,
  };
  const result = await createDocument(newDocument);
  res.status(201).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  update: ctrlWrapper(update),
  remove: ctrlWrapper(remove),
  post: ctrlWrapper(post),
};
