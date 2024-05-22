const utilities = require("./");
const { body, validationResult } = require("express-validator");
const validate = {};

/*  **********************************
 *  Registration Data Validation Rules
 * ********************************* */
validate.registationRules = () => {
  return [
    // firstname is required and must be string
    body("account_firstname")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a first name."), // on error this message is sent.

    // lastname is required and must be string
    body("account_lastname")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage("Please provide a last name."), // on error this message is sent.

    // valid email is required and cannot already exist in the DB
    body("account_email")
      .trim()
      .escape()
      .notEmpty()
      .isEmail()
      .normalizeEmail() // refer to validator.js docs
      .withMessage("A valid email is required."),

    // password is required and must be strong password
    body("account_password")
      .trim()
      .notEmpty()
      .isStrongPassword({
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage("Password does not meet requirements."),
  ];
};

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkRegData = async (req, res, next) => {
  const { account_firstname, account_lastname, account_email } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    res.render("account/register", {
      errors,
      title: "Registration",
      nav,
      account_firstname,
      account_lastname,
      account_email,
    });
    return;
  }
  next();
};

/*  **********************************
 *  Login Data Validation Rules
 * ********************************* */
validate.loginRules = () => {
  return [
    // email is required and must be string
    body("account_email")
      .trim()
      .escape()
      .notEmpty()
      .isEmail()
      .normalizeEmail()
      .withMessage("A valid email is required."),
    // password is required and must be string
    body("account_password")
      .trim()
      .notEmpty()
      .isStrongPassword({
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage("Password does not meet requirements."),
  ];
};

/* ******************************
 * Check data and return errors or continue to login
 * ***************************** */
validate.checkLoginData = async (req, res, next) => {
  const { account_email } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    res.render("account/login", {
      errors,
      title: "Login",
      nav,
      account_email,
    });
    return;
  }
  next();
};

/* ******************************
 * Addding classification Validation Rules
 * ***************************** */
validate.classificationRules = () => {
  return [
    body("classification_name")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please provide a classification name.")
      .matches(/^[a-zA-Z0-9]+$/)
      .withMessage(
        "Classification name cannot contain spaces or special characters."
      ),
  ];
};

/* ******************************
 * Check data and return errors or continue to classification
 * ***************************** */
validate.checkClassData = async (req, res, next) => {
  const { classification_name } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    res.render("inventory/add-classification", {
      errors,
      title: "Add Classification",
      nav,
      classification_name,
    });
    return;
  }
  next();
};

validate.inventoryRules = () => {
  return [
    body("inv_make")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please provide a make."),
    body("inv_model")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please provide a model."),
    body("inv_year")
      .isInt({ min: 1900, max: new Date().getFullYear() })
      .withMessage("Please provide a valid year."),
    body("inv_description")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please provide a description."),
    body("inv_image")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please provide an image path."),
    body("inv_thumbnail")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please provide a thumbnail path."),
    body("inv_price")
      .isFloat({ min: 0 })
      .withMessage("Please provide a valid price."),
    body("inv_miles")
      .isInt({ min: 0 })
      .withMessage("Please provide valid miles."),
    body("inv_color")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Please provide a color."),
  ];
};

validate.checkInventoryData = async (req, res, next) => {
  const {
    classification_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
  } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    let classifications = await utilities.buildClassificationList(
      classification_id
    );
    res.render("inventory/add-inventory", {
      errors,
      title: "Add Inventory Item",
      nav,
      classifications,
      classification_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
    });
    return;
  }
  next();
};

// Update inventory validation rules
validate.checkUpdateData = async (req, res, next) => {
  const {
    inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body;

  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    const classificationSelect = await utilities.buildClassificationList(
      classification_id
    );
    res.render("inventory/edit-inventory", {
      errors,
      title: "Edit " + inv_make + " " + inv_model,
      nav,
      classificationSelect,
      inv_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
    });
    return;
  }
  next();
};

module.exports = validate;
