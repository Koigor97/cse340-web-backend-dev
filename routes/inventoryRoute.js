const express = require("express");
const router = express.Router();
const invController = require("../controllers/invController");
const utilities = require("../utilities/");
const validation = require("../utilities/account-validation");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to build vehicle detail view
router.get("/detail/:vehicleId", invController.buildVehicleDetail);

// Route to build inventory management view
router.get(
  "/management",
  utilities.handleError(invController.buildManagementView)
);

// Route to build classification view
router.get(
  "/add-classification",
  utilities.handleError(invController.buildAddClassificationView)
);

// Route to build inventory  view
router.get(
  "/add-inventory",
  utilities.handleError(invController.buildAddInventoryView)
);

// Route to process adding a classification
router.post(
  "/add-classification",
  validation.classificationRules(),
  validation.checkClassData,
  utilities.handleError(invController.addClassification)
);

// Route to process adding an inventory item
router.post(
  "/add-inventory",
  validation.inventoryRules(),
  validation.checkInventoryData,
  utilities.handleError(invController.addInventory)
);

// Route for error testing
router.get("/cause-error", (req, res, next) => {
  next(new Error("Intentional error for testing purposes"));
});

module.exports = router;
