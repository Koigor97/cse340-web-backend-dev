const utilities = require("../utilities/");
const { pageDescription } = require("../lib/pageMetaDesc");

const baseController = {};

baseController.buildHome = async function (req, res) {
  const pageDesc = pageDescription();
  const nav = await utilities.getNav();
  res.render("index", { title: "Home", description: pageDesc.homePage, nav });
};

module.exports = baseController;
