const { ctrlWrapper } = require("../helpers");
const {
  getDonations,
  updateDonation,
  deleteDonation,
  createDonation,
  getDonationById,
} = require("../services/donationsService");

const getAll = async (req, res) => {
  const { page, limit } = req.query;
  const result = await getDonations(page, limit);
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await getDonationById(id);
  res.json(result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const result = await updateDonation(id, req.body);
  res.json(result);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const result = await deleteDonation(id);
  res.json(result);
};

const post = async (req, res) => {
  const { _id: owner } = req.user;
  const { ua, en, icon, link } = req.body;

  const newQr = {
    ua: {
      description: ua.description,
      buttonText: ua.buttonText,
    },
    en: {
      description: en.description,
      buttonText: en.buttonText,
    },
    link,
    icon,
    owner,
  };

  const result = await createDonation(newQr);
  res.status(201).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  update: ctrlWrapper(update),
  remove: ctrlWrapper(remove),
  post: ctrlWrapper(post),
};
