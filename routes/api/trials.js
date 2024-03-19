const express = require("express");
const ctrl = require("../../controllers/trialsControllers");

const router = express.Router();

const { validateBody, isValidId, autenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/trial");

router.get("/", ctrl.getAll);
router.get("/:id", isValidId, ctrl.getById);

router.post(
  "/",
  autenticate,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "mapImage", maxCount: 1 },
  ]),
  validateBody(schemas.createTrialSchema),
  ctrl.post
);

router.delete("/:id", autenticate, isValidId, ctrl.remove);
router.put(
  "/:id",
  autenticate,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "mapImage", maxCount: 1 },
  ]),
  isValidId,
  validateBody(schemas.updateTrialSchema),
  ctrl.update
);

module.exports = router;
