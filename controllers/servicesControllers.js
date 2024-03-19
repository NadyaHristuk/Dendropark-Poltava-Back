const { ctrlWrapper } = require("../helpers");
const {
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
  createService,
} = require("../services/servicesService");

const getAll = async (req, res) => {
  const { page, limit } = req.query;
  const result = await getAllServices(page, limit);
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await getServiceById(id);
  res.json(result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const result = await updateService(id, req.body);
  res.json(result);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const result = await deleteService(id);
  res.json(result);
};

const post = async (req, res) => {
  const { _id: owner } = req.user;
  const { ua, en } = req.body;
  const newDocument = {
    ua: {
      title: ua.title,
      description: ua.description,
    },
    en: {
      title: en.title,
      description: en.description,
    },
    owner,
  };
  const result = await createService(newDocument);
  res.status(201).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  update: ctrlWrapper(update),
  remove: ctrlWrapper(remove),
  post: ctrlWrapper(post),
};
