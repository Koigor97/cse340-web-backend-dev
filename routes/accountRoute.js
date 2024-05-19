const express = require("express");
const router = express.Router();
const utilities = require("../utilities/");
const errorHandlers = require("../middleware/errorHandler");
const accountController = require("../controllers/accountController");
const regValidate = require("../utilities/account-validation");

// Route to build account view
router.get("/login", utilities.handleError(accountController.buildLogin));
// Route to build register view
router.get("/register", utilities.handleError(accountController.buildRegister));
// Route to process registration
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleError(accountController.registerAccount)
);
// Error handler
router.use(errorHandlers);

module.exports = router;
