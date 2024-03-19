const { ctrlWrapper } = require("../helpers");
const {
  getAllTrials,
  getTrialById,
  updateTrial,
  deleteTrial,
  createTrial,
} = require("../services/trialServise");

const getAll = async (req, res) => {
  const { page, limit } = req.query;
  const result = await getAllTrials(page, limit);
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await getTrialById(id);
  res.json(result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { ua, en, distance } = req.body;
  const { image, mapImage } = req.files;

  const imagePath = image && image.length > 0 ? image[0].path : null;
  const mapPath = mapImage && mapImage.length > 0 ? mapImage[0].path : null;

  const updatedTrial = {
    ua: ua
      ? {
          title: ua.title ? ua.title : null,
          text: ua.text ? ua.text : null,
          imgAlt: ua.imgAlt ? ua.imgAlt : null,
        }
      : null,
    en: en
      ? {
          title: en.title ? en.title : null,
          text: en.text ? en.text : null,
          imgAlt: en.imgAlt ? en.imgAlt : null,
        }
      : null,
    distance,
    image: imagePath,
    mapImage: mapPath,
  };

  const result = await updateTrial(id, updatedTrial);
  res.json(result);
};

const remove = async (req, res) => {
  const { id } = req.params;
  await deleteTrial(id);
  res.json({ message: "delete success" });
};

const post = async (req, res) => {
  if (!req.files) {
    return res.status(400).json({ message: "Files not uploaded" });
  }
  const { _id: owner } = req.user;
  const { ua, en, distance } = req.body;
  const { path: imagePath } = req.files.image[0];
  const { path: mapPath } = req.files.mapImage[0];

  const newTrial = {
    ua: {
      title: ua.title,
      text: ua.text,
      imgAlt: ua.imgAlt,
    },
    en: {
      title: en.title,
      text: en.text,
      imgAlt: en.imgAlt,
    },
    distance,
    image: imagePath,
    mapImage: mapPath,
    owner,
  };

  const result = await createTrial(newTrial);
  res.status(201).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  update: ctrlWrapper(update),
  remove: ctrlWrapper(remove),
  post: ctrlWrapper(post),
};
