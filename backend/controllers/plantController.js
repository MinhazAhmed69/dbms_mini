const plantModel = require('../models/plantModel');
const wateringModel = require('../models/wateringModel');
const fertilizerModel = require('../models/fertilizerModel');
const growthModel = require('../models/growthModel');

function formatDateISO(d) {
  if (!d) return new Date().toISOString().slice(0,10);
  const dt = new Date(d);
  return dt.toISOString().slice(0,10);
}

async function addPlant(req, res) {
  try {
    const payload = req.body;
    // require user_id and name minimally
    if (!payload.user_id || !payload.name) return res.status(400).json({ error: 'user_id and name required' });

    const date_added = payload.date_added ? payload.date_added : formatDateISO();
    const result = await plantModel.addPlant({ ...payload, date_added });
    // create initial watering log
    const plant = await plantModel.getPlantById(result.plant_id);
    const nextWater = new Date(Date.now() + (plant.water_freq_days || 7) * 24*3600*1000).toISOString().slice(0,10);
    await wateringModel.logWatering({ plant_id: result.plant_id, watered_on: date_added, next_watering: nextWater, note: 'Initial add' });
    res.json({ plant_id: result.plant_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function listPlants(req, res) {
  try {
    const user_id = req.query.user_id || 1;
    const plants = await plantModel.getPlantsByUser(user_id);
    res.json(plants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getPlantDetails(req, res) {
  try {
    const id = req.params.id;
    const plant = await plantModel.getPlantById(id);
    if (!plant) return res.status(404).json({ error: 'not found' });
    const watering = await wateringModel.getWateringByPlant(id, 200);
    const fertilizer = await fertilizerModel.getFertilizerByPlant(id, 200);
    const growth = await growthModel.getGrowthByPlant(id, 200);
    res.json({ plant, watering, fertilizer, growth });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updatePlant(req, res) {
  try {
    const id = req.params.id;
    const fields = req.body;
    await plantModel.updatePlant(id, fields);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deletePlant(req, res) {
  try {
    const id = req.params.id;
    await plantModel.deletePlant(id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { addPlant, listPlants, getPlantDetails, updatePlant, deletePlant };