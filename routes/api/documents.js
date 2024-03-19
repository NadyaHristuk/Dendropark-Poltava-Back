const express = require("express");
const ctrl = require("../../controllers/documentsControllers");

const router = express.Router();

const { validateBody, isValidId, autenticate } = require("../../middlewares");
const { schemas } = require("../../models/document");

router.get("/", ctrl.getAll);
router.get("/:id", isValidId, ctrl.getById);
router.post("/", autenticate, validateBody(schemas.createDocumentSchema), ctrl.post);
router.delete("/:id", autenticate, isValidId, ctrl.remove);
router.put(
  "/:id",
  autenticate,
  isValidId,
  validateBody(schemas.updateDocumentSchema),
  ctrl.update
);

module.exports = router;
