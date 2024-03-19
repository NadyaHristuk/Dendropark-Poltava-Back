const { Schema, model } = require("mongoose");
const Joi = require("joi");

const serviceSchema = new Schema(
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
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const createServiceSchema = Joi.object({
  ua: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
  }),
  en: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
  }),
});

const updateServiceSchema = Joi.object({
  ua: Joi.object({
    title: Joi.string(),
    description: Joi.string(),
  }),
  en: Joi.object({
    title: Joi.string(),
    description: Joi.string(),
  }),
});

const schemas = {
  createServiceSchema,
  updateServiceSchema,
};

const Service = model("Service", serviceSchema);

module.exports = { Service, schemas };
