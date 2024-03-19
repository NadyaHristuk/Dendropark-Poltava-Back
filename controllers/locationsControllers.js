const { ctrlWrapper } = require("../helpers");
const {
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
  createLocation,
} = require("../services/locationsServise");

const getAll = async (req, res) => {
  const { page, limit } = req.query;
  const result = await getAllLocations(page, limit);
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await getLocationById(id);
  res.json(result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { en, ua, number } = req.body;
  const { image, mapImage } = req.files;

  const imagePath = image && image.length > 0 ? image[0].path : null;
  const mapPath = mapImage && mapImage.length > 0 ? mapImage[0].path : null;

  const updatedLocation = {
    ua: ua
      ? {
          title: ua.title ? ua.title : null,
          description: ua.description ? ua.description : null,
          imgAlt: ua.imgAlt ? ua.imgAlt : null,
        }
      : null,
    en: en
      ? {
          title: en.title ? en.title : null,
          description: en.description ? en.description : null,
          imgAlt: en.imgAlt ? en.imgAlt : null,
        }
      : null,
    number: number ? number : null,
    image: imagePath,
    mapImage: mapPath,
  };

  const result = await updateLocation(id, updatedLocation);
  res.json(result);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const result = await deleteLocation(id);
  res.json(result);
};

const post = async (req, res) => {
  if (!req.files) {
    return res.status(400).json({ message: "Files not uploaded" });
  }
  const { _id: owner } = req.user;
  const { en, ua, number } = req.body;
  const { path: imagePath } = req.files.image[0];
  const { path: mapPath } = req.files.mapImage[0];

  const newLocation = {
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
    // locationId,
    number,
    mapImage: mapPath,
    image: imagePath,
    owner,
  };
  const result = await createLocation(newLocation);
  res.status(201).json(result);
};
module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  update: ctrlWrapper(update),
  remove: ctrlWrapper(remove),
  post: ctrlWrapper(post),
};
