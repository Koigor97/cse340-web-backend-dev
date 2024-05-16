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

module.exports = invCont;
