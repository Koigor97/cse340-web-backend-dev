const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

// Build the inventory by classification view
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  const className = data[0].classification_name;
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  });

  //   next();
};

// Build the vehicle detail view
invCont.buildVehicleDetail = async function (req, res, next) {
  const vehicle_id = req.params.vehicleId;
  console.log(vehicle_id);
  const vehicle = await invModel.getVehicleById(vehicle_id);
  console.log(vehicle);
  const nav = await utilities.getNav();
  const vehicleHtml = utilities.buildVehicleDetail(vehicle);
  res.render("./inventory/vehicleDetail", {
    title: `${vehicle.inv_make} ${vehicle.inv_model}`,
    nav,
    vehicleHtml,
  });
};

// Build the inventory management view
invCont.buildManagementView = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("inventory/management", {
    title: "Inventory Management",
    nav,
  });
};

// Build the add classification view
invCont.buildAddClassificationView = async function (req, res, next) {
  let nav = await utilities.getNav();
  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null,
  });
};

// Build the add inventory view
invCont.buildAddInventoryView = async function (req, res, next) {
  let nav = await utilities.getNav();
  let classifications = await utilities.buildClassificationList();
  res.render("inventory/add-inventory", {
    title: "Add Inventory Item",
    nav,
    classifications,
    errors: null,
    classification_id: "",
    inv_make: "",
    inv_model: "",
    inv_year: "",
    inv_description: "",
    inv_image: "",
    inv_thumbnail: "",
    inv_price: "",
    inv_miles: "",
    inv_color: "",
  });
};

// Process adding a classification to the database
invCont.addClassification = async function (req, res, next) {
  const { classification_name } = req.body;
  const result = await invModel.addClassification(classification_name);

  if (result) {
    req.flash("success", "Classification added successfully.");
    res.redirect("/inv/management");
  } else {
    req.flash("error", "Failed to add classification.");
    res.redirect("/inv/add-classification");
  }
};

// Process adding an inventory item to the database
invCont.addInventory = async function (req, res, next) {
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
  const result = await invModel.addInventory({
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

  if (result) {
    req.flash("success", "Inventory item added successfully.");
    res.redirect("/inv/management");
  } else {
    req.flash("error", "Failed to add inventory item.");
    res.redirect("/inv/add-inventory");
  }
};

module.exports = invCont;
