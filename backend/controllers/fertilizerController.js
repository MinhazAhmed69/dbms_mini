const fertilizerModel = require('../models/fertilizerModel');

async function logFertilizer(req, res) {
  try {
    const plant_id = req.params.id;
    const { fertilizer_type = 'generic', frequency_days = null, note = '' } = req.body;
    const applied_on = new Date().toISOString().slice(0,10);
    const r = await fertilizerModel.logFertilizer({ plant_id, fertilizer_type, applied_on, frequency_days, note });
    res.json({ id: r.id, applied_on });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getFertilizerHistory(req, res) {
  try {
    const plant_id = req.params.id;
    const rows = await fertilizerModel.getFertilizerByPlant(plant_id, 200);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { logFertilizer, getFertilizerHistory };