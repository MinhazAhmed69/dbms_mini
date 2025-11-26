const db = require('../config/db');

async function logWatering({ plant_id, watered_on, next_watering, note = null }) {
  const [res] = await db.execute(
    `INSERT INTO watering_log (plant_id, watered_on, next_watering, note) VALUES (?, ?, ?, ?)`,
    [plant_id, watered_on, next_watering, note]
  );
  return { id: res.insertId };
}

async function getWateringByPlant(plant_id, limit = 50) {
  const [rows] = await db.execute(
    `SELECT * FROM watering_log WHERE plant_id = ? ORDER BY watered_on DESC LIMIT ?`,
    [plant_id, Number(limit)]
  );
  return rows;
}

// find latest next_watering per plant (used for reminders)
async function getPlantsDueOn(dateString) {
  // For each plant get the latest watering_log entry and check next_watering
  const [rows] = await db.execute(`
    SELECT p.plant_id, p.name, wl.next_watering, p.user_id
    FROM plants p
    JOIN watering_log wl ON wl.plant_id = p.plant_id
    WHERE wl.id = (SELECT MAX(id) FROM watering_log WHERE plant_id = p.plant_id)
      AND wl.next_watering = ?
  `, [dateString]);
  return rows;
}

module.exports = { logWatering, getWateringByPlant, getPlantsDueOn };