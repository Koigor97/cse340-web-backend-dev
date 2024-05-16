const express = require("express");
const router = express.Router();
const invController = require("../controllers/invController");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build vehicle detail view
router.get("/detail/:vehicleId", invController.buildVehicleDetail);

router.get("/cause-error", (req, res, next) => {
  next(new Error("Intentional error for testing purposes"));
});

module.exports = router;
