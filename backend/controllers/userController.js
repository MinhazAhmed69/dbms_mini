const userModel = require('../models/userModel');

async function createUser(req, res) {
  try {
    const { name, email, preferences } = req.body;
    if (!email) return res.status(400).json({ error: 'email required' });
    const existing = await userModel.getUserByEmail(email);
    if (existing) return res.status(400).json({ error: 'email exists' });
    const user = await userModel.createUser({ name, email, preferences });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function getUser(req, res) {
  try {
    const id = req.params.id;
    const u = await userModel.getUserById(id);
    if (!u) return res.status(404).json({ error: 'not found' });
    res.json(u);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createUser, getUser };