const express = require("express");
const ctrl = require("../../controllers/donationsControllers");

const router = express.Router();

const { validateBody, isValidId, autenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/donation");

router.get("/", ctrl.getAll);
router.get("/:id", isValidId, ctrl.getById);
router.post(
  "/",
  autenticate,
  // upload.single("image"),
  validateBody(schemas.createDonationSchema),
  ctrl.post
);
router.delete("/:id", autenticate, isValidId, ctrl.remove);
router.put(
  "/:id",
  autenticate,
  isValidId,
  validateBody(schemas.updateDonationSchema),
  ctrl.update
);

module.exports = router;
