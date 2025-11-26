const growthModel = require('../models/growthModel');

async function addGrowth(req, res) {
  try {
    const plant_id = req.params.id;
    const { height_cm = null, leaf_count = null, photo_url = null } = req.body;
    const r = await growthModel.addGrowth({ plant_id, height_cm, leaf_count, photo_url });
    res.json({ id: r.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getGrowth(req, res) {
  try {
    const plant_id = req.params.id;
    const rows = await growthModel.getGrowthByPlant(plant_id, 200);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { addGrowth, getGrowth };
