const pool = require("../database/index");

/**************************
 * Get all Classification data
 **************************/
async function getClassifications() {
  let statement =
    "SELECT * FROM public.classification ORDER BY classification_name";
  return await pool.query(statement);
}

/**************************
 * Get all Inventory items and classification_name
 * by classification_id
 **************************/
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i
      JOIN public.classification AS c
      ON i.classification_id = c.classification_id
      WHERE i.classification_id = $1`,
      [classification_id]
    );
    return data.rows;
  } catch (error) {
    console.error("getClassificationById error", +error);
  }
}

module.exports = { getClassifications, getInventoryByClassificationId };
