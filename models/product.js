const { Schema, model } = require("mongoose");
const Joi = require("joi");

const productsSchema = new Schema(
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
    price: {
      type: Number,
      required: true,
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

const Product = model("Product", productsSchema);

const createProductSchema = Joi.object({
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
  price: Joi.number().required(),
});

const updateProductSchema = Joi.object({
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
  price: Joi.number(),
});

const schemas = {
  createProductSchema,
  updateProductSchema,
};

module.exports = { Product, schemas };

// {
//   "uk": {
//     "title": "Назва продукту",
//     "description": "Опис продукту",
//     "price": 10.99,
//     "imgAlt": "Альтернативний текст для зображення"
//   },
//   "en": {
//     "title": "Product Title",
//     "description": "Product Description",
//     "price": 10.99,
//     "imgAlt": "Image Alt Text"
//   },
//   "image": "Шлях до зображення"
// }
