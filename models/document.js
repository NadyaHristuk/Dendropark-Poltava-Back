const { Schema, model } = require("mongoose");
const Joi = require("joi");

const documentSchema = new Schema(
  {
    ua: {
      title: {
        type: String,
        required: true,
      },
      subtitle: {
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
      subtitle: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
    document: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const createDocumentSchema = Joi.object({
  ua: Joi.object({
    title: Joi.string().required(),
    subtitle: Joi.string().required(),
    description: Joi.string().required(),
  }),
  en: Joi.object({
    title: Joi.string().required(),
    subtitle: Joi.string().required(),
    description: Joi.string().required(),
  }),
  document: Joi.string().required(),
});

const updateDocumentSchema = Joi.object({
  ua: Joi.object({
    title: Joi.string(),
    subtitle: Joi.string(),
    description: Joi.string(),
  }),
  en: Joi.object({
    title: Joi.string(),
    subtitle: Joi.string(),
    description: Joi.string(),
  }),
  document: Joi.string(),
});

const schemas = {
  createDocumentSchema,
  updateDocumentSchema,
};

const Document = model("Document", documentSchema);

module.exports = { Document, schemas };

//res json
// {
//   "uk": {
//     "title": "Назва документа",
//     "subtitle": "Підзаголовок документа",
//     "description": "Опис документа"
//   },
//   "en": {
//     "title": "Document Title",
//     "subtitle": "Document Subtitle",
//     "description": "Document Description"
//   },
//   "document": "Document Content"
// }
