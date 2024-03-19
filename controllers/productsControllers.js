const { ctrlWrapper } = require("../helpers");
const {
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProduct,
} = require("../services/productsServise");

const getAll = async (req, res) => {
  const { page, limit } = req.query;
  const result = await getAllProducts(page, limit);
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await getProductById(id);
  res.json(result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { en, ua, price } = req.body;
  const { path: imagePath } = req.file;

  const updatedProduct = {
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
    price: price ? price : null,
    image: imagePath ? imagePath : null,
  };

  const result = await updateProduct(id, updatedProduct);
  res.json(result);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const result = await deleteProduct(id);
  res.json(result);
};

const post = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const { _id: owner } = req.user;
  const { en, ua, price } = req.body;
  const { path: imagePath } = req.file;

  const newProduct = {
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
    price,
    image: imagePath,
    owner,
  };
  const result = await createProduct(newProduct);
  res.status(201).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  update: ctrlWrapper(update),
  remove: ctrlWrapper(remove),
  post: ctrlWrapper(post),
};
