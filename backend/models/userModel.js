const db = require('../config/db');

async function createUser({ name, email, preferences = null }) {
  const [res] = await db.execute(
    `INSERT INTO users (name, email, preferences) VALUES (?, ?, ?)`,
    [name, email, preferences ? JSON.stringify(preferences) : null]
  );
  return { user_id: res.insertId, name, email };
}

async function getUserById(id) {
  const [rows] = await db.execute(`SELECT * FROM users WHERE user_id = ?`, [id]);
  return rows[0];
}

async function getUserByEmail(email) {
  const [rows] = await db.execute(`SELECT * FROM users WHERE email = ?`, [email]);
  return rows[0];
}

module.exports = { createUser, getUserById, getUserByEmail };