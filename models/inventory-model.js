const pool = require("../database/index");

/**************************
 * Get all Classification data
 **************************/
async function getClassifications() {
  let statement =
    "SELECT * FROM public.classification ORDER BY classification_name";
  return await pool.query(statement, ["Hello World"]);
}

module.exports = { getClassifications };
