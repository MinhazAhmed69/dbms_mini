const db = require('../config/db');

async function logFertilizer({ plant_id, fertilizer_type, applied_on, frequency_days = null, note = null }) {
  const [res] = await db.execute(
    `INSERT INTO fertilizer_log (plant_id, fertilizer_type, applied_on, frequency_days, note) VALUES (?, ?, ?, ?, ?)`,
    [plant_id, fertilizer_type, applied_on, frequency_days, note]
  );
  return { id: res.insertId };
}

async function getFertilizerByPlant(plant_id, limit = 50) {
  const [rows] = await db.execute(
    `SELECT * FROM fertilizer_log WHERE plant_id = ? ORDER BY applied_on DESC LIMIT ?`,
    [plant_id, Number(limit)]
  );
  return rows;
}

module.exports = { logFertilizer, getFertilizerByPlant };