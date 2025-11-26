const db = require('../config/db');

async function addGrowth({ plant_id, height_cm = null, leaf_count = null, photo_url = null, logged_on = null }) {
  const [res] = await db.execute(
    `INSERT INTO growth_log (plant_id, height_cm, leaf_count, photo_url, logged_on) VALUES (?, ?, ?, ?, ?)`,
    [plant_id, height_cm, leaf_count, photo_url, logged_on || new Date()]
  );
  return { id: res.insertId };
}

async function getGrowthByPlant(plant_id, limit = 200) {
  const [rows] = await db.execute(
    `SELECT * FROM growth_log WHERE plant_id = ? ORDER BY logged_on ASC LIMIT ?`,
    [plant_id, Number(limit)]
  );
  return rows;
}

module.exports = { addGrowth, getGrowthByPlant };