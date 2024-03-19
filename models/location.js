const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const locationSchema = new Schema(
  {
    ua: {
      title: {
        type: String,
        required: true,
      },
      description: {
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
      description: {
        type: String,
        required: true,
      },
      imgAlt: {
        type: String,
      },
    },
    number: {
      type: String,
      required: true,
    },
    // locationId: {
    //   type: String,
    //   required: true,
    // },
    image: {
      type: String,
    },
    mapImage: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const createLocationSchema = Joi.object({
  ua: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    imgAlt: Joi.string(),
  }),
  en: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    imgAlt: Joi.string(),
  }),
  number: Joi.string().required(),
  // locationId: Joi.string().required(),
});

const updateLocationSchema = Joi.object({
  ua: Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    imgAlt: Joi.string(),
  }),
  en: Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    imgAlt: Joi.string(),
  }),
  number: Joi.string(),
  // locationId: Joi.string(),
});

const schemas = {
  createLocationSchema,
  updateLocationSchema,
};

const Location = mongoose.model("Location", locationSchema);

module.exports = { Location, schemas };
