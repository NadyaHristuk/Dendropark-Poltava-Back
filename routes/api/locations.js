const express = require("express");
const ctrl = require("../../controllers/locationsControllers");

const router = express.Router();
const { isValidId, autenticate, validateBody, upload } = require("../../middlewares");
const { schemas } = require("../../models/location");

router.get("/", ctrl.getAll);
router.get("/:id", isValidId, ctrl.getById);
router.post(
  "/",
  autenticate,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "mapImage", maxCount: 1 },
  ]),
  validateBody(schemas.createLocationSchema),
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
  validateBody(schemas.updateLocationSchema),
  ctrl.update
);

module.exports = router;
