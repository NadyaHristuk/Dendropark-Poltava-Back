const express = require("express");
const ctrl = require("../../controllers/eventsControllers");

const router = express.Router();
const { isValidId, autenticate, validateBody, upload } = require("../../middlewares");
const { schemas } = require("../../models/event");

router.get("/", ctrl.getAll);
router.get("/:id", isValidId, ctrl.getById);
router.post(
  "/",
  autenticate,
  upload.single("image"),
  validateBody(schemas.createEventSchema),
  ctrl.post
);

router.delete("/:id", autenticate, isValidId, ctrl.remove);
router.put(
  "/:id",
  autenticate,
  upload.single("image"),
  isValidId,
  validateBody(schemas.updateEventSchema),
  ctrl.update
);

module.exports = router;
