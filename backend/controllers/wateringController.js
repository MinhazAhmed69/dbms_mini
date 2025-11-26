const wateringModel = require('../models/wateringModel');
const plantModel = require('../models/plantModel');

async function logWater(req, res) {
  try {
    const plant_id = req.params.id;
    const plant = await plantModel.getPlantById(plant_id);
    if (!plant) return res.status(404).json({ error: 'plant not found' });

    const { note = '' } = req.body;
    const watered_on = new Date().toISOString().slice(0,10);
    const freq = plant.water_freq_days || 7;
    const next_watering = new Date(Date.now() + freq * 24*3600*1000).toISOString().slice(0,10);
    const r = await wateringModel.logWatering({ plant_id, watered_on, next_watering, note });
    res.json({ id: r.id, watered_on, next_watering });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getWateringHistory(req, res) {
  try {
    const plant_id = req.params.id;
    const rows = await wateringModel.getWateringByPlant(plant_id, 200);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { logWater, getWateringHistory };