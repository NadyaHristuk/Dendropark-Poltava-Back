const { ctrlWrapper } = require("../helpers");
const {
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  createEvent,
} = require("../services/eventsServise");

const getAll = async (req, res) => {
  const { page, limit } = req.query;
  const result = await getAllEvents(page, limit);
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await getEventById(id);
  res.json(result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const result = await updateEvent(id, req.body);
  res.json(result);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const result = await deleteEvent(id);
  res.json(result);
};

const post = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const { _id: owner } = req.user;
  const { ua, en } = req.body;
  const { path: imagePath } = req.file;
  const newEvent = {
    ua: {
      title: ua.title,
      description: ua.description,
      imgAlt: ua.imgAlt,
    },
    en: {
      title: en.title,
      description: en.description,
      imgAlt: en.imgAlt,
    },
    image: imagePath,
    owner,
  };
  const result = await createEvent(newEvent);
  res.status(201).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  update: ctrlWrapper(update),
  remove: ctrlWrapper(remove),
  post: ctrlWrapper(post),
};
