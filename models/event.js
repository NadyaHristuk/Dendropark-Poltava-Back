const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const eventSchema = new Schema(
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
    image: {
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

const createEventSchema = Joi.object({
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
});

const updateEventSchema = Joi.object({
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
});

eventSchema.post("save", handleMongooseError);
const Event = model("Event", eventSchema);

const schemas = {
  createEventSchema,
  updateEventSchema,
};

module.exports = { Event, schemas };

// {
//   "uk": {
//     "title": "Назва події",
//     "description": "Опис події",
//     "imgAlt": "Альтернативний текст для зображення"
//   },
//   "en": {
//     "title": "Event Title",
//     "description": "Event Description",
//     "imgAlt": "Image Alt Text"
//   },
//   "image": "Прикріпленний файл"
// }
