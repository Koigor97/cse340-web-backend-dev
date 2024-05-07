const pool = require("../database/index");

/**************************
 * Get all Classification data
 **************************/
async function getClassification() {
  let statement =
    "SELECT * FROM public.classification ORDER BY classification_name";
  return await pool.query(statement);
}

module.exports = { getClassification };
