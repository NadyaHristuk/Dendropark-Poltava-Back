const express = require("express");
const ctrl = require("../../controllers/servicesControllers");

const router = express.Router();

const { validateBody, isValidId, autenticate } = require("../../middlewares");
const { schemas } = require("../../models/service");

router.get("/", ctrl.getAll);
router.get("/:id", isValidId, ctrl.getById);
router.post("/", autenticate, validateBody(schemas.createServiceSchema), ctrl.post);
router.delete("/:id", autenticate, isValidId, ctrl.remove);
router.put(
  "/:id",
  autenticate,
  isValidId,
  validateBody(schemas.updateServiceSchema),
  ctrl.update
);

module.exports = router;
