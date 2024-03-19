const { Schema, model } = require("mongoose");
const Joi = require("joi");

const donationsSchema = new Schema(
  {
    ua: {
      description: {
        type: String,
        required: true,
      },
      buttonText: {
        type: String,
        required: true,
      },
    },
    en: {
      description: {
        type: String,
        required: true,
      },
      buttonText: {
        type: String,
        required: true,
      },
    },
    link: {
      type: String,
      required: true,
    },
    // icon: {
    //   type: String,
    // },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const createDonationSchema = Joi.object({
  ua: Joi.object({
    description: Joi.string().required(),
    buttonText: Joi.string().required(),
  }),
  en: Joi.object({
    description: Joi.string().required(),
    buttonText: Joi.string().required(),
  }),
  link: Joi.string().required(),
  // icon: Joi.string(),
});

const updateDonationSchema = Joi.object({
  ua: Joi.object({
    description: Joi.string(),
    buttonText: Joi.string(),
  }),
  en: Joi.object({
    description: Joi.string(),
    buttonText: Joi.string(),
  }),
  link: Joi.string(),
  // icon: Joi.string(),
});

const schemas = {
  createDonationSchema,
  updateDonationSchema,
};

const Donation = model("Donation", donationsSchema);

module.exports = { Donation, schemas };
