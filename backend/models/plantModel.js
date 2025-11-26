const db = require('../config/db');

async function addPlant(p) {
  const { user_id, name, type, species, date_added, water_freq_days=7, fertilize_freq_days=30, notes=null } = p;
  const [res] = await db.execute(
    `INSERT INTO plants (user_id, name, type, species, date_added, water_freq_days, fertilize_freq_days, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [user_id, name, type, species, date_added || new Date(), water_freq_days, fertilize_freq_days, notes]
  );
  return { plant_id: res.insertId };
}

async function getPlantsByUser(user_id) {
  const [rows] = await db.execute(`SELECT * FROM plants WHERE user_id = ?`, [user_id]);
  return rows;
}

async function getPlantById(id) {
  const [rows] = await db.execute(`SELECT * FROM plants WHERE plant_id = ?`, [id]);
  return rows[0];
}

async function updatePlant(id, fields) {
  const sets = [];
  const vals = [];
  for (const k in fields) {
    sets.push(`${k} = ?`);
    vals.push(fields[k]);
  }
  if (sets.length === 0) return;
  vals.push(id);
  await db.execute(`UPDATE plants SET ${sets.join(', ')} WHERE plant_id = ?`, vals);
}

async function deletePlant(id) {
  await db.execute(`DELETE FROM plants WHERE plant_id = ?`, [id]);
}

module.exports = { addPlant, getPlantsByUser, getPlantById, updatePlant, deletePlant };