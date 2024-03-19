const { Schema, model } = require("mongoose");
const Joi = require("joi");

const trailSchema = new Schema(
  {
    ua: {
      title: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      imgAlt: {
        type: String,
      },
    },
    en: {
      title: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      imgAlt: {
        type: String,
      },
    },
    distance: {
      type: Number,
    },
    image: {
      type: String,
    },
    mapImage: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },

  { versionKey: false, timestamps: true }
);

const createTrialSchema = Joi.object({
  ua: Joi.object({
    title: Joi.string().required(),
    text: Joi.string().required(),
    imgAlt: Joi.string(),
  }),
  en: Joi.object({
    title: Joi.string().required(),
    text: Joi.string().required(),
    imgAlt: Joi.string(),
  }),
  distance: Joi.number(),
});

const updateTrialSchema = Joi.object({
  ua: Joi.object({
    title: Joi.string(),
    text: Joi.string(),
    imgAlt: Joi.string(),
  }),
  en: Joi.object({
    title: Joi.string(),
    text: Joi.string(),
    imgAlt: Joi.string(),
  }),
  distance: Joi.number(),
});

const schemas = {
  createTrialSchema,
  updateTrialSchema,
};

const Trial = model("Trial", trailSchema);

module.exports = { Trial, schemas };

// {
//   "uk": {
//     "distance": 10,
//     "title": "Прогулянка в парку",
//     "text": "Це опис прогулянки в парку.",
//     "imgAlt": "Зображення парку"
//   },
//   "en": {
//     "distance": 10,
//     "title": "Park Walk",
//     "text": "This is a description of a walk in the park.",
//     "imgAlt": "Park Image"
//   },
//   "image": "Шлях до зображення",
//   "mapImage": "Шлях до карти маршруту"
// }
