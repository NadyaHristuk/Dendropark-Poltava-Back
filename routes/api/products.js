const express = require("express");
const ctrl = require("../../controllers/productsControllers");

const router = express.Router();

const { validateBody, isValidId, autenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/product");

router.get("/", ctrl.getAll);
router.get("/:id", isValidId, ctrl.getById);
router.post(
  "/",
  autenticate,
  upload.single("image"),
  validateBody(schemas.createProductSchema),
  ctrl.post
);
router.delete("/:id", autenticate, isValidId, ctrl.remove);
router.put(
  "/:id",
  autenticate,
  upload.single("image"),
  isValidId,
  validateBody(schemas.updateProductSchema),
  ctrl.update
);

module.exports = router;
